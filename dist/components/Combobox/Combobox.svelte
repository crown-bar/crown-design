<script lang="ts" module>
	export interface ComboboxOption {
		value: string;
		label?: string;
		disabled?: boolean;
	}

	let uid = 0;
</script>

<script lang="ts">
	import { tick } from 'svelte';
	import { Popover, Portal } from 'bits-ui';

	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		/** `single` picks one value (string); `multiple` picks many (string[]). */
		type?: 'single' | 'multiple';
		/** Bound value — a string for `single`, a string[] for `multiple`. */
		value?: string | string[];
		onValueChange?: (value: string | string[]) => void;
		/** Selectable options shown (and filtered) in the dropdown. */
		options?: ComboboxOption[];
		placeholder?: string;
		/** Row shown when the query matches no options. */
		emptyText?: string;
		/** `multiple` only — cap the number of selections. */
		max?: number;
		/** `single` only — show a clear (×) button once a value is picked. */
		clearable?: boolean;
		disabled?: boolean;
		invalid?: boolean;
		size?: Size;
		id?: string;
		class?: string;
	}

	let {
		type = 'single',
		value = $bindable(),
		onValueChange,
		options = [],
		placeholder = 'Search…',
		emptyText = 'No results',
		max,
		clearable = true,
		disabled = false,
		invalid = false,
		size = 'md',
		id,
		class: className = ''
	}: Props = $props();

	const isMulti = $derived(type === 'multiple');
	const listId = `combobox-list-${uid++}`;

	let open = $state(false);
	let fieldEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();
	let listEl: HTMLUListElement | undefined = $state();
	let highlightedIndex = $state(-1);
	let textValue = $state('');
	// True once the user types after opening, so opening a single-choice field first
	// shows every option (with the current pick highlighted) rather than filtering by
	// the label already sitting in the input.
	let searching = $state(false);

	const selected = $derived.by<string[]>(() => {
		if (isMulti) return Array.isArray(value) ? value : [];
		return typeof value === 'string' && value ? [value] : [];
	});

	const atMax = $derived(isMulti && max !== undefined && selected.length >= max);

	function labelFor(v: string) {
		return options.find((o) => o.value === v)?.label ?? v;
	}

	const selectedLabel = $derived(!isMulti && selected.length ? labelFor(selected[0]) : '');

	// Keep the single-choice input showing the picked label whenever the user isn't
	// actively typing a query (on open, on external value changes, after selecting).
	$effect(() => {
		if (!isMulti && !searching) textValue = selectedLabel;
	});

	const filteredOptions = $derived.by(() => {
		if (atMax) return [];
		const query = (isMulti ? textValue : searching ? textValue : '').trim().toLowerCase();
		return options.filter((o) => {
			if (isMulti && selected.includes(o.value)) return false;
			if (!query) return true;
			return (o.label ?? o.value).toLowerCase().includes(query);
		});
	});

	// Keeps the highlight in range as the live-filtered list shrinks while typing.
	$effect(() => {
		if (highlightedIndex >= filteredOptions.length) highlightedIndex = filteredOptions.length - 1;
	});

	function setValue(next: string | string[]) {
		value = next;
		onValueChange?.(next);
	}

	async function scrollHighlightedIntoView() {
		await tick();
		const target = listEl?.querySelector('[data-highlighted]') as HTMLElement | null;
		if (!target || !listEl) return;
		const offset = target.offsetTop - listEl.clientHeight / 2 + target.clientHeight / 2;
		listEl.scrollTop = Math.max(0, offset);
	}

	function openList() {
		if (disabled) return;
		searching = false;
		highlightedIndex = filteredOptions.findIndex((o) => !o.disabled);
		open = filteredOptions.length > 0;
		scrollHighlightedIntoView();
	}

	function selectOption(option: ComboboxOption) {
		if (option.disabled) return;
		if (isMulti) {
			if (selected.includes(option.value)) {
				setValue(selected.filter((v) => v !== option.value));
			} else if (!atMax) {
				setValue([...selected, option.value]);
			}
			textValue = '';
			highlightedIndex = -1;
			inputEl?.focus();
		} else {
			setValue(option.value);
			searching = false;
			textValue = option.label ?? labelFor(option.value);
			open = false;
			inputEl?.blur();
		}
	}

	function clearValue() {
		setValue(isMulti ? [] : '');
		textValue = '';
		searching = false;
		inputEl?.focus();
	}

	function removeValue(v: string) {
		setValue(selected.filter((existing) => existing !== v));
		inputEl?.focus();
	}

	function handleInput(e: Event) {
		textValue = (e.currentTarget as HTMLInputElement).value;
		searching = true;
		if (!open && filteredOptions.length > 0) {
			highlightedIndex = filteredOptions.findIndex((o) => !o.disabled);
			open = true;
			scrollHighlightedIntoView();
		}
	}

	function moveHighlight(dir: 1 | -1) {
		const count = filteredOptions.length;
		if (count === 0) return;
		let next = highlightedIndex;
		for (let i = 0; i < count; i++) {
			next = (next + dir + count) % count;
			if (!filteredOptions[next]?.disabled) break;
		}
		highlightedIndex = next;
		scrollHighlightedIntoView();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			if (open && highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
				e.preventDefault();
				selectOption(filteredOptions[highlightedIndex]);
			}
			return;
		}
		if (e.key === 'Backspace' && isMulti && textValue === '' && selected.length > 0) {
			e.preventDefault();
			setValue(selected.slice(0, -1));
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!open) {
				openList();
				return;
			}
			moveHighlight(1);
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!open) {
				openList();
				return;
			}
			moveHighlight(-1);
			return;
		}
		if (e.key === 'Escape') {
			open = false;
		}
	}

	function handleBlur() {
		// Deferred so a click on a dropdown option (which blurs the input first) still
		// registers before we decide whether focus actually left the field + popover.
		setTimeout(() => {
			const active = document.activeElement;
			if (!fieldEl?.contains(active) && !listEl?.contains(active)) {
				open = false;
				// Discard an uncommitted query — single-choice never accepts free text,
				// so the input snaps back to the picked label (or empty).
				searching = false;
				if (isMulti) textValue = '';
			}
		}, 0);
	}

	function openOnFieldClick(e: MouseEvent) {
		if (disabled) return;
		const target = e.target as HTMLElement;
		if (target.closest('.combobox-clear') || target.closest('.combobox-trigger')) return;
		inputEl?.focus();
		openList();
	}

	function toggleOpen() {
		if (disabled) return;
		if (open) {
			open = false;
		} else {
			inputEl?.focus();
			openList();
		}
	}
</script>

<Popover.Root bind:open>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<!-- Pointer-only convenience: every action here is already keyboard-reachable via the text input. -->
	<div
		bind:this={fieldEl}
		class="combobox combobox--{size}{invalid ? ' combobox--invalid' : ''}{className
			? ' ' + className
			: ''}"
		class:combobox--disabled={disabled}
		class:combobox--multiple={isMulti}
		onclick={openOnFieldClick}
	>
		{#if isMulti}
			{#each selected as v (v)}
				<span class="combobox-chip">
					<span class="combobox-chip-label">{labelFor(v)}</span>
					{#if !disabled}
						<button
							type="button"
							class="combobox-chip-remove"
							aria-label="Remove"
							tabindex={-1}
							onclick={(e) => {
								e.stopPropagation();
								removeValue(v);
							}}
						>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								stroke="currentColor"
								stroke-width="1.75"
								stroke-linecap="round"
								aria-hidden="true"
							>
								<path d="M4 4L12 12M12 4L4 12" />
							</svg>
						</button>
					{/if}
				</span>
			{/each}
		{/if}
		<input
			bind:this={inputEl}
			type="text"
			class="combobox-input"
			role="combobox"
			aria-expanded={open}
			aria-controls={listId}
			aria-autocomplete="list"
			autocomplete="off"
			{id}
			{disabled}
			placeholder={isMulti && selected.length ? '' : placeholder}
			value={textValue}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={openList}
			onblur={handleBlur}
		/>
		{#if clearable && !isMulti && selected.length > 0 && !disabled}
			<button
				type="button"
				class="combobox-clear"
				aria-label="Clear selection"
				tabindex={-1}
				onclick={clearValue}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<path
						d="M4 4L12 12M12 4L4 12"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		{/if}
		<button
			type="button"
			class="combobox-trigger"
			disabled={disabled || undefined}
			aria-label="Toggle options"
			tabindex={-1}
			onclick={toggleOpen}
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M4 6L8 10L12 6"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>
	<Portal>
		<Popover.Content
			class="combobox-content"
			sideOffset={6}
			customAnchor={fieldEl}
			trapFocus={false}
			onOpenAutoFocus={(e) => e.preventDefault()}
			onCloseAutoFocus={(e) => e.preventDefault()}
		>
			<ul
				id={listId}
				class="combobox-list"
				bind:this={listEl}
				role="listbox"
				aria-label="Options"
			>
				{#each filteredOptions as option, i (option.value)}
					{@const isSelected = selected.includes(option.value)}
					<li>
						<button
							type="button"
							class="combobox-option"
							role="option"
							aria-selected={isSelected}
							data-selected={isSelected ? true : undefined}
							data-highlighted={i === highlightedIndex ? true : undefined}
							data-disabled={option.disabled ? true : undefined}
							disabled={option.disabled || undefined}
							onclick={() => selectOption(option)}
							onmouseenter={() => (highlightedIndex = i)}
						>
							<span class="combobox-option-label">{option.label ?? option.value}</span>
							{#if isSelected}
								<svg class="combobox-option-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
									<path
										d="M3.5 8.5L6.5 11.5L12.5 4.5"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</svg>
							{/if}
						</button>
					</li>
				{/each}
				{#if filteredOptions.length === 0}
					<li class="combobox-empty" role="presentation">{emptyText}</li>
				{/if}
			</ul>
		</Popover.Content>
	</Portal>
</Popover.Root>

<style>
	:global(.combobox) {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		width: 100%;
		gap: var(--space-1) var(--space-2);
		padding: var(--space-1) var(--space-2);

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		cursor: text;

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not(.combobox--disabled) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible) {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}
	}

	:global(.combobox--sm) {
		min-height: 32px;
	}

	:global(.combobox--md) {
		min-height: 40px;
	}

	:global(.combobox--lg) {
		min-height: 48px;
	}

	:global(.combobox--invalid) {
		border-color: var(--status-danger-fg);

		&:has(:focus-visible) {
			border-color: var(--status-danger-fg);
			box-shadow: 0 0 0 3px var(--status-danger-bg);
		}
	}

	:global(.combobox--disabled) {
		background: var(--surface-sunken);
		border-color: var(--border-subtle);
		cursor: not-allowed;
	}

	:global(.combobox-input) {
		flex: 1 1 80px;
		min-width: 60px;
		height: 22px;

		background: transparent;
		border: none;
		outline: none;
		padding: 0;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		&::placeholder {
			color: var(--text-secondary);
		}

		&:disabled {
			cursor: not-allowed;
		}
	}

	:global(.combobox-chip) {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		height: 22px;
		padding: 0 3px 0 8px;

		background: var(--surface-hover);
		color: var(--text-primary);
		border-radius: var(--radius-sm);

		font-family: var(--font-sans);
		font-size: var(--size-xs);
		line-height: 1;
		white-space: nowrap;
	}

	:global(.combobox-chip-label) {
		max-width: 14rem;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(.combobox-chip-remove) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 16px;
		height: 16px;

		background: transparent;
		border: none;
		border-radius: var(--radius-xs);
		color: var(--text-secondary);
		cursor: pointer;

		padding: 3px;

		transition:
			background var(--duration-fast) var(--ease-standard),
			color var(--duration-fast) var(--ease-standard);

		& svg {
			width: 11px;
			height: 11px;
		}

		&:hover {
			background: color-mix(in srgb, currentColor 16%, transparent);
			color: var(--text-primary);
		}
	}

	:global(.combobox-clear),
	:global(.combobox-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 22px;
		height: 22px;

		background: transparent;
		border: none;
		border-radius: var(--radius-xs);
		color: var(--text-secondary);
		cursor: pointer;

		transition: background var(--duration-fast) var(--ease-standard);

		& svg {
			width: 14px;
			height: 14px;
		}

		&:hover:not(:disabled) {
			background: var(--surface-hover);
			color: var(--text-primary);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.45;
		}
	}

	:global(.combobox-clear svg) {
		width: 12px;
		height: 12px;
	}

	:global(.combobox-trigger svg) {
		transition: rotate var(--duration-fast) var(--ease-standard);
	}

	:global(.combobox:has(.combobox-input[aria-expanded='true']) .combobox-trigger svg) {
		rotate: 180deg;
	}

	:global(.combobox-content) {
		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		padding: var(--space-1);
		z-index: var(--z-overlay);

		width: var(--bits-floating-anchor-width);
		min-width: var(--bits-floating-anchor-width);
		max-height: 280px;

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);
	}

	:global(.combobox-content[data-starting-style]),
	:global(.combobox-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}

	:global(.combobox-list) {
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 272px;
		overflow-y: auto;
	}

	:global(.combobox-option) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		width: 100%;
		padding: var(--space-2) var(--space-3);
		border: none;
		border-radius: var(--radius-xs);
		background: transparent;
		cursor: pointer;
		text-align: left;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		&[data-highlighted] {
			background: var(--surface-hover);
		}

		&[data-selected] {
			font-weight: var(--weight-medium);
		}

		&[data-disabled] {
			color: var(--text-disabled);
			cursor: not-allowed;
		}
	}

	:global(.combobox-option-label) {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.combobox-option-check) {
		flex: none;
		width: 12px;
		height: 12px;
		color: var(--text-primary);
	}

	:global(.combobox-empty) {
		padding: var(--space-2) var(--space-3);
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-secondary);
	}
</style>
