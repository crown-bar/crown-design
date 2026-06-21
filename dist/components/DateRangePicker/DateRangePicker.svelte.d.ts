import { DateRangePicker as DateRangePickerPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends Omit<ComponentProps<typeof DateRangePickerPrimitive.Root>, 'children'> {
    size?: Size;
    class?: string;
}
declare const DateRangePicker: import("svelte").Component<Props, {}, "value" | "placeholder" | "open">;
type DateRangePicker = ReturnType<typeof DateRangePicker>;
export default DateRangePicker;
