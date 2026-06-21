<script lang="ts">
	import { TimeField as TimeFieldPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<ComponentProps<typeof TimeFieldPrimitive.Root>, 'children'> {
		size?: Size;
		class?: string;
	}

	let {
		size = 'md',
		value = $bindable(),
		placeholder = $bindable(),
		disabled = false,
		locale = 'de-CH',
		hourCycle = 24,
		class: className = '',
		...rest
	}: Props = $props();
</script>

<TimeFieldPrimitive.Root bind:value bind:placeholder {disabled} {locale} {hourCycle} {...rest}>
	<TimeFieldPrimitive.Input
		class="time-field time-field--{size}{className ? ' ' + className : ''}"
	>
		{#snippet children({ segments })}
			{#each segments as { part, value: segmentValue }, i (i)}
				{#if part === 'literal'}
					<span class="time-field-literal">{segmentValue}</span>
				{:else}
					<TimeFieldPrimitive.Segment {part} class="time-field-segment">
						{segmentValue}
					</TimeFieldPrimitive.Segment>
				{/if}
			{/each}
		{/snippet}
	</TimeFieldPrimitive.Input>
</TimeFieldPrimitive.Root>

<style>
	:global(.time-field) {
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

	:global(.time-field[data-invalid]) {
		border-color: var(--status-danger-fg);
	}

	:global(.time-field[data-invalid]:has(:focus-visible)) {
		border-color: var(--status-danger-fg);
		box-shadow: 0 0 0 3px var(--status-danger-bg);
	}

	:global(.time-field--sm) {
		height: 32px;
	}

	:global(.time-field--md) {
		height: 40px;
	}

	:global(.time-field--lg) {
		height: 48px;
	}

	:global(.time-field-segment) {
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

	:global(.time-field-literal) {
		color: var(--text-secondary);
	}

	:global([data-disabled]) .time-field-literal {
		color: var(--text-disabled);
	}
</style>
