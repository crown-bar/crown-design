import { DropdownMenu as MenuPrimitive } from 'bits-ui';
import type { ComponentProps, Snippet } from 'svelte';
interface Props extends ComponentProps<typeof MenuPrimitive.Item> {
    /** Leading icon. */
    icon?: Snippet;
    /** Keyboard hint shown on the right (rendered in mono). */
    shortcut?: string;
    /** Render in danger color for destructive actions. */
    danger?: boolean;
}
declare const MenuItem: import("svelte").Component<Props, {}, "">;
type MenuItem = ReturnType<typeof MenuItem>;
export default MenuItem;
