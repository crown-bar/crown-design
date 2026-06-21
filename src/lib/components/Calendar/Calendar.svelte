<script lang="ts">
	import { Calendar as CalendarPrimitive, type DateMatcher } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';
	import CalendarHeader from './CalendarHeader.svelte';
	import CalendarHeading from './CalendarHeading.svelte';
	import CalendarPrevButton from './CalendarPrevButton.svelte';
	import CalendarNextButton from './CalendarNextButton.svelte';
	import CalendarGrid from './CalendarGrid.svelte';

	interface Props {
		value?: DateValue;
		onValueChange?: (value: DateValue | undefined) => void;
		placeholder?: DateValue;
		onPlaceholderChange?: (value: DateValue) => void;
		minValue?: DateValue;
		maxValue?: DateValue;
		disabled?: boolean;
		readonly?: boolean;
		preventDeselect?: boolean;
		numberOfMonths?: number;
		weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
		weekdayFormat?: Intl.DateTimeFormatOptions['weekday'];
		isDateDisabled?: DateMatcher;
		isDateUnavailable?: DateMatcher;
		fixedWeeks?: boolean;
		locale?: string;
		class?: string;
	}

	let {
		value = $bindable(),
		placeholder = $bindable(),
		locale = 'de-CH',
		weekStartsOn = 1,
		class: className = '',
		...rest
	}: Props = $props();
</script>

<CalendarPrimitive.Root
	type="single"
	bind:value
	bind:placeholder
	{locale}
	{weekStartsOn}
	class="calendar{className ? ' ' + className : ''}"
	{...rest}
>
	{#snippet children({ months, weekdays })}
		<CalendarHeader>
			<CalendarPrevButton />
			<CalendarHeading />
			<CalendarNextButton />
		</CalendarHeader>
		<div class="calendar-months">
			{#each months as month (month.value.toString())}
				<CalendarGrid {month} {weekdays} />
			{/each}
		</div>
	{/snippet}
</CalendarPrimitive.Root>

<style>
	:global(.calendar) {
		display: inline-flex;
		flex-direction: column;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-md);
		padding: var(--space-4);
	}

	.calendar-months {
		display: flex;
		gap: var(--space-6);
	}
</style>
