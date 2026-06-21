import type { HTMLAttributes } from 'svelte/elements';
type Shape = 'rounded' | 'circle';
interface Props extends HTMLAttributes<HTMLSpanElement> {
    name?: string;
    src?: string;
    size?: number;
    shape?: Shape;
}
declare const Avatar: import("svelte").Component<Props, {}, "">;
type Avatar = ReturnType<typeof Avatar>;
export default Avatar;
