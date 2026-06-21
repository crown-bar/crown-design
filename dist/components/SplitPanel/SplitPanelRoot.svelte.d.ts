import type { HTMLAttributes } from 'svelte/elements';
interface Props extends HTMLAttributes<HTMLDivElement> {
    /** Column sizing for the two panes, as a CSS grid-template-columns value. */
    ratio?: string;
}
declare const SplitPanelRoot: import("svelte").Component<Props, {}, "">;
type SplitPanelRoot = ReturnType<typeof SplitPanelRoot>;
export default SplitPanelRoot;
