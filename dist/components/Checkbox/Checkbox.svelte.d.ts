import { Checkbox as CheckboxPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof CheckboxPrimitive.Root> {
    /** Override the accent color. */
    color?: string;
}
declare const Checkbox: import("svelte").Component<Props, {}, "checked" | "indeterminate">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
