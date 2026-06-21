<script lang="ts">
	import { Label as LabelPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Size = 'sm' | 'md';

	interface Props extends ComponentProps<typeof LabelPrimitive.Root> {
		size?: Size;
		required?: boolean;
		disabled?: boolean;
	}

	let {
		size = 'sm',
		required = false,
		disabled = false,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<LabelPrimitive.Root
	class="label label--{size}{disabled ? ' label--disabled' : ''}{className ? ' ' + className : ''}"
	{...rest}
>
	{@render children?.()}
	{#if required}
		<span class="label-required" aria-hidden="true">*</span>
	{/if}
</LabelPrimitive.Root>

<style>
	:global(.label) {
		display: inline-flex;
		align-items: center;
		gap: 4px;

		font-family: var(--font-sans);
		font-weight: var(--weight-medium);
		color: var(--text-primary);
		line-height: var(--leading-snug);
		cursor: default;
	}

	:global(.label--sm) {
		font-size: var(--size-sm);
	}

	:global(.label--md) {
		font-size: var(--size-md);
	}

	:global(.label--disabled) {
		color: var(--text-disabled);
	}

	.label-required {
		color: var(--status-danger-fg);
	}
</style>
