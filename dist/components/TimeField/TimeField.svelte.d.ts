import { TimeField as TimeFieldPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends Omit<ComponentProps<typeof TimeFieldPrimitive.Root>, 'children'> {
    size?: Size;
    class?: string;
}
declare const TimeField: import("svelte").Component<Props, {}, "value" | "placeholder">;
type TimeField = ReturnType<typeof TimeField>;
export default TimeField;
