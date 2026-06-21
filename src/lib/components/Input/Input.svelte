<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends Omit<HTMLInputAttributes, 'size'> {
		size?: Size;
		invalid?: boolean;
		iconLeft?: Snippet;
		iconRight?: Snippet;
		/** Override border radius. */
		radius?: string;
	}

	let {
		size = 'md',
		invalid = false,
		iconLeft,
		iconRight,
		radius,
		value = $bindable(''),
		class: className = '',
		disabled,
		...rest
	}: Props = $props();
</script>

<div
	class="input input--{size}{invalid ? ' input--invalid' : ''}{className ? ' ' + className : ''}"
	style:--input-radius={radius}
	class:input--disabled={disabled}
>
	{#if iconLeft}
		<span class="input-icon">{@render iconLeft()}</span>
	{/if}
	<input class="input-field" {disabled} aria-invalid={invalid || undefined} bind:value {...rest} />
	{#if iconRight}
		<span class="input-icon">{@render iconRight()}</span>
	{/if}
</div>

<style>
	.input {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		width: 100%;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--input-radius, var(--radius-sm));

		padding: 0 var(--space-3);
		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not(.input--disabled) {
			border-color: var(--border-strong);
		}

		&:has(:focus-visible) {
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}
	}

	.input--sm {
		height: 32px;
	}

	.input--md {
		height: 40px;
	}

	.input--lg {
		height: 48px;
	}

	.input-field {
		flex: 1;
		min-width: 0;
		height: 100%;

		background: transparent;
		border: none;
		outline: none;
		padding: 0;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		&::placeholder {
			color: var(--text-secondary);
		}

		&:disabled {
			cursor: not-allowed;
		}
	}

	.input-icon {
		display: inline-flex;
		flex: none;
		width: 1em;
		height: 1em;
		color: var(--text-secondary);
	}

	.input--invalid {
		border-color: var(--status-danger-fg);

		&:has(:focus-visible) {
			border-color: var(--status-danger-fg);
			box-shadow: 0 0 0 3px var(--status-danger-bg);
		}
	}

	.input--disabled {
		background: var(--surface-sunken);
		border-color: var(--border-subtle);
	}

	.input--disabled .input-field {
		color: var(--text-disabled);
	}

	.input--disabled .input-field::placeholder {
		color: var(--text-disabled);
	}
</style>
