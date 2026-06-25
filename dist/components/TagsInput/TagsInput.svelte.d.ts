type Size = 'sm' | 'md' | 'lg';
type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
type Variant = 'soft' | 'outline' | 'solid';
interface TagOption {
    value: string;
    label?: string;
    disabled?: boolean;
}
interface Props {
    value?: string[];
    onValueChange?: (value: string[]) => void;
    /** Predefined suggestions shown in the dropdown. */
    options?: TagOption[];
    /** Whether typed text that doesn't match an option can become a new tag. */
    allowCustomTags?: boolean;
    /** Maximum number of tags. */
    max?: number;
    placeholder?: string;
    disabled?: boolean;
    invalid?: boolean;
    size?: Size;
    tone?: Tone;
    variant?: Variant;
    id?: string;
    class?: string;
}
declare const TagsInput: import("svelte").Component<Props, {}, "value">;
type TagsInput = ReturnType<typeof TagsInput>;
export default TagsInput;
