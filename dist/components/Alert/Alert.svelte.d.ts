import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';
interface Props extends HTMLAttributes<HTMLDivElement> {
    tone?: Tone;
    /** Bold first line. */
    title?: string;
    /** Leading icon. */
    icon?: Snippet;
    /** Action node rendered under the body (e.g. a Button). */
    action?: Snippet;
    /** When provided, renders a dismiss control. */
    onclose?: () => void;
}
declare const Alert: import("svelte").Component<Props, {}, "">;
type Alert = ReturnType<typeof Alert>;
export default Alert;
