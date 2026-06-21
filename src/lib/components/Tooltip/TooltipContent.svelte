<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Content>;

	let { sideOffset = 8, class: className = '', children, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Portal>
	<TooltipPrimitive.Content
		class="tooltip-content{className ? ' ' + className : ''}"
		{sideOffset}
		{...rest}
	>
		{@render children?.()}
	</TooltipPrimitive.Content>
</TooltipPrimitive.Portal>

<style>
	:global(.tooltip-content) {
		z-index: var(--z-overlay);

		font-family: var(--font-sans);
		font-size: var(--size-2xs);
		font-weight: var(--weight-medium);
		letter-spacing: 0.01em;
		color: var(--text-inverse);
		white-space: nowrap;

		background: var(--surface-inverse);
		padding: 5px 9px;
		border-radius: var(--radius-sm);
		box-shadow: var(--shadow-md);
		pointer-events: none;

		opacity: 1;
		transition: opacity var(--duration-fast) var(--ease-standard);
	}

	:global(.tooltip-content[data-starting-style]),
	:global(.tooltip-content[data-ending-style]) {
		opacity: 0;
	}
</style>
