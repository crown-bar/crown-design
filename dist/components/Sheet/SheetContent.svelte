<script lang="ts">
	import { Dialog as SheetPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	type Side = 'left' | 'right' | 'top' | 'bottom';

	interface Props extends ComponentProps<typeof SheetPrimitive.Content> {
		/** Edge the sheet slides in from. */
		side?: Side;
		eyebrow?: string;
		title?: string;
		/** Footer actions — typically Buttons. */
		footer?: Snippet;
		/** Sheet width (left/right) or height (top/bottom), in px (or any CSS size value). */
		size?: number | string;
		/** Renders a built-in dismiss icon in the corner. */
		showClose?: boolean;
	}

	let {
		side = 'right',
		eyebrow,
		title,
		footer,
		size = 400,
		showClose = true,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const sizeValue = $derived(typeof size === 'number' ? `${size}px` : size);
</script>

<SheetPrimitive.Portal>
	<SheetPrimitive.Overlay class="sheet-overlay" />
	<SheetPrimitive.Content
		class="sheet-content sheet-content--{side}{className ? ' ' + className : ''}"
		style="--sheet-size: {sizeValue};"
		{...rest}
	>
		{#if showClose}
			<SheetPrimitive.Close class="sheet-close" aria-label="Close">
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
			</SheetPrimitive.Close>
		{/if}
		{#if eyebrow || title}
			<div class="sheet-header">
				{#if eyebrow}
					<p class="crown-eyebrow">{eyebrow}</p>
				{/if}
				{#if title}
					<SheetPrimitive.Title class="sheet-title">{title}</SheetPrimitive.Title>
				{/if}
			</div>
		{/if}
		{#if children}
			<div class="sheet-body">{@render children()}</div>
		{/if}
		{#if footer}
			<div class="sheet-footer">{@render footer()}</div>
		{/if}
	</SheetPrimitive.Content>
</SheetPrimitive.Portal>

<style>
	:global(.sheet-overlay) {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);

		background: color-mix(in srgb, var(--neutral-950) 45%, transparent);
		backdrop-filter: blur(2px);

		opacity: 1;
		transition: opacity var(--duration-fast) var(--ease-out);
	}

	:global(.sheet-overlay[data-starting-style]),
	:global(.sheet-overlay[data-ending-style]) {
		opacity: 0;
	}

	:global(.sheet-content) {
		position: fixed;
		z-index: var(--z-modal);
		display: flex;
		flex-direction: column;

		background: var(--surface-card);
		box-shadow: var(--shadow-xl);

		transition: translate var(--duration-normal) var(--ease-standard);

		&:focus-visible {
			outline: none;
		}
	}

	:global(.sheet-content--right) {
		top: 0;
		right: 0;
		bottom: 0;
		width: var(--sheet-size, 400px);
		max-width: calc(100vw - 48px);
		border-left: var(--border-hairline) solid var(--border-subtle);
		translate: 0 0;
	}

	:global(.sheet-content--right[data-starting-style]),
	:global(.sheet-content--right[data-ending-style]) {
		translate: 100% 0;
	}

	:global(.sheet-content--left) {
		top: 0;
		left: 0;
		bottom: 0;
		width: var(--sheet-size, 400px);
		max-width: calc(100vw - 48px);
		border-right: var(--border-hairline) solid var(--border-subtle);
		translate: 0 0;
	}

	:global(.sheet-content--left[data-starting-style]),
	:global(.sheet-content--left[data-ending-style]) {
		translate: -100% 0;
	}

	:global(.sheet-content--top) {
		top: 0;
		left: 0;
		right: 0;
		height: var(--sheet-size, 400px);
		max-height: calc(100vh - 48px);
		border-bottom: var(--border-hairline) solid var(--border-subtle);
		translate: 0 0;
	}

	:global(.sheet-content--top[data-starting-style]),
	:global(.sheet-content--top[data-ending-style]) {
		translate: 0 -100%;
	}

	:global(.sheet-content--bottom) {
		bottom: 0;
		left: 0;
		right: 0;
		height: var(--sheet-size, 400px);
		max-height: calc(100vh - 48px);
		border-top: var(--border-hairline) solid var(--border-subtle);
		translate: 0 0;
	}

	:global(.sheet-content--bottom[data-starting-style]),
	:global(.sheet-content--bottom[data-ending-style]) {
		translate: 0 100%;
	}

	:global(.sheet-close) {
		position: absolute;
		top: var(--space-4);
		right: var(--space-4);
		display: inline-flex;
		flex: none;
		padding: 4px;

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

	.sheet-header {
		flex: none;
		padding: 22px var(--space-10) 0 var(--space-6);
	}

	:global(.sheet-title) {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		font-size: var(--size-display-sm);
		line-height: 1.1;
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.crown-eyebrow + :global(.sheet-title) {
		margin-top: 6px;
	}

	.sheet-body {
		flex: 1;
		min-height: 0;
		overflow-y: auto;
		padding: 14px var(--space-6) 22px;
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	.sheet-footer {
		flex: none;
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: var(--space-4) var(--space-6);
		border-top: var(--border-hairline) solid var(--border-subtle);
	}
</style>
