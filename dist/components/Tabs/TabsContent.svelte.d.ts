declare const TabsContent: import("svelte").Component<Omit<{
    value: string;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveDivAttributes, import("bits-ui").TabsContentPropsWithoutHTML>, {}, "">;
type TabsContent = ReturnType<typeof TabsContent>;
export default TabsContent;
