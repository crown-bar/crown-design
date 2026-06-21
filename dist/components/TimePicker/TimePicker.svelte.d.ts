import { Time } from '@internationalized/date';
type Size = 'sm' | 'md' | 'lg';
interface Props {
    value?: Time;
    onValueChange?: (value: Time | undefined) => void;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    size?: Size;
    /** Minute interval between options in the dropdown list. */
    step?: number;
    hourCycle?: 12 | 24;
    id?: string;
    class?: string;
}
declare const TimePicker: import("svelte").Component<Props, {}, "value">;
type TimePicker = ReturnType<typeof TimePicker>;
export default TimePicker;
