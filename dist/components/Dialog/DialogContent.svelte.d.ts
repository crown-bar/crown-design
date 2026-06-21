import { Dialog as DialogPrimitive } from 'bits-ui';
import type { ComponentProps, Snippet } from 'svelte';
interface Props extends ComponentProps<typeof DialogPrimitive.Content> {
    eyebrow?: string;
    title?: string;
    /** Footer actions — typically Buttons. */
    footer?: Snippet;
    /** Dialog width in px (or any CSS width value). */
    width?: number | string;
}
declare const DialogContent: import("svelte").Component<Props, {}, "">;
type DialogContent = ReturnType<typeof DialogContent>;
export default DialogContent;
