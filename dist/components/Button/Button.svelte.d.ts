import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';
interface Props extends HTMLButtonAttributes {
    variant?: Variant;
    size?: Size;
    fullWidth?: boolean;
    iconLeft?: Snippet;
    iconRight?: Snippet;
    /** Override the accent color. On primary/danger: changes fill. On ghost: changes text. */
    color?: string;
    /** Override border radius. */
    radius?: string;
}
declare const Button: import("svelte").Component<Props, {}, "">;
type Button = ReturnType<typeof Button>;
export default Button;
