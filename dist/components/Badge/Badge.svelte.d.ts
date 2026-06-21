import type { HTMLAttributes } from 'svelte/elements';
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
type Variant = 'soft' | 'outline' | 'solid';
interface Props extends HTMLAttributes<HTMLSpanElement> {
    tone?: Tone;
    variant?: Variant;
    dot?: boolean;
}
declare const Badge: import("svelte").Component<Props, {}, "">;
type Badge = ReturnType<typeof Badge>;
export default Badge;
