<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof RadioGroupPrimitive.Root>;

	let {
		value = $bindable(''),
		orientation = 'vertical',
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<RadioGroupPrimitive.Root
	bind:value
	{orientation}
	class="radio-group radio-group--{orientation}{className ? ' ' + className : ''}"
	{...rest}
>
	{@render children?.()}
</RadioGroupPrimitive.Root>

<style>
	:global(.radio-group) {
		display: flex;
		gap: var(--space-3);
	}

	:global(.radio-group--vertical) {
		flex-direction: column;
	}

	:global(.radio-group--horizontal) {
		flex-direction: row;
		align-items: center;
	}
</style>
