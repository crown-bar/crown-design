<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import type { ComponentProps, Snippet } from 'svelte';

	interface Props extends ComponentProps<typeof DialogPrimitive.Content> {
		eyebrow?: string;
		title?: string;
		/** Footer actions — typically Buttons. */
		footer?: Snippet;
		/** Dialog width in px (or any CSS width value). */
		width?: number | string;
	}

	let {
		eyebrow,
		title,
		footer,
		width = 480,
		class: className = '',
		children,
		...rest
	}: Props = $props();

	const widthValue = $derived(typeof width === 'number' ? `${width}px` : width);
</script>

<DialogPrimitive.Portal>
	<DialogPrimitive.Overlay class="dialog-overlay" />
	<DialogPrimitive.Content
		class="dialog-content{className ? ' ' + className : ''}"
		style="--dialog-width: {widthValue};"
		{...rest}
	>
		{#if eyebrow || title}
			<div class="dialog-header">
				{#if eyebrow}
					<p class="crown-eyebrow">{eyebrow}</p>
				{/if}
				{#if title}
					<DialogPrimitive.Title class="dialog-title">{title}</DialogPrimitive.Title>
				{/if}
			</div>
		{/if}
		{#if children}
			<div class="dialog-body">{@render children()}</div>
		{/if}
		{#if footer}
			<div class="dialog-footer">{@render footer()}</div>
		{/if}
	</DialogPrimitive.Content>
</DialogPrimitive.Portal>

<style>
	:global(.dialog-overlay) {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);

		background: color-mix(in srgb, var(--neutral-950) 45%, transparent);
		backdrop-filter: blur(2px);

		opacity: 1;
		transition: opacity var(--duration-fast) var(--ease-out);
	}

	:global(.dialog-overlay[data-starting-style]),
	:global(.dialog-overlay[data-ending-style]) {
		opacity: 0;
	}

	:global(.dialog-content) {
		position: fixed;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		z-index: var(--z-modal);

		width: var(--dialog-width, 480px);
		max-width: calc(100vw - 48px);
		max-height: calc(100vh - 48px);
		overflow-y: auto;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-xl);

		opacity: 1;
		scale: 1;
		transition:
			opacity var(--duration-fast) var(--ease-out),
			scale var(--duration-fast) var(--ease-out);

		&:focus-visible {
			outline: none;
		}
	}

	:global(.dialog-content[data-starting-style]),
	:global(.dialog-content[data-ending-style]) {
		opacity: 0;
		scale: 0.96;
		translate: -50% -50%;
	}

	.dialog-header {
		padding: 22px var(--space-6) 0;
	}

	:global(.dialog-title) {
		margin: 0;
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		font-size: var(--size-display-sm);
		line-height: 1.1;
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.crown-eyebrow + :global(.dialog-title) {
		margin-top: 6px;
	}

	.dialog-body {
		padding: 14px var(--space-6) 22px;
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	.dialog-footer {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
		padding: var(--space-4) var(--space-6);
		border-top: var(--border-hairline) solid var(--border-subtle);
	}
</style>
