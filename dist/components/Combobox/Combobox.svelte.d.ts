export interface ComboboxOption {
    value: string;
    label?: string;
    disabled?: boolean;
}
type Size = 'sm' | 'md' | 'lg';
interface Props {
    /** `single` picks one value (string); `multiple` picks many (string[]). */
    type?: 'single' | 'multiple';
    /** Bound value — a string for `single`, a string[] for `multiple`. */
    value?: string | string[];
    onValueChange?: (value: string | string[]) => void;
    /** Selectable options shown (and filtered) in the dropdown. */
    options?: ComboboxOption[];
    placeholder?: string;
    /** Row shown when the query matches no options. */
    emptyText?: string;
    /** `multiple` only — cap the number of selections. */
    max?: number;
    /** `single` only — show a clear (×) button once a value is picked. */
    clearable?: boolean;
    disabled?: boolean;
    invalid?: boolean;
    size?: Size;
    id?: string;
    class?: string;
}
declare const Combobox: import("svelte").Component<Props, {}, "value">;
type Combobox = ReturnType<typeof Combobox>;
export default Combobox;
