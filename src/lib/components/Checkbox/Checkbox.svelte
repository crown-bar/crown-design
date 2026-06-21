<script lang="ts">
	import { Checkbox as CheckboxPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof CheckboxPrimitive.Root> {
		/** Override the accent color. */
		color?: string;
	}

	let {
		checked = $bindable(false),
		indeterminate = $bindable(false),
		color,
		class: className = '',
		...rest
	}: Props = $props();
</script>

<CheckboxPrimitive.Root
	bind:checked
	bind:indeterminate
	class="checkbox{className ? ' ' + className : ''}"
	style={color ? `--checkbox-accent: ${color}` : undefined}
	{...rest}
>
	{#snippet children({ checked, indeterminate })}
		{#if indeterminate}
			<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<rect x="3.5" y="7" width="9" height="2" rx="1" fill="currentColor" />
			</svg>
		{:else if checked}
			<svg class="checkbox-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
				<path
					d="M3.5 8.5L6.5 11.5L12.5 4.5"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		{/if}
	{/snippet}
</CheckboxPrimitive.Root>

<style>
	:global(.checkbox) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 18px;
		height: 18px;
		padding: 2px;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-xs);
		color: var(--text-on-accent);
		cursor: pointer;

		transition:
			background-color var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard);

		&:hover:not(:disabled) {
			border-color: var(--border-strong);
		}

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}

		&:disabled {
			opacity: 0.45;
			cursor: not-allowed;
		}

		&[data-state='checked'],
		&[data-state='indeterminate'] {
			background: var(--checkbox-accent, var(--action-primary));
			border-color: var(--checkbox-accent, var(--action-primary));
		}
	}

	.checkbox-icon {
		width: 14px;
		height: 14px;
	}
</style>
