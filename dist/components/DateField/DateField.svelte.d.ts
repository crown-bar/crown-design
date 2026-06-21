import { DateField as DateFieldPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends Omit<ComponentProps<typeof DateFieldPrimitive.Root>, 'children'> {
    size?: Size;
    class?: string;
}
declare const DateField: import("svelte").Component<Props, {}, "value" | "placeholder">;
type DateField = ReturnType<typeof DateField>;
export default DateField;
