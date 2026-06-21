import { Popover as PopoverPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
interface Props extends ComponentProps<typeof PopoverPrimitive.Content> {
    /** Popover width in px (or any CSS width value). Defaults to fitting its content. */
    width?: number | string;
}
declare const PopoverContent: import("svelte").Component<Props, {}, "">;
type PopoverContent = ReturnType<typeof PopoverContent>;
export default PopoverContent;
