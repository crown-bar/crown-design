<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Content>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<TabsPrimitive.Content class="tabs-content{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</TabsPrimitive.Content>

<style>
	:global(.tabs-content) {
		flex: 1;
		min-width: 0;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}
	}
</style>
