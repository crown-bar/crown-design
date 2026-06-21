<script lang="ts">
	import { DateField as DateFieldPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<ComponentProps<typeof DateFieldPrimitive.Root>, 'children'> {
		size?: Size;
		class?: string;
	}

	let {
		size = 'md',
		value = $bindable(),
		placeholder = $bindable(),
		disabled = false,
		locale = 'de-CH',
		class: className = '',
		...rest
	}: Props = $props();
</script>

<DateFieldPrimitive.Root bind:value bind:placeholder {disabled} {locale} {...rest}>
	<DateFieldPrimitive.Input
		class="date-field-input date-field-input--{size}{className ? ' ' + className : ''}"
	>
		{#snippet children({ segments })}
			{#each segments as { part, value: segmentValue }, i (i)}
				{#if part === 'literal'}
					<span class="date-field-literal">{segmentValue}</span>
				{:else}
					<DateFieldPrimitive.Segment {part} class="date-field-segment">
						{segmentValue}
					</DateFieldPrimitive.Segment>
				{/if}
			{/each}
		{/snippet}
	</DateFieldPrimitive.Input>
</DateFieldPrimitive.Root>

<style>
	:global(.date-field-input) {
		display: inline-flex;
		align-items: center;
		gap: 2px;
		width: fit-content;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-3);

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not([data-disabled]) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible) {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}

		&[data-disabled] {
			background: var(--surface-sunken);
			border-color: var(--border-subtle);
			cursor: not-allowed;
		}
	}

	:global(.date-field-input[data-invalid]) {
		border-color: var(--status-danger-fg);
	}

	:global(.date-field-input[data-invalid]:has(:focus-visible)) {
		border-color: var(--status-danger-fg);
		box-shadow: 0 0 0 3px var(--status-danger-bg);
	}

	:global(.date-field-input--sm) {
		height: 32px;
	}

	:global(.date-field-input--md) {
		height: 40px;
	}

	:global(.date-field-input--lg) {
		height: 48px;
	}

	:global(.date-field-segment) {
		padding: 0 1px;
		border-radius: var(--radius-xs);

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);
		text-align: center;

		outline: none;

		&:hover:not([data-disabled]) {
			background: var(--surface-hover);
		}

		&:focus:not([data-disabled]) {
			background: var(--action-primary);
			color: var(--text-on-accent);
		}

		&[data-disabled] {
			color: var(--text-disabled);
		}
	}

	:global(.date-field-literal) {
		color: var(--text-secondary);
	}

	:global([data-disabled]) .date-field-literal {
		color: var(--text-disabled);
	}
</style>
