import { Dialog as SheetPrimitive } from 'bits-ui';
import type { ComponentProps, Snippet } from 'svelte';
type Side = 'left' | 'right' | 'top' | 'bottom';
interface Props extends ComponentProps<typeof SheetPrimitive.Content> {
    /** Edge the sheet slides in from. */
    side?: Side;
    eyebrow?: string;
    title?: string;
    /** Footer actions — typically Buttons. */
    footer?: Snippet;
    /** Sheet width (left/right) or height (top/bottom), in px (or any CSS size value). */
    size?: number | string;
    /** Renders a built-in dismiss icon in the corner. */
    showClose?: boolean;
}
declare const SheetContent: import("svelte").Component<Props, {}, "">;
type SheetContent = ReturnType<typeof SheetContent>;
export default SheetContent;
