import type { HTMLAttributes } from 'svelte/elements';
type Variant = 'text' | 'circular' | 'rectangular';
type Animation = 'pulse' | 'wave' | 'none';
interface Props extends HTMLAttributes<HTMLDivElement> {
    variant?: Variant;
    width?: string | number;
    height?: string | number;
    animation?: Animation;
    /** Override border radius. */
    radius?: string;
}
declare const Skeleton: import("svelte").Component<Props, {}, "">;
type Skeleton = ReturnType<typeof Skeleton>;
export default Skeleton;
