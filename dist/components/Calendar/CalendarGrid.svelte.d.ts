import { type Month } from 'bits-ui';
import type { DateValue } from '@internationalized/date';
interface Props {
    month: Month<DateValue>;
    weekdays: string[];
}
declare const CalendarGrid: import("svelte").Component<Props, {}, "">;
type CalendarGrid = ReturnType<typeof CalendarGrid>;
export default CalendarGrid;
