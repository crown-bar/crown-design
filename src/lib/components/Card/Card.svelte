<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Variant = 'outline' | 'flat' | 'elevated';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		eyebrow?: string;
		title?: string;
		/** Footer actions — typically Buttons. */
		footer?: Snippet;
	}

	let {
		variant = 'outline',
		eyebrow,
		title,
		footer,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<div class="card card--{variant}{className ? ' ' + className : ''}" {...rest}>
	{#if eyebrow || title}
		<div class="card-header">
			{#if eyebrow}
				<p class="crown-eyebrow">{eyebrow}</p>
			{/if}
			{#if title}
				<h3 class="card-title">{title}</h3>
			{/if}
		</div>
	{/if}
	{#if children}
		<div class="card-body">{@render children()}</div>
	{/if}
	{#if footer}
		<div class="card-footer">{@render footer()}</div>
	{/if}
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background: color-mix(in srgb, var(--surface-card) 90%, transparent);
		backdrop-filter: blur(12px);
		border-radius: var(--radius-md);
	}

	.card--outline {
		border: var(--border-hairline) solid var(--border-subtle);
	}

	.card--flat {
		background: color-mix(in srgb, var(--surface-sunken) 90%, transparent);
	}

	.card--elevated {
		border: var(--border-hairline) solid var(--border-subtle);
		box-shadow: var(--shadow-md);
	}

	.card-header {
		padding: var(--space-5) var(--space-5) 0;
	}

	.card-title {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		font-size: var(--size-md);
		color: var(--text-primary);
	}

	.crown-eyebrow + .card-title {
		margin-top: 6px;
	}

	.card-body {
		padding: var(--space-5);
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	.card-header + .card-body {
		padding-top: var(--space-3);
	}

	.card-footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: var(--space-4) var(--space-5);
		border-top: var(--border-hairline) solid var(--border-subtle);
	}
</style>
