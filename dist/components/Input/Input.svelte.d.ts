import type { HTMLInputAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
type Size = 'sm' | 'md' | 'lg';
interface Props extends Omit<HTMLInputAttributes, 'size'> {
    size?: Size;
    invalid?: boolean;
    iconLeft?: Snippet;
    iconRight?: Snippet;
    /** Override border radius. */
    radius?: string;
}
declare const Input: import("svelte").Component<Props, {}, "value">;
type Input = ReturnType<typeof Input>;
export default Input;
