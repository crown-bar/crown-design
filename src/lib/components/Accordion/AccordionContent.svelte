<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof AccordionPrimitive.Content>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Content class="accordion-content{className ? ' ' + className : ''}" {...rest}>
	<div class="accordion-content-inner">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>

<style>
	:global(.accordion-content) {
		overflow: hidden;
	}

	:global(.accordion-content[data-state='open']) {
		animation: accordion-open var(--duration-normal) var(--ease-out);
	}

	:global(.accordion-content[data-state='closed']) {
		animation: accordion-close var(--duration-normal) var(--ease-out);
	}

	.accordion-content-inner {
		padding: 0 var(--space-1) var(--space-4);
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	@keyframes accordion-open {
		from {
			height: 0;
		}
		to {
			height: var(--bits-accordion-content-height);
		}
	}

	@keyframes accordion-close {
		from {
			height: var(--bits-accordion-content-height);
		}
		to {
			height: 0;
		}
	}
</style>
