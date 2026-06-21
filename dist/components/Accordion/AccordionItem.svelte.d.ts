declare const AccordionItem: import("svelte").Component<Omit<{
    value?: string;
    disabled?: boolean;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & Omit<import("bits-ui").BitsDivAttributes, "id" | "style" | "children"> & {
    id?: string;
}, {}, "">;
type AccordionItem = ReturnType<typeof AccordionItem>;
export default AccordionItem;
