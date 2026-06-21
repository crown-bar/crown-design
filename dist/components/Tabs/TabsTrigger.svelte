<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Trigger>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Trigger class="tabs-trigger{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</TabsPrimitive.Trigger>

<style>
	:global(.tabs-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		margin-bottom: -1px;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		font-weight: var(--weight-medium);
		color: var(--text-secondary);
		white-space: nowrap;

		background: transparent;
		border: none;
		border-bottom: var(--border-thick) solid transparent;
		cursor: pointer;

		transition:
			color var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard);

		&:hover {
			color: var(--text-primary);
		}

		&[data-state='active'] {
			color: var(--text-primary);
			border-bottom-color: var(--action-primary);
		}

		&[data-disabled] {
			color: var(--text-disabled);
			cursor: not-allowed;
		}

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}
	}

	:global(.tabs-trigger[data-orientation='vertical']) {
		justify-content: flex-start;
		margin-bottom: 0;
		margin-right: -1px;
		border-bottom: none;
		border-right: var(--border-thick) solid transparent;
	}

	:global(.tabs-trigger[data-orientation='vertical'][data-state='active']) {
		border-right-color: var(--action-primary);
	}
</style>
