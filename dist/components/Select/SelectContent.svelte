<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Content>;

	let { class: className = '', sideOffset = 6, children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Portal>
	<SelectPrimitive.Content
		class="select-content{className ? ' ' + className : ''}"
		{sideOffset}
		{...rest}
	>
		{@render children?.()}
	</SelectPrimitive.Content>
</SelectPrimitive.Portal>

<style>
	:global(.select-content) {
		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-md);
		padding: var(--space-1);

		max-height: 280px;
		overflow-y: auto;
		width: var(--bits-floating-anchor-width);
		min-width: var(--bits-floating-anchor-width);
		z-index: var(--z-overlay);

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);
	}

	:global(.select-content[data-starting-style]),
	:global(.select-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}
</style>
