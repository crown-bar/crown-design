import { DropdownMenu as MenuPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof MenuPrimitive.Content> {
    /** Menu width in px (or any CSS width value). */
    width?: number | string;
}
declare const MenuContent: import("svelte").Component<Props, {}, "">;
type MenuContent = ReturnType<typeof MenuContent>;
export default MenuContent;
