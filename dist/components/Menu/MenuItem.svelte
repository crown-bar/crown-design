<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	interface Props extends ComponentProps<typeof MenuPrimitive.Item> {
		/** Leading icon. */
		icon?: Snippet;
		/** Keyboard hint shown on the right (rendered in mono). */
		shortcut?: string;
		/** Render in danger color for destructive actions. */
		danger?: boolean;
	}

	let {
		icon,
		shortcut,
		danger = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<MenuPrimitive.Item
	class="menu-item{danger ? ' menu-item--danger' : ''}{className ? ' ' + className : ''}"
	{...rest}
>
	{#if icon}
		<span class="menu-item-icon">{@render icon()}</span>
	{/if}
	<span class="menu-item-label">{@render children?.()}</span>
	{#if shortcut}
		<span class="menu-item-shortcut">{shortcut}</span>
	{/if}
</MenuPrimitive.Item>

<style>
	:global(.menu-item) {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		padding: 8px 10px;

		border-radius: var(--radius-sm);
		cursor: pointer;
		user-select: none;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		transition: background var(--duration-fast) var(--ease-standard);

		&[data-highlighted] {
			background: var(--surface-hover);
		}

		&[data-disabled] {
			color: var(--text-disabled);
			cursor: not-allowed;
		}
	}

	:global(.menu-item--danger) {
		color: var(--status-danger-fg);
	}

	.menu-item-icon {
		display: inline-flex;
		flex: none;
		width: 16px;
		height: 16px;
		color: inherit;
	}

	.menu-item-icon :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.menu-item-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.menu-item-shortcut {
		flex: none;
		font-family: var(--font-mono);
		font-size: var(--size-2xs);
		color: var(--text-disabled);
	}
</style>
