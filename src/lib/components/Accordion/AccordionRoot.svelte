<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Root>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Root class="accordion{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</AccordionPrimitive.Root>

<style>
	:global(.accordion) {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
