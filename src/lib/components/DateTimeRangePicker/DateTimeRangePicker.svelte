<script lang="ts">
	import { toCalendarDate } from '@internationalized/date';
	import type { CalendarDate, CalendarDateTime } from '@internationalized/date';
	import DateTimePicker from '../DateTimePicker/DateTimePicker.svelte';

	type Size = 'sm' | 'md' | 'lg';

	export interface DateTimeRangeValue {
		start?: CalendarDateTime;
		end?: CalendarDateTime;
	}

	interface Props {
		value?: DateTimeRangeValue;
		onValueChange?: (value: DateTimeRangeValue) => void;
		minValue?: CalendarDate;
		maxValue?: CalendarDate;
		disabled?: boolean;
		size?: Size;
		class?: string;
	}

	let {
		value = $bindable({}),
		onValueChange,
		minValue,
		maxValue,
		disabled = false,
		size = 'md',
		class: className = ''
	}: Props = $props();

	function setRange(next: DateTimeRangeValue) {
		value = next;
		onValueChange?.(next);
	}

	function handleStartChange(start: CalendarDateTime | undefined) {
		setRange({ ...value, start });
	}

	function handleEndChange(end: CalendarDateTime | undefined) {
		setRange({ ...value, end });
	}

	const endMinValue = $derived(value.start ? toCalendarDate(value.start) : minValue);
	const startMaxValue = $derived(value.end ? toCalendarDate(value.end) : maxValue);
</script>

<div class="datetime-range-picker datetime-range-picker--{size}{className ? ' ' + className : ''}">
	<DateTimePicker
		value={value.start}
		onValueChange={handleStartChange}
		{minValue}
		maxValue={startMaxValue}
		{disabled}
		{size}
		class="datetime-range-start"
	/>
	<span class="datetime-range-separator" aria-hidden="true">
		<svg viewBox="0 0 16 16" fill="none">
			<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	</span>
	<DateTimePicker
		value={value.end}
		onValueChange={handleEndChange}
		minValue={endMinValue}
		{maxValue}
		{disabled}
		{size}
		class="datetime-range-end"
	/>
</div>

<style>
	.datetime-range-picker {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		width: 100%;
	}

	.datetime-range-picker :global(.datetime-picker) {
		flex: 1;
		min-width: 0;
	}

	.datetime-range-separator {
		display: inline-flex;
		flex: none;
		color: var(--text-secondary);

		& svg {
			width: 16px;
			height: 16px;
		}
	}
</style>
