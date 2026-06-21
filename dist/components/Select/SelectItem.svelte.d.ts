declare const SelectItem: import("svelte").Component<Omit<{
    value: string;
    label?: string;
    disabled?: boolean;
    onHighlight?: () => void;
    onUnhighlight?: () => void;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[import("bits-ui").ComboboxItemSnippetProps & {
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[import("bits-ui").ComboboxItemSnippetProps]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveDivAttributes, import("bits-ui").ComboboxItemPropsWithoutHTML>, {}, "">;
type SelectItem = ReturnType<typeof SelectItem>;
export default SelectItem;
