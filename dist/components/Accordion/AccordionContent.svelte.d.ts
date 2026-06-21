declare const AccordionContent: import("svelte").Component<Omit<{
    forceMount?: boolean;
    hiddenUntilFound?: boolean;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[import("bits-ui").AccordionContentSnippetProps & {
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveDivAttributes, import("bits-ui").AccordionContentPropsWithoutHTML>, {}, "">;
type AccordionContent = ReturnType<typeof AccordionContent>;
export default AccordionContent;
