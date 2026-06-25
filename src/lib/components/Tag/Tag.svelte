<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
	type Variant = 'soft' | 'outline' | 'solid';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		tone?: Tone;
		variant?: Variant;
		dot?: boolean;
		/** Renders a remove button when provided. */
		onremove?: () => void;
	}

	let {
		tone = 'neutral',
		variant = 'soft',
		dot = false,
		onremove,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const isSolid = $derived(variant === 'solid' || tone === 'solid');

	function handleRemove(e: MouseEvent) {
		e.stopPropagation();
		onremove?.();
	}
</script>

<span class="tag tag--{tone} tag--{variant}{isSolid ? ' tag--is-solid' : ''}{className ? ' ' + className : ''}" {...rest}>
	{#if dot}
		<span class="tag-dot"></span>
	{/if}
	{@render children?.()}
	{#if onremove}
		<button type="button" class="tag-remove" aria-label="Remove" onclick={handleRemove}>
			<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"
				><path d="M18 6 6 18M6 6l12 12" /></svg
			>
		</button>
	{/if}
</span>

<style>
	.tag {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		height: 22px;
		padding: 0 9px;

		font-family: var(--font-sans);
		font-size: var(--size-2xs);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.02em;
		line-height: 1;
		white-space: nowrap;

		border-radius: var(--radius-pill);
		border: var(--border-hairline) solid transparent;
	}

	/* Tone: neutral */
	.tag--neutral {
		color: var(--neutral-700);
		background: var(--neutral-100);
	}
	.tag--neutral.tag--outline {
		color: var(--neutral-700);
		background: transparent;
		border-color: var(--neutral-700);
	}

	/* Tone: success */
	.tag--success {
		color: var(--status-success-fg);
		background: var(--status-success-bg);
	}
	.tag--success.tag--outline {
		color: var(--status-success-fg);
		background: transparent;
		border-color: var(--status-success-fg);
	}

	/* Tone: warning */
	.tag--warning {
		color: var(--status-warning-fg);
		background: var(--status-warning-bg);
	}
	.tag--warning.tag--outline {
		color: var(--status-warning-fg);
		background: transparent;
		border-color: var(--status-warning-fg);
	}

	/* Tone: danger */
	.tag--danger {
		color: var(--status-danger-fg);
		background: var(--status-danger-bg);
	}
	.tag--danger.tag--outline {
		color: var(--status-danger-fg);
		background: transparent;
		border-color: var(--status-danger-fg);
	}

	/* Tone: info */
	.tag--info {
		color: var(--status-info-fg);
		background: var(--status-info-bg);
	}
	.tag--info.tag--outline {
		color: var(--status-info-fg);
		background: transparent;
		border-color: var(--status-info-fg);
	}

	/* Soft tones in dark mode: darken the bg and switch to white text
	   instead of the light pastel fill, which washes out on dark surfaces. */
	:global([data-theme='dark'] .tag--success.tag--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-success-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .tag--warning.tag--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-warning-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .tag--danger.tag--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-danger-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .tag--info.tag--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-info-fg) 35%, var(--surface-sunken));
	}

	/* Tone/variant: solid (always brand black) */
	.tag--is-solid,
	.tag--solid {
		color: var(--text-on-accent);
		background: var(--action-primary);
		border-color: transparent;
	}

	/* Dot indicator */
	.tag-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		flex: none;
	}

	.tag-remove {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 14px;
		height: 14px;
		margin-left: 2px;
		margin-right: -2px;
		padding: 0;

		background: transparent;
		border: none;
		border-radius: 50%;
		color: currentColor;
		cursor: pointer;

		transition: background var(--duration-fast) var(--ease-standard);

		&:hover {
			background: color-mix(in srgb, currentColor 18%, transparent);
		}

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}
	}
</style>
