<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Tone = 'neutral' | 'success' | 'warning' | 'danger' | 'info' | 'solid';
	type Variant = 'soft' | 'outline' | 'solid';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		tone?: Tone;
		variant?: Variant;
		dot?: boolean;
	}

	let { tone = 'neutral', variant = 'soft', dot = false, class: className = '', children, ...rest }: Props =
		$props();

	const isSolid = $derived(variant === 'solid' || tone === 'solid');
</script>

<span class="badge badge--{tone} badge--{variant}{isSolid ? ' badge--is-solid' : ''}{className ? ' ' + className : ''}" {...rest}>
	{#if dot}
		<span class="badge-dot"></span>
	{/if}
	{@render children?.()}
</span>

<style>
	.badge {
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
	.badge--neutral {
		color: var(--neutral-700);
		background: var(--neutral-100);
	}
	.badge--neutral.badge--outline {
		color: var(--neutral-700);
		background: transparent;
		border-color: var(--neutral-700);
	}

	/* Tone: success */
	.badge--success {
		color: var(--status-success-fg);
		background: var(--status-success-bg);
	}
	.badge--success.badge--outline {
		color: var(--status-success-fg);
		background: transparent;
		border-color: var(--status-success-fg);
	}

	/* Tone: warning */
	.badge--warning {
		color: var(--status-warning-fg);
		background: var(--status-warning-bg);
	}
	.badge--warning.badge--outline {
		color: var(--status-warning-fg);
		background: transparent;
		border-color: var(--status-warning-fg);
	}

	/* Tone: danger */
	.badge--danger {
		color: var(--status-danger-fg);
		background: var(--status-danger-bg);
	}
	.badge--danger.badge--outline {
		color: var(--status-danger-fg);
		background: transparent;
		border-color: var(--status-danger-fg);
	}

	/* Tone: info */
	.badge--info {
		color: var(--status-info-fg);
		background: var(--status-info-bg);
	}
	.badge--info.badge--outline {
		color: var(--status-info-fg);
		background: transparent;
		border-color: var(--status-info-fg);
	}

	/* Soft tones in dark mode: darken the bg and switch to white text
	   instead of the light pastel fill, which washes out on dark surfaces. */
	:global([data-theme='dark'] .badge--success.badge--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-success-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .badge--warning.badge--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-warning-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .badge--danger.badge--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-danger-fg) 35%, var(--surface-sunken));
	}
	:global([data-theme='dark'] .badge--info.badge--soft) {
		color: var(--crown-white);
		background: color-mix(in srgb, var(--status-info-fg) 35%, var(--surface-sunken));
	}

	/* Tone/variant: solid (always brand black) */
	.badge--is-solid,
	.badge--solid {
		color: var(--text-on-accent);
		background: var(--action-primary);
		border-color: transparent;
	}

	/* Dot indicator */
	.badge-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		flex: none;
	}
</style>
