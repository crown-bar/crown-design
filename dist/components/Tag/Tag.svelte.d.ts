import type { HTMLAttributes } from 'svelte/elements';
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
type Variant = 'soft' | 'outline' | 'solid';
interface Props extends HTMLAttributes<HTMLSpanElement> {
    tone?: Tone;
    variant?: Variant;
    dot?: boolean;
    /** Renders a remove button when provided. */
    onremove?: () => void;
}
declare const Tag: import("svelte").Component<Props, {}, "">;
type Tag = ReturnType<typeof Tag>;
export default Tag;
