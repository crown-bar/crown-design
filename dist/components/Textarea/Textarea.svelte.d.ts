import type { HTMLTextareaAttributes } from 'svelte/elements';
interface Props extends HTMLTextareaAttributes {
    invalid?: boolean;
    /** Override border radius. */
    radius?: string;
}
declare const Textarea: import("svelte").Component<Props, {}, "value">;
type Textarea = ReturnType<typeof Textarea>;
export default Textarea;
