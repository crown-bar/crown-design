import type { CalendarDate, CalendarDateTime } from '@internationalized/date';
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
declare const DateTimeRangePicker: import("svelte").Component<Props, {}, "value">;
type DateTimeRangePicker = ReturnType<typeof DateTimeRangePicker>;
export default DateTimeRangePicker;
