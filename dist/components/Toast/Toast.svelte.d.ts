import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
interface Props extends HTMLAttributes<HTMLDivElement> {
    tone?: Tone;
    title?: string;
    description?: string;
    /** Leading icon. */
    icon?: Snippet;
    /** When provided, renders a dismiss control. */
    onclose?: () => void;
}
declare const Toast: import("svelte").Component<Props, {}, "">;
type Toast = ReturnType<typeof Toast>;
export default Toast;
