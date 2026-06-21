import type { HTMLAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';
type Variant = 'outline' | 'flat' | 'elevated';
interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    eyebrow?: string;
    title?: string;
    /** Footer actions — typically Buttons. */
    footer?: Snippet;
}
declare const Card: import("svelte").Component<Props, {}, "">;
type Card = ReturnType<typeof Card>;
export default Card;
