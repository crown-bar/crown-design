<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof MenuPrimitive.Content> {
		/** Menu width in px (or any CSS width value). */
		width?: number | string;
	}

	let {
		side = 'bottom',
		align = 'start',
		sideOffset = 6,
		width = 200,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const widthValue = $derived(typeof width === 'number' ? `${width}px` : width);
</script>

<MenuPrimitive.Portal>
	<MenuPrimitive.Content
		class="menu-content{className ? ' ' + className : ''}"
		{side}
		{align}
		{sideOffset}
		style="--menu-width: {widthValue};"
		{...rest}
	>
		{@render children?.()}
	</MenuPrimitive.Content>
</MenuPrimitive.Portal>

<style>
	:global(.menu-content) {
		display: flex;
		flex-direction: column;
		width: var(--menu-width, 200px);
		padding: 6px;
		z-index: var(--z-overlay);

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);
	}

	:global(.menu-content[data-starting-style]),
	:global(.menu-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}
</style>
