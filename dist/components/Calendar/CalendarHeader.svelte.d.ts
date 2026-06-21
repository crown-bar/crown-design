declare const CalendarHeader: import("svelte").Component<Omit<{}, "children" | "child"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveHeaderAttributes, import("bits-ui").CalendarHeaderPropsWithoutHTML>, {}, "">;
type CalendarHeader = ReturnType<typeof CalendarHeader>;
export default CalendarHeader;
