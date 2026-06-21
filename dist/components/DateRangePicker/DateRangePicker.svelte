<script lang="ts">
	import { DateRangePicker as DateRangePickerPrimitive, Portal } from 'bits-ui';
	import type { ComponentProps } from 'svelte';
	import CalendarHeader from '../Calendar/CalendarHeader.svelte';
	import CalendarHeading from '../Calendar/CalendarHeading.svelte';
	import CalendarPrevButton from '../Calendar/CalendarPrevButton.svelte';
	import CalendarNextButton from '../Calendar/CalendarNextButton.svelte';
	import RangeCalendarGrid from './RangeCalendarGrid.svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<ComponentProps<typeof DateRangePickerPrimitive.Root>, 'children'> {
		size?: Size;
		class?: string;
	}

	let {
		size = 'md',
		value = $bindable(),
		placeholder = $bindable(),
		open = $bindable(false),
		disabled = false,
		locale = 'de-CH',
		weekStartsOn = 1,
		class: className = '',
		...rest
	}: Props = $props();

	function openOnFieldClick(e: MouseEvent) {
		if (disabled) return;
		if ((e.target as HTMLElement).closest('.date-picker-trigger')) return;
		open = true;
	}
</script>

<DateRangePickerPrimitive.Root
	bind:value
	bind:placeholder
	bind:open
	{disabled}
	{locale}
	{weekStartsOn}
	{...rest}
>
	<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
	<!-- Pointer-only convenience: every action here is already keyboard-reachable via the segments and the trigger button below. -->
	<div
		class="date-field date-field--{size}{className ? ' ' + className : ''}"
		onclick={openOnFieldClick}
	>
		<DateRangePickerPrimitive.Input type="start" class="date-picker-input">
			{#snippet children({ segments })}
				{#each segments as { part, value: segmentValue }, i (i)}
					{#if part === 'literal'}
						<span class="date-field-literal">{segmentValue}</span>
					{:else}
						<DateRangePickerPrimitive.Segment {part} class="date-field-segment">
							{segmentValue}
						</DateRangePickerPrimitive.Segment>
					{/if}
				{/each}
			{/snippet}
		</DateRangePickerPrimitive.Input>
		<span class="date-range-separator" aria-hidden="true">–</span>
		<DateRangePickerPrimitive.Input type="end" class="date-picker-input">
			{#snippet children({ segments })}
				{#each segments as { part, value: segmentValue }, i (i)}
					{#if part === 'literal'}
						<span class="date-field-literal">{segmentValue}</span>
					{:else}
						<DateRangePickerPrimitive.Segment {part} class="date-field-segment">
							{segmentValue}
						</DateRangePickerPrimitive.Segment>
					{/if}
				{/each}
			{/snippet}
		</DateRangePickerPrimitive.Input>
		<DateRangePickerPrimitive.Trigger
			class="date-picker-trigger"
			disabled={disabled || undefined}
			aria-label="Open calendar"
		>
			<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<rect x="2.5" y="3.5" width="11" height="10" rx="1.5" stroke="currentColor" stroke-width="1.3" />
				<path d="M2.5 6.5H13.5" stroke="currentColor" stroke-width="1.3" />
				<path d="M5.5 2V4.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
				<path d="M10.5 2V4.2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
			</svg>
		</DateRangePickerPrimitive.Trigger>
	</div>
	<Portal>
		<DateRangePickerPrimitive.Content class="date-picker-content" sideOffset={6}>
			<DateRangePickerPrimitive.Calendar>
				{#snippet children({ months, weekdays })}
					<CalendarHeader>
						<CalendarPrevButton />
						<CalendarHeading />
						<CalendarNextButton />
					</CalendarHeader>
					<div class="calendar-months">
						{#each months as month (month.value.toString())}
							<RangeCalendarGrid {month} {weekdays} />
						{/each}
					</div>
				{/snippet}
			</DateRangePickerPrimitive.Calendar>
		</DateRangePickerPrimitive.Content>
	</Portal>
</DateRangePickerPrimitive.Root>

<style>
	:global(.date-picker-input) {
		display: flex;
		align-items: center;
		gap: 2px;
		flex: none;
		min-width: 0;
	}

	.date-range-separator {
		flex: none;
		color: var(--text-secondary);
		padding: 0 2px;
	}

	:global(.date-picker-trigger) {
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

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 2px var(--surface-active);
		}

		&:disabled {
			cursor: not-allowed;
			opacity: 0.45;
		}
	}

	:global(.date-picker-content) {
		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		padding: var(--space-4);
		z-index: var(--z-overlay);

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);
	}

	:global(.date-picker-content[data-starting-style]),
	:global(.date-picker-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}

	.calendar-months {
		display: flex;
		gap: var(--space-6);
	}

	:global(.date-field) {
		display: inline-flex;
		align-items: center;
		width: 100%;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-2) 0 var(--space-3);

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not(:has(.date-picker-input[data-disabled])) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible) {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}
	}

	:global(.date-field:has(.date-picker-input[data-invalid])) {
		border-color: var(--status-danger-fg);
	}

	:global(.date-field:has(.date-picker-input[data-invalid]):has(:focus-visible)) {
		border-color: var(--status-danger-fg);
		box-shadow: 0 0 0 3px var(--status-danger-bg);
	}

	:global(.date-field:has(.date-picker-input[data-disabled])) {
		background: var(--surface-sunken);
		border-color: var(--border-subtle);
		cursor: not-allowed;
	}

	:global(.date-field--sm) {
		height: 32px;
	}

	:global(.date-field--md) {
		height: 40px;
	}

	:global(.date-field--lg) {
		height: 48px;
	}

	:global(.date-field-segment) {
		padding: 0 1px;
		border-radius: var(--radius-xs);

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);
		text-align: center;

		outline: none;

		&:hover:not([data-disabled]) {
			background: var(--surface-hover);
		}

		&:focus:not([data-disabled]) {
			background: var(--action-primary);
			color: var(--text-on-accent);
		}

		&[data-disabled] {
			color: var(--text-disabled);
		}
	}

	:global(.date-field-literal) {
		color: var(--text-secondary);
	}
</style>
