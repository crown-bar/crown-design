<script lang="ts">
	import { Tabs as TabsPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TabsPrimitive.Root>;

	let {
		value = $bindable(''),
		orientation = 'horizontal',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<TabsPrimitive.Root
	bind:value
	{orientation}
	class="tabs tabs--{orientation}{className ? ' ' + className : ''}"
	{...rest}
>
	{@render children?.()}
</TabsPrimitive.Root>

<style>
	:global(.tabs) {
		display: flex;
		gap: var(--space-4);
	}

	:global(.tabs--horizontal) {
		flex-direction: column;
	}

	:global(.tabs--vertical) {
		flex-direction: row;
	}
</style>
