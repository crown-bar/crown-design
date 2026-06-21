import type { HTMLAttributes } from 'svelte/elements';
interface Props extends HTMLAttributes<HTMLHRElement> {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
}
declare const Separator: import("svelte").Component<Props, {}, "">;
type Separator = ReturnType<typeof Separator>;
export default Separator;
