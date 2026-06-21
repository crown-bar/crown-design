import type { HTMLAttributes } from 'svelte/elements';
interface Props extends HTMLAttributes<HTMLSpanElement> {
    /** Diameter in px. */
    size?: number;
    /** Ring stroke width in px. */
    thickness?: number;
    /** Optional text shown beside the ring. */
    label?: string;
    /** Active arc color. Defaults to the ambient text color. */
    color?: string;
}
declare const Spinner: import("svelte").Component<Props, {}, "">;
type Spinner = ReturnType<typeof Spinner>;
export default Spinner;
