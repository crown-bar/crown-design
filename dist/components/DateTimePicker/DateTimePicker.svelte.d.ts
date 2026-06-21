import { CalendarDateTime } from '@internationalized/date';
import type { CalendarDate } from '@internationalized/date';
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
declare const DateTimePicker: import("svelte").Component<Props, {}, "value">;
type DateTimePicker = ReturnType<typeof DateTimePicker>;
export default DateTimePicker;
