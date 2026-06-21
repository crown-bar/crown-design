import { type Month } from 'bits-ui';
import type { DateValue } from '@internationalized/date';
interface Props {
    month: Month<DateValue>;
    weekdays: string[];
}
declare const RangeCalendarGrid: import("svelte").Component<Props, {}, "">;
type RangeCalendarGrid = ReturnType<typeof RangeCalendarGrid>;
export default RangeCalendarGrid;
