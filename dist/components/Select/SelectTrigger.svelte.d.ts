import { Select as SelectPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends ComponentProps<typeof SelectPrimitive.Trigger> {
    size?: Size;
}
declare const SelectTrigger: import("svelte").Component<Props, {}, "">;
type SelectTrigger = ReturnType<typeof SelectTrigger>;
export default SelectTrigger;
