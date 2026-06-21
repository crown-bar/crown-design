import type { HTMLAttributes } from 'svelte/elements';
type Tone = 'primary' | 'secondary';
interface Props extends HTMLAttributes<HTMLDivElement> {
    /** `secondary` adds a divider and a faint tint to set this pane apart from the first. */
    tone?: Tone;
}
declare const SplitPanelPane: import("svelte").Component<Props, {}, "">;
type SplitPanelPane = ReturnType<typeof SplitPanelPane>;
export default SplitPanelPane;
