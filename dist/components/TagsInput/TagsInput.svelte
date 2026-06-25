<script lang="ts">
	import { tick } from 'svelte';
	import { Popover, Portal } from 'bits-ui';
	import Tag from '../Tag/Tag.svelte';

	type Size = 'sm' | 'md' | 'lg';
	type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
	type Variant = 'soft' | 'outline' | 'solid';

	interface TagOption {
		value: string;
		label?: string;
		disabled?: boolean;
	}

	interface Props {
		value?: string[];
		onValueChange?: (value: string[]) => void;
		/** Predefined suggestions shown in the dropdown. */
		options?: TagOption[];
		/** Whether typed text that doesn't match an option can become a new tag. */
		allowCustomTags?: boolean;
		/** Maximum number of tags. */
		max?: number;
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		size?: Size;
		tone?: Tone;
		variant?: Variant;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable([]),
		onValueChange,
		options = [],
		allowCustomTags = true,
		max,
		placeholder = 'Add tag…',
		disabled = false,
		invalid = false,
		size = 'md',
		tone = 'neutral',
		variant = 'soft',
		id,
		class: className = ''
	}: Props = $props();

	let open = $state(false);
	let fieldEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();
	let listEl: HTMLUListElement | undefined = $state();
	let highlightedIndex = $state(-1);
	let textValue = $state('');

	const atMax = $derived(max !== undefined && value.length >= max);

	const filteredOptions = $derived.by(() => {
		if (atMax) return [];
		const query = textValue.trim().toLowerCase();
		return options.filter((o) => {
			if (o.disabled || value.includes(o.value)) return false;
			if (!query) return true;
			return (o.label ?? o.value).toLowerCase().includes(query);
		});
	});

	const showCreateRow = $derived.by(() => {
		if (atMax || !allowCustomTags) return false;
		const trimmed = textValue.trim();
		if (!trimmed) return false;
		const lower = trimmed.toLowerCase();
		if (value.some((v) => v.toLowerCase() === lower)) return false;
		if (options.some((o) => (o.label ?? o.value).toLowerCase() === lower)) return false;
		return true;
	});

	const rowCount = $derived(filteredOptions.length + (showCreateRow ? 1 : 0));

	// Keeps the highlight in range as the live-filtered row count shrinks while typing,
	// rather than leaving it pointed at a row that no longer exists.
	$effect(() => {
		if (highlightedIndex >= rowCount) highlightedIndex = rowCount - 1;
	});

	// Closes the dropdown once nothing is left to show (e.g. typed text matches nothing
	// and custom tags are disabled) instead of leaving an empty floating box open.
	$effect(() => {
		if (open && rowCount === 0) open = false;
	});

	function labelFor(v: string) {
		return options.find((o) => o.value === v)?.label ?? v;
	}

	function setValue(next: string[]) {
		value = next;
		onValueChange?.(next);
	}

	function commitValue(raw: string) {
		const trimmed = raw.trim();
		if (!trimmed || atMax) return;
		if (!value.some((v) => v.toLowerCase() === trimmed.toLowerCase())) {
			setValue([...value, trimmed]);
		}
		textValue = '';
		highlightedIndex = -1;
		inputEl?.focus();
	}

	function removeTag(v: string) {
		setValue(value.filter((existing) => existing !== v));
		inputEl?.focus();
	}

	async function scrollHighlightedIntoView() {
		await tick();
		const target = listEl?.querySelector('[data-highlighted]') as HTMLElement | null;
		if (!target || !listEl) return;
		const offset = target.offsetTop - listEl.clientHeight / 2 + target.clientHeight / 2;
		listEl.scrollTop = Math.max(0, offset);
	}

	function openList() {
		if (disabled || rowCount === 0) return;
		highlightedIndex = 0;
		open = true;
		scrollHighlightedIntoView();
	}

	function handleInput(e: Event) {
		textValue = (e.currentTarget as HTMLInputElement).value;
		if (!open && rowCount > 0) openList();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' || (e.key === ',' && textValue.trim() !== '')) {
			e.preventDefault();
			if (open && highlightedIndex >= 0 && highlightedIndex < rowCount) {
				if (highlightedIndex < filteredOptions.length) {
					commitValue(filteredOptions[highlightedIndex].value);
				} else {
					commitValue(textValue);
				}
			} else if (allowCustomTags) {
				commitValue(textValue);
			}
			return;
		}
		if (e.key === 'Backspace' && textValue === '' && value.length > 0) {
			e.preventDefault();
			setValue(value.slice(0, -1));
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!open) {
				openList();
				return;
			}
			highlightedIndex = Math.min(highlightedIndex + 1, rowCount - 1);
			scrollHighlightedIntoView();
			return;
		}
		if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (!open) {
				openList();
				return;
			}
			highlightedIndex = Math.max(highlightedIndex - 1, 0);
			scrollHighlightedIntoView();
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
			}
		}, 0);
	}

	function openOnFieldClick(e: MouseEvent) {
		if (disabled) return;
		const target = e.target as HTMLElement;
		if (target.closest('.tag-remove') || target.closest('.tags-input-trigger')) return;
		inputEl?.focus();
		openList();
	}
</script>

<Popover.Root bind:open>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<!-- Pointer-only convenience: every action here is already keyboard-reachable via the text input. -->
	<div
		bind:this={fieldEl}
		class="tags-input tags-input--{size}{invalid ? ' tags-input--invalid' : ''}{className
			? ' ' + className
			: ''}"
		class:tags-input--disabled={disabled}
		onclick={openOnFieldClick}
	>
		{#each value as v (v)}
			<Tag {tone} {variant} onremove={disabled ? undefined : () => removeTag(v)}>
				{labelFor(v)}
			</Tag>
		{/each}
		<input
			bind:this={inputEl}
			type="text"
			class="tags-input-text"
			{id}
			{disabled}
			placeholder={value.length ? '' : placeholder}
			value={textValue}
			oninput={handleInput}
			onkeydown={handleKeydown}
			onfocus={openList}
			onblur={handleBlur}
		/>
		{#if options.length > 0}
			<Popover.Trigger
				class="tags-input-trigger"
				disabled={disabled || undefined}
				aria-label="Show suggestions"
				tabindex={-1}
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
			</Popover.Trigger>
		{/if}
	</div>
	<Portal>
		<Popover.Content
			class="tags-input-content"
			sideOffset={6}
			customAnchor={fieldEl}
			trapFocus={false}
			onOpenAutoFocus={(e) => e.preventDefault()}
			onCloseAutoFocus={(e) => e.preventDefault()}
		>
			<ul class="tags-input-list" bind:this={listEl} role="listbox" aria-label="Tag options">
				{#each filteredOptions as option, i (option.value)}
					<li>
						<button
							type="button"
							class="tags-input-option"
							role="option"
							aria-selected={false}
							data-highlighted={i === highlightedIndex ? true : undefined}
							onclick={() => commitValue(option.value)}
							onmouseenter={() => (highlightedIndex = i)}
						>
							{option.label ?? option.value}
						</button>
					</li>
				{/each}
				{#if showCreateRow}
					<li>
						<button
							type="button"
							class="tags-input-option tags-input-option--create"
							role="option"
							aria-selected={false}
							data-highlighted={highlightedIndex === filteredOptions.length ? true : undefined}
							onclick={() => commitValue(textValue)}
							onmouseenter={() => (highlightedIndex = filteredOptions.length)}
						>
							Create "{textValue.trim()}"
						</button>
					</li>
				{/if}
			</ul>
		</Popover.Content>
	</Portal>
</Popover.Root>

<style>
	:global(.tags-input) {
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

		&:hover:not(.tags-input--disabled) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible) {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}
	}

	:global(.tags-input--sm) {
		min-height: 32px;
	}

	:global(.tags-input--md) {
		min-height: 40px;
	}

	:global(.tags-input--lg) {
		min-height: 48px;
	}

	:global(.tags-input--invalid) {
		border-color: var(--status-danger-fg);

		&:has(:focus-visible) {
			border-color: var(--status-danger-fg);
			box-shadow: 0 0 0 3px var(--status-danger-bg);
		}
	}

	:global(.tags-input--disabled) {
		background: var(--surface-sunken);
		border-color: var(--border-subtle);
		cursor: not-allowed;
	}

	:global(.tags-input-text) {
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

	:global(.tags-input-trigger) {
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

	:global(.tags-input-content) {
		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		padding: var(--space-1);
		z-index: var(--z-overlay);

		width: var(--bits-floating-anchor-width);
		min-width: var(--bits-floating-anchor-width);
		max-height: 240px;

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);
	}

	:global(.tags-input-content[data-starting-style]),
	:global(.tags-input-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}

	:global(.tags-input-list) {
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 232px;
		overflow-y: auto;
	}

	:global(.tags-input-option) {
		display: block;
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
	}

	:global(.tags-input-option--create) {
		color: var(--text-secondary);
		font-style: italic;
	}
</style>
