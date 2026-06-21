<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.List>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<TabsPrimitive.List class="tabs-list{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</TabsPrimitive.List>

<style>
	:global(.tabs-list) {
		display: flex;
		gap: var(--space-1);
		border-bottom: var(--border-hairline) solid var(--border-subtle);
	}

	:global(.tabs-list[data-orientation='vertical']) {
		flex-direction: column;
		border-bottom: none;
		border-right: var(--border-hairline) solid var(--border-subtle);
		padding-right: var(--space-1);
	}
</style>
