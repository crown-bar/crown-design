import { Progress as ProgressPrimitive } from 'bits-ui';
import type { ComponentProps } from 'svelte';
type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'info';
type Size = 'sm' | 'md' | 'lg';
interface Props extends ComponentProps<typeof ProgressPrimitive.Root> {
    tone?: Tone;
    size?: Size;
    /** Optional label shown above the track. */
    label?: string;
    /** Show the percentage on the right of the label row. */
    showValue?: boolean;
}
declare const Progress: import("svelte").Component<Props, {}, "">;
type Progress = ReturnType<typeof Progress>;
export default Progress;
