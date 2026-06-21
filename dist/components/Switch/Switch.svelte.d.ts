import { Switch as SwitchPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof SwitchPrimitive.Root> {
    /** Override the accent color. */
    color?: string;
}
declare const Switch: import("svelte").Component<Props, {}, "checked">;
type Switch = ReturnType<typeof Switch>;
export default Switch;
