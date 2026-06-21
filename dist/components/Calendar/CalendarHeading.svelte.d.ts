declare const CalendarHeading: import("svelte").Component<Omit<{}, "children" | "child"> & {
    child?: import("svelte").Snippet<[import("bits-ui").CalendarHeadingSnippetProps & {
        props: Record<string, unknown>;
    }]> | undefined;
    children?: import("svelte").Snippet<[import("bits-ui").CalendarHeadingSnippetProps]> | undefined;
    style?: import("bits-ui").StyleProperties | string | null | undefined;
    ref?: HTMLElement | null | undefined;
} & import("bits-ui").Without<import("bits-ui").BitsPrimitiveDivAttributes, import("bits-ui").CalendarHeadingPropsWithoutHTML>, {}, "">;
type CalendarHeading = ReturnType<typeof CalendarHeading>;
export default CalendarHeading;
