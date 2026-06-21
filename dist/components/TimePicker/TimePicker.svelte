<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { Popover, Portal } from 'bits-ui';
	import { Time } from '@internationalized/date';
	import { parseTimeInput, formatTime } from './parseTimeInput.js';

	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		value?: Time;
		onValueChange?: (value: Time | undefined) => void;
		placeholder?: string;
		disabled?: boolean;
		invalid?: boolean;
		size?: Size;
		/** Minute interval between options in the dropdown list. */
		step?: number;
		hourCycle?: 12 | 24;
		id?: string;
		class?: string;
	}

	let {
		value = $bindable(),
		onValueChange,
		placeholder = 'hh:mm',
		disabled = false,
		invalid = false,
		size = 'md',
		step = 30,
		hourCycle = 24,
		id,
		class: className = ''
	}: Props = $props();

	let open = $state(false);
	let isCoarsePointer = $state(false);
	let fieldEl: HTMLDivElement | undefined = $state();
	let inputEl: HTMLInputElement | undefined = $state();
	let listEl: HTMLUListElement | undefined = $state();
	let highlightedIndex = $state(-1);
	let textValue = $state('');

	onMount(() => {
		isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
	});

	$effect(() => {
		if (document.activeElement !== inputEl) {
			textValue = value ? formatTime(value, hourCycle) : '';
		}
	});

	const options = $derived.by(() => {
		const list: Time[] = [];
		for (let m = 0; m < 24 * 60; m += step) {
			list.push(new Time(Math.floor(m / 60), m % 60));
		}
		return list;
	});

	function minutesOf(t: Time) {
		return t.hour * 60 + t.minute;
	}

	function setValue(next: Time | undefined) {
		value = next;
		onValueChange?.(next);
	}

	function commitText() {
		const parsed = parseTimeInput(textValue);
		if (parsed) {
			setValue(parsed);
			textValue = formatTime(parsed, hourCycle);
		} else if (textValue.trim() === '') {
			setValue(undefined);
		} else {
			textValue = value ? formatTime(value, hourCycle) : '';
		}
	}

	function handleBlur() {
		commitText();
		// Deferred so a click on a dropdown option (which blurs the input first) still
		// registers before we decide whether focus actually left the field + popover.
		setTimeout(() => {
			const active = document.activeElement;
			if (!fieldEl?.contains(active) && !listEl?.contains(active)) {
				open = false;
			}
		}, 0);
	}

	function selectOption(t: Time) {
		setValue(t);
		textValue = formatTime(t, hourCycle);
		open = false;
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
		if (disabled) return;
		highlightedIndex = value
			? options.findIndex((o) => minutesOf(o) >= minutesOf(value!))
			: 0;
		open = true;
		scrollHighlightedIntoView();
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (open && highlightedIndex >= 0) {
				selectOption(options[highlightedIndex]);
			} else {
				commitText();
			}
			return;
		}
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			if (!open) {
				openList();
				return;
			}
			highlightedIndex = Math.min(highlightedIndex + 1, options.length - 1);
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

	function openOnFieldClick(e: MouseEvent) {
		if (disabled) return;
		if ((e.target as HTMLElement).closest('.time-picker-trigger')) return;
		if (!open) openList();
	}
</script>

{#if isCoarsePointer}
	<input
		type="time"
		class="time-picker-native time-picker-native--{size}{className ? ' ' + className : ''}"
		{disabled}
		{id}
		value={value ? `${value.hour.toString().padStart(2, '0')}:${value.minute.toString().padStart(2, '0')}` : ''}
		oninput={(e) => {
			const raw = e.currentTarget.value;
			if (!raw) {
				setValue(undefined);
				return;
			}
			const [h, m] = raw.split(':').map(Number);
			setValue(new Time(h, m));
		}}
	/>
{:else}
	<Popover.Root bind:open>
		<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
		<!-- Pointer-only convenience: every action here is already keyboard-reachable via the text input and trigger button below. -->
		<div
			bind:this={fieldEl}
			class="time-picker time-picker--{size}{invalid ? ' time-picker--invalid' : ''}{className
				? ' ' + className
				: ''}"
			class:time-picker--disabled={disabled}
			onclick={openOnFieldClick}
		>
			<input
				bind:this={inputEl}
				type="text"
				class="time-picker-text"
				size={hourCycle === 24 ? 5 : 8}
				{disabled}
				{id}
				{placeholder}
				bind:value={textValue}
				onkeydown={handleKeydown}
				onblur={handleBlur}
				onfocus={openList}
			/>
			<Popover.Trigger
				class="time-picker-trigger"
				disabled={disabled || undefined}
				aria-label="Open time list"
				tabindex={-1}
			>
				<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
					<circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3" />
					<path d="M8 5V8L10 9.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</Popover.Trigger>
		</div>
		<Portal>
			<Popover.Content
				class="time-picker-content"
				sideOffset={6}
				customAnchor={fieldEl}
				trapFocus={false}
				onOpenAutoFocus={(e) => e.preventDefault()}
				onCloseAutoFocus={(e) => e.preventDefault()}
			>
				<ul class="time-picker-list" bind:this={listEl} role="listbox" aria-label="Time options">
					{#each options as option, i (minutesOf(option))}
						<li>
							<button
								type="button"
								class="time-picker-option"
								role="option"
								aria-selected={value ? minutesOf(value) === minutesOf(option) : false}
								data-highlighted={i === highlightedIndex ? true : undefined}
								data-selected={value && minutesOf(value) === minutesOf(option) ? true : undefined}
								onclick={() => selectOption(option)}
								onmouseenter={() => (highlightedIndex = i)}
							>
								{formatTime(option, hourCycle)}
							</button>
						</li>
					{/each}
				</ul>
			</Popover.Content>
		</Portal>
	</Popover.Root>
{/if}

<style>
	:global(.time-picker),
	:global(.time-picker-native) {
		display: inline-flex;
		align-items: center;
		width: fit-content;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-2) 0 var(--space-3);

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not(.time-picker--disabled):not(:disabled) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible),
		&:focus-visible {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}
	}

	:global(.time-picker--invalid) {
		border-color: var(--status-danger-fg);

		&:has(:focus-visible) {
			border-color: var(--status-danger-fg);
			box-shadow: 0 0 0 3px var(--status-danger-bg);
		}
	}

	:global(.time-picker--disabled),
	:global(.time-picker-native:disabled) {
		background: var(--surface-sunken);
		border-color: var(--border-subtle);
		cursor: not-allowed;
	}

	:global(.time-picker--sm),
	:global(.time-picker-native--sm) {
		height: 32px;
	}

	:global(.time-picker--md),
	:global(.time-picker-native--md) {
		height: 40px;
	}

	:global(.time-picker--lg),
	:global(.time-picker-native--lg) {
		height: 48px;
	}

	:global(.time-picker-text) {
		flex: none;
		height: 100%;

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
			color: var(--text-disabled);
		}
	}

	:global(.time-picker-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 24px;
		height: 24px;
		margin-left: var(--space-1);

		background: transparent;
		border: none;
		border-radius: var(--radius-xs);
		color: var(--text-secondary);
		cursor: pointer;

		transition: background var(--duration-fast) var(--ease-standard);

		& svg {
			width: 15px;
			height: 15px;
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

	:global(.time-picker-content) {
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

	:global(.time-picker-content[data-starting-style]),
	:global(.time-picker-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}

	:global(.time-picker-list) {
		list-style: none;
		margin: 0;
		padding: 0;
		max-height: 232px;
		overflow-y: auto;
	}

	:global(.time-picker-option) {
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

		&[data-selected] {
			font-weight: var(--weight-medium);
			background: var(--action-primary);
			color: var(--text-on-accent);
		}
	}
</style>
