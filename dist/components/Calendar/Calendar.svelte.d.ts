import { type DateMatcher } from 'bits-ui';
import type { DateValue } from '@internationalized/date';
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
declare const Calendar: import("svelte").Component<Props, {}, "value" | "placeholder">;
type Calendar = ReturnType<typeof Calendar>;
export default Calendar;
