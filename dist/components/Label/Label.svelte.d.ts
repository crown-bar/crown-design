import { Label as LabelPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Size = 'sm' | 'md';
interface Props extends ComponentProps<typeof LabelPrimitive.Root> {
    size?: Size;
    required?: boolean;
    disabled?: boolean;
}
declare const Label: import("svelte").Component<Props, {}, "">;
type Label = ReturnType<typeof Label>;
export default Label;
