<script lang="ts">
	import { Calendar as CalendarPrimitive, type Month } from 'bits-ui';
	import type { DateValue } from '@internationalized/date';

	interface Props {
		month: Month<DateValue>;
		weekdays: string[];
	}

	let { month, weekdays }: Props = $props();
</script>

<CalendarPrimitive.Grid class="calendar-grid">
	<CalendarPrimitive.GridHead>
		<CalendarPrimitive.GridRow class="calendar-grid-row">
			{#each weekdays as day, i (i)}
				<CalendarPrimitive.HeadCell class="calendar-head-cell">{day}</CalendarPrimitive.HeadCell>
			{/each}
		</CalendarPrimitive.GridRow>
	</CalendarPrimitive.GridHead>
	<CalendarPrimitive.GridBody>
		{#each month.weeks as weekDates (weekDates[0]?.toString())}
			<CalendarPrimitive.GridRow class="calendar-grid-row">
				{#each weekDates as date (date.toString())}
					<CalendarPrimitive.Cell {date} month={month.value} class="calendar-cell">
						<CalendarPrimitive.Day class="calendar-day" />
					</CalendarPrimitive.Cell>
				{/each}
			</CalendarPrimitive.GridRow>
		{/each}
	</CalendarPrimitive.GridBody>
</CalendarPrimitive.Grid>

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

	:global(.calendar-cell) {
		flex: 1;
		padding: 1px;
		text-align: center;
	}

	:global(.calendar-day) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);
		border-radius: var(--radius-sm);
		cursor: pointer;

		transition: background var(--duration-fast) var(--ease-standard);

		&:hover:not(:global([data-disabled])):not(:global([data-selected])) {
			background: var(--surface-hover);
		}

		&:focus-visible {
			outline: none;
			box-shadow: 0 0 0 2px var(--surface-page), 0 0 0 4px var(--border-strong);
		}

		&[data-today]:not(:global([data-selected])) {
			font-weight: var(--weight-semibold);
			color: var(--action-primary);
		}

		&[data-selected] {
			background: var(--action-primary);
			color: var(--text-on-accent);
			font-weight: var(--weight-medium);
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
