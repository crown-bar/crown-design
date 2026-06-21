<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface Props extends HTMLTextareaAttributes {
		invalid?: boolean;
		/** Override border radius. */
		radius?: string;
	}

	let {
		invalid = false,
		radius,
		value = $bindable(''),
		class: className = '',
		rows = 4,
		...rest
	}: Props = $props();
</script>

<textarea
	class="textarea{invalid ? ' textarea--invalid' : ''}{className ? ' ' + className : ''}"
	style:--input-radius={radius}
	aria-invalid={invalid || undefined}
	{rows}
	bind:value
	{...rest}
></textarea>

<style>
	.textarea {
		display: block;
		width: 100%;
		resize: vertical;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--input-radius, var(--radius-sm));

		padding: var(--space-2) var(--space-3);

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-primary);

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&::placeholder {
			color: var(--text-secondary);
		}

		&:hover:not(:disabled) {
			border-color: var(--border-strong);
		}

		&:focus-visible {
			outline: none;
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}

		&:disabled {
			background: var(--surface-sunken);
			border-color: var(--border-subtle);
			color: var(--text-disabled);
			cursor: not-allowed;
		}

		&:disabled::placeholder {
			color: var(--text-disabled);
		}
	}

	.textarea--invalid {
		border-color: var(--status-danger-fg);
	}

	.textarea--invalid:focus-visible {
		border-color: var(--status-danger-fg);
		box-shadow: 0 0 0 3px var(--status-danger-bg);
	}
</style>
