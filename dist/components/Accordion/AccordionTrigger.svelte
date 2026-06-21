<script lang="ts">
	import { Accordion as AccordionPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof AccordionPrimitive.Trigger> {
		/** Heading level for the wrapping Accordion.Header (`aria-level`). */
		level?: 1 | 2 | 3 | 4 | 5 | 6;
	}

	let { level = 3, class: className = '', children, ...rest }: Props = $props();
</script>

<AccordionPrimitive.Header {level} class="accordion-header">
	<AccordionPrimitive.Trigger class="accordion-trigger{className ? ' ' + className : ''}" {...rest}>
		{@render children?.()}
		<svg
			class="accordion-chevron"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
		>
			<path d="m6 9 6 6 6-6" />
		</svg>
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>

<style>
	:global(.accordion-header) {
		display: flex;
	}

	:global(.accordion-trigger) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		width: 100%;
		padding: var(--space-4) var(--space-1);

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		font-weight: var(--weight-medium);
		color: var(--text-primary);
		text-align: left;

		background: transparent;
		border: none;
		cursor: pointer;

		transition: color var(--duration-fast) var(--ease-standard);

		&:hover {
			color: var(--text-secondary);
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

	.accordion-chevron {
		flex: none;
		width: 16px;
		height: 16px;
		color: var(--text-secondary);
		transition: transform var(--duration-fast) var(--ease-standard);
	}

	:global(.accordion-trigger[data-state='open']) .accordion-chevron {
		transform: rotate(180deg);
	}
</style>
