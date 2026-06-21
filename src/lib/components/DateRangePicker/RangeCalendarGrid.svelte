<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive, type Month } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';

	interface Props {
		month: Month<DateValue>;
		weekdays: string[];
	}

	let { month, weekdays }: Props = $props();
</script>

<RangeCalendarPrimitive.Grid class="calendar-grid">
	<RangeCalendarPrimitive.GridHead>
		<RangeCalendarPrimitive.GridRow class="calendar-grid-row">
			{#each weekdays as day, i (i)}
				<RangeCalendarPrimitive.HeadCell class="calendar-head-cell">{day}</RangeCalendarPrimitive.HeadCell>
			{/each}
		</RangeCalendarPrimitive.GridRow>
	</RangeCalendarPrimitive.GridHead>
	<RangeCalendarPrimitive.GridBody>
		{#each month.weeks as weekDates (weekDates[0]?.toString())}
			<RangeCalendarPrimitive.GridRow class="calendar-grid-row">
				{#each weekDates as date (date.toString())}
					<RangeCalendarPrimitive.Cell {date} month={month.value} class="range-calendar-cell">
						<RangeCalendarPrimitive.Day class="range-calendar-day" />
					</RangeCalendarPrimitive.Cell>
				{/each}
			</RangeCalendarPrimitive.GridRow>
		{/each}
	</RangeCalendarPrimitive.GridBody>
</RangeCalendarPrimitive.Grid>

<style>
	:global(.calendar-grid) {
		border-collapse: collapse;
		width: 100%;
	}

	:global(.calendar-grid-row) {
		display: flex;
	}

	:global(.calendar-head-cell) {
		flex: 1;
		width: 36px;
		padding-bottom: var(--space-2);

		font-family: var(--font-sans);
		font-weight: var(--weight-medium);
		font-size: var(--size-2xs);
		letter-spacing: var(--tracking-wide);
		text-transform: uppercase;
		color: var(--text-secondary);
		text-align: center;
	}

	:global(.range-calendar-cell) {
		flex: 1;
		text-align: center;

		&[data-highlighted] {
			background: var(--surface-hover);
		}

		&[data-selection-start],
		&[data-range-start] {
			border-top-left-radius: var(--radius-sm);
			border-bottom-left-radius: var(--radius-sm);
		}

		&[data-selection-end],
		&[data-range-end] {
			border-top-right-radius: var(--radius-sm);
			border-bottom-right-radius: var(--radius-sm);
		}
	}

	:global(.range-calendar-day) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 34px;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);
		cursor: pointer;

		transition: background var(--duration-fast) var(--ease-standard);

		&:hover:not([data-disabled]):not([data-selected]) {
			background: var(--surface-active);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 2px var(--surface-page), 0 0 0 4px var(--border-strong);
		}

		&[data-today]:not([data-selected]) {
			font-weight: var(--weight-semibold);
			color: var(--action-primary);
		}

		&[data-selected] {
			background: var(--action-primary);
			color: var(--text-on-accent);
			font-weight: var(--weight-medium);
		}

		&[data-selection-start],
		&[data-range-start] {
			border-radius: var(--radius-sm);
		}

		&[data-selection-end],
		&[data-range-end] {
			border-radius: var(--radius-sm);
		}

		&[data-outside-month] {
			color: var(--text-disabled);
		}

		&[data-disabled] {
			color: var(--text-disabled);
			cursor: not-allowed;
		}

		&[data-unavailable] {
			color: var(--status-danger-fg);
			text-decoration: line-through;
			cursor: not-allowed;
		}
	}
</style>
