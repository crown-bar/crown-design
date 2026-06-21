<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		tone?: Tone;
		/** Bold first line. */
		title?: string;
		/** Leading icon. */
		icon?: Snippet;
		/** Action node rendered under the body (e.g. a Button). */
		action?: Snippet;
		/** When provided, renders a dismiss control. */
		onclose?: () => void;
	}

	let {
		tone = 'neutral',
		title,
		icon,
		action,
		onclose,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<div role="alert" class="alert alert--{tone}{className ? ' ' + className : ''}" {...rest}>
	{#if icon}
		<span class="alert-icon">{@render icon()}</span>
	{/if}
	<div class="alert-body">
		{#if title}
			<div class="alert-title">{title}</div>
		{/if}
		{#if children}
			<div class="alert-text">{@render children()}</div>
		{/if}
		{#if action}
			<div class="alert-action">{@render action()}</div>
		{/if}
	</div>
	{#if onclose}
		<button type="button" class="alert-close" aria-label="Dismiss" onclick={onclose}>
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
	.alert {
		position: relative;
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		padding: 14px var(--space-4) 14px calc(var(--space-4) + 4px);

		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-md);
	}

	.alert::before {
		content: '';
		position: absolute;
		top: 10px;
		bottom: 10px;
		left: var(--space-2);
		width: 3px;
		background: var(--_alert-accent);
		border-radius: var(--radius-pill);
	}

	.alert--neutral {
		--_alert-accent: var(--neutral-500);
		background: var(--neutral-100);
	}
	.alert--success {
		--_alert-accent: var(--status-success-fg);
		background: var(--status-success-bg);
	}
	.alert--warning {
		--_alert-accent: var(--status-warning-fg);
		background: var(--status-warning-bg);
	}
	.alert--danger {
		--_alert-accent: var(--status-danger-fg);
		background: var(--status-danger-bg);
	}
	.alert--info {
		--_alert-accent: var(--status-info-fg);
		background: var(--status-info-bg);
	}

	:global([data-theme='dark'] .alert) {
		background: color-mix(in srgb, var(--_alert-accent) 16%, var(--surface-sunken));
	}

	.alert-icon {
		display: inline-flex;
		flex: none;
		width: 18px;
		height: 18px;
		margin-top: 1px;
		color: var(--_alert-accent);
	}

	.alert-icon :global(svg) {
		width: 100%;
		height: 100%;
		display: block;
	}

	.alert-body {
		flex: 1;
		min-width: 0;
	}

	.alert-title {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		font-weight: var(--weight-semibold);
		color: var(--text-primary);
	}

	.alert-title + .alert-text {
		margin-top: 3px;
	}

	.alert-text {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	.alert-action {
		margin-top: var(--space-2);
	}

	.alert-close {
		display: inline-flex;
		flex: none;
		margin-top: 1px;
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
