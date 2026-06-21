<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'text' | 'circular' | 'rectangular';
	type Animation = 'pulse' | 'wave' | 'none';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		variant?: Variant;
		width?: string | number;
		height?: string | number;
		animation?: Animation;
		/** Override border radius. */
		radius?: string;
	}

	let {
		variant = 'text',
		width,
		height,
		animation = 'pulse',
		radius,
		class: className = '',
		...rest
	}: Props = $props();

	function toCssSize(value: string | number | undefined) {
		return typeof value === 'number' ? `${value}px` : value;
	}

	// Circular skeletons mirror whichever of width/height is missing so a single
	// dimension still yields a circle instead of an oval.
	const resolvedWidth = $derived(variant === 'circular' ? width ?? height : width);
	const resolvedHeight = $derived(variant === 'circular' ? height ?? width : height);
</script>

<div
	class="skeleton skeleton--{variant} skeleton--{animation}{className ? ' ' + className : ''}"
	style:width={toCssSize(resolvedWidth)}
	style:height={toCssSize(resolvedHeight)}
	style:--skeleton-radius={radius}
	aria-hidden="true"
	{...rest}
></div>

<style>
	.skeleton {
		display: block;
		flex: none;
		background: var(--surface-hover);
	}

	.skeleton--text {
		width: 100%;
		height: 1em;
		border-radius: var(--skeleton-radius, var(--radius-xs));
	}

	.skeleton--circular {
		width: 40px;
		height: 40px;
		border-radius: var(--skeleton-radius, 50%);
	}

	.skeleton--rectangular {
		width: 100%;
		height: 120px;
		border-radius: var(--skeleton-radius, var(--radius-md));
	}

	.skeleton--pulse {
		animation: skeleton-pulse 1.6s ease-in-out infinite;
	}

	.skeleton--wave {
		position: relative;
		overflow: hidden;
	}

	.skeleton--wave::after {
		content: '';
		position: absolute;
		inset: 0;
		transform: translateX(-100%);
		background: linear-gradient(90deg, transparent, var(--surface-active), transparent);
		animation: skeleton-wave 1.6s linear infinite;
	}

	@keyframes skeleton-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes skeleton-wave {
		100% {
			transform: translateX(100%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skeleton--pulse,
		.skeleton--wave::after {
			animation: none;
		}
	}
</style>
