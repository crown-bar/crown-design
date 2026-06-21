<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends HTMLButtonAttributes {
		variant?: Variant;
		size?: Size;
		fullWidth?: boolean;
		iconLeft?: Snippet;
		iconRight?: Snippet;
		/** Override the accent color. On primary/danger: changes fill. On ghost: changes text. */
		color?: string;
		/** Override border radius. */
		radius?: string;
	}

	let {
		variant = 'primary',
		size = 'md',
		fullWidth = false,
		iconLeft,
		iconRight,
		color,
		radius,
		class: className = '',
		children,
		...rest
	}: Props = $props();
</script>

<button
	class="btn btn--{variant} btn--{size}{fullWidth ? ' btn--full' : ''}{className
		? ' ' + className
		: ''}"
	style:--btn-accent={color}
	style:--btn-radius={radius}
	{...rest}
>
	{#if iconLeft}
		<span class="btn-icon">{@render iconLeft()}</span>
	{/if}
	{@render children?.()}
	{#if iconRight}
		<span class="btn-icon">{@render iconRight()}</span>
	{/if}
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--_gap);

		font-family: var(--font-sans);
		font-weight: var(--weight-medium);
		font-size: var(--_font-size);
		line-height: 1;
		letter-spacing: 0.01em;
		white-space: nowrap;

		border-radius: var(--btn-radius, var(--radius-sm));
		cursor: pointer;
		user-select: none;

		/* Exit: slow & smooth */
		transition:
			background-position var(--duration-slow) var(--ease-out),
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-normal) var(--ease-out),
			transform var(--duration-normal) var(--ease-out);

		&:hover:not(:disabled) {
			/* Enter: fast & snappy */
			transition:
				background-position var(--duration-normal) var(--ease-emphasis),
				border-color var(--duration-fast) var(--ease-standard),
				box-shadow var(--duration-fast) var(--ease-emphasis);
		}

		&:active:not(:disabled) {
			transform: scale(0.97);
			transition-duration: 80ms;
		}

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}

		&:disabled {
			opacity: 0.45;
			cursor: not-allowed;
			pointer-events: none;
		}
	}

	/* Sizes */
	.btn--sm {
		--_gap: 6px;
		--_font-size: var(--size-sm);
		height: 32px;
		padding: 0 var(--space-3);
	}

	.btn--md {
		--_gap: 8px;
		--_font-size: var(--size-sm);
		height: 40px;
		padding: 0 18px;
	}

	.btn--lg {
		--_gap: 8px;
		--_font-size: var(--size-md);
		height: 48px;
		padding: 0 var(--space-6);
	}

	/* Variants — gradient slide technique:
	   left half = hover color, right half = rest color.
	   background-size: 200% so only one half is visible at a time.
	   Animating background-position slides the hover color in from the left. */

	.btn--primary {
		background-image: linear-gradient(
			to right,
			color-mix(in srgb, var(--btn-accent, var(--action-primary)) 82%, var(--crown-black)) 33%,
	var(--btn-accent, var(--action-primary)) 67%
		);
		background-size: 300%;
		background-position: right;
		color: var(--text-on-accent);
		border: var(--border-hairline) solid var(--btn-accent, var(--action-primary));

		&:hover:not(:disabled) {
			background-position: left;
			border-color: color-mix(in srgb, var(--btn-accent, var(--action-primary)) 82%, var(--crown-black));
			box-shadow: var(--shadow-sm);
		}

		&:active:not(:disabled) {
			background: var(--action-primary-active);
			border-color: var(--action-primary-active);
			box-shadow: none;
		}
	}

	.btn--secondary {
		background-image: linear-gradient(
			to right,
			var(--surface-active) 33%,
	var(--surface-card) 67%
		);
		background-size: 300%;
		background-position: right;
		color: var(--text-primary);
		border: var(--border-hairline) solid var(--border-default);

		&:hover:not(:disabled) {
			background-position: left;
			border-color: var(--border-strong);
		}

		&:active:not(:disabled) {
			background: var(--surface-active);
		}
	}

	.btn--ghost {
		background: transparent;
		color: var(--btn-accent, var(--text-primary));
		border: var(--border-hairline) solid transparent;

		&:hover:not(:disabled) {
			border-color: var(--border-default);
		}

		&:active:not(:disabled) {
			background: var(--surface-active);
			border-color: var(--border-default);
		}
	}

	.btn--danger {
		background-image: linear-gradient(
			to right,
			color-mix(in srgb, var(--btn-accent, var(--status-danger-fg)) 82%, var(--crown-black)) 33%,
	var(--btn-accent, var(--status-danger-fg)) 67%
		);
		background-size: 300%;
		background-position: right;
		color: #fff;
		border: var(--border-hairline) solid var(--btn-accent, var(--status-danger-fg));

		&:hover:not(:disabled) {
			background-position: left;
			border-color: color-mix(in srgb, var(--btn-accent, var(--status-danger-fg)) 82%, var(--crown-black));
		}

		&:active:not(:disabled) {
			background: color-mix(in srgb, var(--btn-accent, var(--status-danger-fg)) 65%, var(--crown-black));
		}
	}

	.btn-icon {
		display: inline-flex;
		width: 1em;
		height: 1em;
	}

	.btn--full {
		width: 100%;
	}
</style>
