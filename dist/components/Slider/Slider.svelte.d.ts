interface Props {
    type?: 'single' | 'multiple';
    value?: number | number[];
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Override the accent color. */
    color?: string;
    class?: string;
}
declare const Slider: import("svelte").Component<Props, {}, "value">;
type Slider = ReturnType<typeof Slider>;
export default Slider;
