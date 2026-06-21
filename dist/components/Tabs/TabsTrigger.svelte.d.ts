declare const TabsTrigger: import("svelte").Component<Omit<{
    value: string;
    disabled?: boolean | null | undefined;
}, "children" | "child"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveButtonAttributes, import("bits-ui").TabsTriggerPropsWithoutHTML>, {}, "">;
type TabsTrigger = ReturnType<typeof TabsTrigger>;
export default TabsTrigger;
