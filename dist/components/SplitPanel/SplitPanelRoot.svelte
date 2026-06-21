<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/** Column sizing for the two panes, as a CSS grid-template-columns value. */
		ratio?: string;
	}

	let { ratio = '1fr 1fr', class: className = '', style: styleProp, children, ...rest }: Props =
		$props();
</script>

<div
	class="split-panel{className ? ' ' + className : ''}"
	style="--split-panel-ratio: {ratio};{styleProp ? ' ' + styleProp : ''}"
	{...rest}
>
	{@render children?.()}
</div>

<style>
	.split-panel {
		display: grid;
		grid-template-columns: var(--split-panel-ratio, 1fr 1fr);

		background: color-mix(in srgb, var(--surface-card) 90%, transparent);
		backdrop-filter: blur(24px);
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);
		overflow: hidden;
	}

	@media (max-width: 640px) {
		.split-panel {
			grid-template-columns: 1fr;
		}
	}
</style>
