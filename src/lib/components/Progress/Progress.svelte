<script lang="ts">
	import { Progress as ProgressPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Tone = 'primary' | 'success' | 'warning' | 'danger' | 'info';
	type Size = 'sm' | 'md' | 'lg';

	interface Props extends ComponentProps<typeof ProgressPrimitive.Root> {
		tone?: Tone;
		size?: Size;
		/** Optional label shown above the track. */
		label?: string;
		/** Show the percentage on the right of the label row. */
		showValue?: boolean;
	}

	let {
		value = 0,
		max = 100,
		tone = 'primary',
		size = 'md',
		label,
		showValue = false,
		class: className = '',
		...rest
	}: Props = $props();

	const pct = $derived(Math.max(0, Math.min(100, ((value ?? 0) / max) * 100)));
</script>

<div class="progress{className ? ' ' + className : ''}">
	{#if label || showValue}
		<div class="progress-row">
			{#if label}
				<span class="progress-label">{label}</span>
			{:else}
				<span></span>
			{/if}
			{#if showValue}
				<span class="progress-value">{Math.round(pct)}%</span>
			{/if}
		</div>
	{/if}
	<ProgressPrimitive.Root
		{value}
		{max}
		class="progress-track progress-track--{size} progress-track--{tone}"
		{...rest}
	>
		<div class="progress-fill" style:width="{pct}%"></div>
	</ProgressPrimitive.Root>
</div>

<style>
	.progress {
		width: 100%;
	}

	.progress-row {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	.progress-label {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		font-weight: var(--weight-medium);
		color: var(--text-primary);
	}

	.progress-value {
		font-family: var(--font-sans);
		font-size: var(--size-xs);
		font-variant-numeric: tabular-nums;
		color: var(--text-secondary);
	}

	.progress-fill {
		height: 100%;
		background: var(--_progress-fill);
		border-radius: var(--radius-pill);
		transition: width var(--duration-slow) var(--ease-standard);
	}

	:global(.progress-track) {
		display: block;
		width: 100%;
		overflow: hidden;
		background: var(--surface-active);
		border-radius: var(--radius-pill);
	}

	:global(.progress-track--sm) {
		height: 4px;
	}
	:global(.progress-track--md) {
		height: 8px;
	}
	:global(.progress-track--lg) {
		height: 12px;
	}

	:global(.progress-track--primary) {
		--_progress-fill: var(--action-primary);
	}
	:global(.progress-track--success) {
		--_progress-fill: var(--status-success-fg);
	}
	:global(.progress-track--warning) {
		--_progress-fill: var(--status-warning-fg);
	}
	:global(.progress-track--danger) {
		--_progress-fill: var(--status-danger-fg);
	}
	:global(.progress-track--info) {
		--_progress-fill: var(--status-info-fg);
	}
</style>
