<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		/** Diameter in px. */
		size?: number;
		/** Ring stroke width in px. */
		thickness?: number;
		/** Optional text shown beside the ring. */
		label?: string;
		/** Active arc color. Defaults to the ambient text color. */
		color?: string;
	}

	let { size = 18, thickness = 2, label, color, class: className = '', ...rest }: Props =
		$props();
</script>

<span
	role="status"
	aria-label={label ? undefined : 'Loading'}
	class="spinner{className ? ' ' + className : ''}"
	style:color
	{...rest}
>
	<span
		class="spinner-ring"
		aria-hidden="true"
		style:width="{size}px"
		style:height="{size}px"
		style:border-width="{thickness}px"
	></span>
	{#if label}
		<span class="spinner-label">{label}</span>
	{/if}
</span>

<style>
	.spinner {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
	}

	.spinner-ring {
		display: inline-block;
		flex: none;
		border-radius: 50%;
		border-style: solid;
		border-color: var(--border-default);
		border-top-color: currentColor;
		animation: spinner-spin 0.7s linear infinite;
	}

	.spinner-label {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-secondary);
	}

	@keyframes spinner-spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
