import { DatePicker as DatePickerPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends Omit<ComponentProps<typeof DatePickerPrimitive.Root>, 'children'> {
    size?: Size;
    class?: string;
}
declare const DatePicker: import("svelte").Component<Props, {}, "value" | "placeholder" | "open">;
type DatePicker = ReturnType<typeof DatePicker>;
export default DatePicker;
