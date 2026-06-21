<script lang="ts">
	import { Popover as PopoverPrimitive, Portal } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof PopoverPrimitive.Content> {
		/** Popover width in px (or any CSS width value). Defaults to fitting its content. */
		width?: number | string;
	}

	let {
		side = 'bottom',
		align = 'center',
		sideOffset = 8,
		width,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const widthValue = $derived(
		width === undefined ? undefined : typeof width === 'number' ? `${width}px` : width
	);
</script>

<Portal>
	<PopoverPrimitive.Content
		class="popover-content{className ? ' ' + className : ''}"
		{side}
		{align}
		{sideOffset}
		style={widthValue ? `--popover-width: ${widthValue};` : undefined}
		{...rest}
	>
		{@render children?.()}
	</PopoverPrimitive.Content>
</Portal>

<style>
	:global(.popover-content) {
		width: var(--popover-width, auto);
		min-width: 220px;
		max-width: calc(100vw - 32px);
		padding: var(--space-4);
		z-index: var(--z-overlay);

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);

		&:focus-visible {
			outline: none;
		}
	}

	:global(.popover-content[data-starting-style]),
	:global(.popover-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
	}
</style>
