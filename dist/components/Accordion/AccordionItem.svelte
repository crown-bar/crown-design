<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Item>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Item class="accordion-item{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</AccordionPrimitive.Item>

<style>
	:global(.accordion-item) {
		border-top: var(--border-hairline) solid var(--border-subtle);
	}

	:global(.accordion-item:last-child) {
		border-bottom: var(--border-hairline) solid var(--border-subtle);
	}
</style>
