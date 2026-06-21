declare const CalendarPrevButton: import("svelte").Component<Omit<{}, "children" | "child"> & {
    child?: import("svelte").Snippet<[{
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveButtonAttributes, import("bits-ui").CalendarPrevButtonPropsWithoutHTML>, {}, "">;
type CalendarPrevButton = ReturnType<typeof CalendarPrevButton>;
export default CalendarPrevButton;
