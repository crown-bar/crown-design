<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Tone = 'primary' | 'secondary';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** `secondary` adds a divider and a faint tint to set this pane apart from the first. */
		tone?: Tone;
	}

	let { tone = 'primary', class: className = '', children, ...rest }: Props = $props();
</script>

<div class="split-panel-pane split-panel-pane--{tone}{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</div>

<style>
	.split-panel-pane {
		min-width: 0;
		padding: var(--space-8);
	}

	.split-panel-pane--secondary {
		background: color-mix(in srgb, var(--surface-sunken) 50%, transparent);
		border-left: var(--border-hairline) solid var(--border-subtle);
	}

	@media (max-width: 640px) {
		.split-panel-pane--secondary {
			border-left: none;
			border-top: var(--border-hairline) solid var(--border-subtle);
		}
	}
</style>
