import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof RadioGroupPrimitive.Item> {
    /** Override the accent color. */
    color?: string;
}
declare const RadioGroupItem: import("svelte").Component<Props, {}, "">;
type RadioGroupItem = ReturnType<typeof RadioGroupItem>;
export default RadioGroupItem;
