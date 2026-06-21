<script lang="ts">
	import { CalendarDateTime, Time, toCalendarDate, toTime, toCalendarDateTime, today, getLocalTimeZone } from '@internationalized/date';
	import type { CalendarDate, DateValue } from '@internationalized/date';
	import DatePicker from '../DatePicker/DatePicker.svelte';
	import TimePicker from '../TimePicker/TimePicker.svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props {
		value?: CalendarDateTime;
		onValueChange?: (value: CalendarDateTime | undefined) => void;
		minValue?: CalendarDate;
		maxValue?: CalendarDate;
		disabled?: boolean;
		size?: Size;
		class?: string;
	}

	let {
		value = $bindable(),
		onValueChange,
		minValue,
		maxValue,
		disabled = false,
		size = 'md',
		class: className = ''
	}: Props = $props();

	const dateValue = $derived(value ? toCalendarDate(value) : undefined);
	const timeValue = $derived(value ? toTime(value) : undefined);

	function setValue(next: CalendarDateTime | undefined) {
		value = next;
		onValueChange?.(next);
	}

	function handleDateChange(next: DateValue | undefined) {
		setValue(next ? toCalendarDateTime(toCalendarDate(next), timeValue ?? new Time(0, 0)) : undefined);
	}

	function handleTimeChange(next: Time | undefined) {
		const baseDate = dateValue ?? today(getLocalTimeZone());
		setValue(toCalendarDateTime(baseDate, next ?? new Time(0, 0)));
	}
</script>

<div class="datetime-picker datetime-picker--{size}{className ? ' ' + className : ''}">
	<DatePicker
		value={dateValue}
		onValueChange={handleDateChange}
		{minValue}
		{maxValue}
		{disabled}
		{size}
		class="datetime-picker-date"
	/>
	<TimePicker
		value={timeValue}
		onValueChange={handleTimeChange}
		{disabled}
		{size}
		class="datetime-picker-time"
	/>
</div>

<style>
	.datetime-picker {
		display: flex;
		align-items: stretch;
	}

	:global(.datetime-picker-date) {
		flex: 1;
		min-width: 0;
		border-top-right-radius: 0 !important;
		border-bottom-right-radius: 0 !important;
		border-right: none !important;
	}

	:global(.datetime-picker-time) {
		flex: none;
		border-top-left-radius: 0 !important;
		border-bottom-left-radius: 0 !important;
	}
</style>
