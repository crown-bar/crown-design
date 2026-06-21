<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof SelectPrimitive.Item>;

	let { class: className = '', children: itemLabel, ...rest }: Props = $props();
</script>

<SelectPrimitive.Item class="select-item{className ? ' ' + className : ''}" {...rest}>
	{#snippet children({ selected, highlighted })}
		<span class="select-item-label">
			{@render itemLabel?.({ selected, highlighted })}
		</span>
		{#if selected}
			<svg class="select-item-check" viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
</SelectPrimitive.Item>

<style>
	:global(.select-item) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);

		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-xs);
		cursor: pointer;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);

		&[data-highlighted] {
			background: var(--surface-hover);
		}

		&[data-selected] {
			font-weight: var(--weight-medium);
		}

		&[data-disabled] {
			color: var(--text-disabled);
			cursor: not-allowed;
		}
	}

	.select-item-label {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select-item-check {
		flex: none;
		width: 12px;
		height: 12px;
		color: var(--text-primary);
	}
</style>
