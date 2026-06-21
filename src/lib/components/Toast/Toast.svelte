<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		tone?: Tone;
		title?: string;
		description?: string;
		/** Leading icon. */
		icon?: Snippet;
		/** When provided, renders a dismiss control. */
		onclose?: () => void;
	}

	let {
		tone = 'neutral',
		title,
		description,
		icon,
		onclose,
		class: className = '',
		...rest
	}: Props = $props();
</script>

<div
	role="status"
	class="toast toast--{tone}{icon ? '' : ' toast--bar'}{className ? ' ' + className : ''}"
	{...rest}
>
	{#if icon}
		<span class="toast-icon">{@render icon()}</span>
	{/if}
	<div class="toast-body">
		{#if title}
			<div class="toast-title">{title}</div>
		{/if}
		{#if description}
			<div class="toast-description">{description}</div>
		{/if}
	</div>
	{#if onclose}
		<button type="button" class="toast-close" aria-label="Dismiss" onclick={onclose}>
			<svg
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg
			>
		</button>
	{/if}
</div>

<style>
	.toast {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		width: 360px;
		max-width: 100%;
		padding: 13px 14px 13px 18px;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-md);
		box-shadow: var(--shadow-lg);
	}

	.toast--bar::before {
		content: '';
		position: absolute;
		top: 10px;
		bottom: 10px;
		left: var(--space-2);
		width: 3px;
		background: var(--_toast-accent);
		border-radius: var(--radius-pill);
	}

	.toast--neutral {
		--_toast-accent: var(--neutral-700);
	}
	.toast--success {
		--_toast-accent: var(--status-success-fg);
	}
	.toast--warning {
		--_toast-accent: var(--status-warning-fg);
	}
	.toast--danger {
		--_toast-accent: var(--status-danger-fg);
	}
	.toast--info {
		--_toast-accent: var(--status-info-fg);
	}

	.toast-icon {
		display: inline-flex;
		flex: none;
		width: 18px;
		height: 18px;
		margin-top: 1px;
		color: var(--_toast-accent);
	}

	.toast-icon :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.toast-body {
		flex: 1;
		min-width: 0;
	}

	.toast-title {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
	}

	.toast-description {
		margin-top: 2px;
		font-family: var(--font-sans);
		font-size: var(--size-xs);
		line-height: 1.45;
		color: var(--text-secondary);
	}

	.toast-close {
		display: inline-flex;
		flex: none;
		padding: 2px;

		background: transparent;
		border: none;
		color: var(--text-secondary);
		cursor: pointer;

		transition: color var(--duration-fast) var(--ease-standard);

		&:hover {
			color: var(--text-primary);
		}

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}
	}
</style>
