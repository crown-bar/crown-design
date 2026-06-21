<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Size = 'sm' | 'md' | 'lg';

	interface Props extends ComponentProps<typeof SelectPrimitive.Trigger> {
		size?: Size;
	}

	let { size = 'md', class: className = '', children, ...rest }: Props = $props();
</script>

<SelectPrimitive.Trigger
	class="select-trigger select-trigger--{size}{className ? ' ' + className : ''}"
	{...rest}
>
	{@render children?.()}
	<svg class="select-trigger-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true">
		<path
			d="M4 6L8 10L12 6"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</SelectPrimitive.Trigger>

<style>
	:global(.select-trigger) {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		width: 100%;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-3);
		cursor: pointer;

		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-primary);
		text-align: left;

		transition:
			border-color var(--duration-fast) var(--ease-standard),
			box-shadow var(--duration-fast) var(--ease-standard);

		&:hover:not([data-disabled]) {
			border-color: var(--border-strong);
		}

		&:focus-visible {
			outline: none;
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}

		&[data-placeholder] {
			color: var(--text-secondary);
		}

		&[data-disabled] {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}

	:global(.select-trigger--sm) {
		height: 32px;
	}

	:global(.select-trigger--md) {
		height: 40px;
	}

	:global(.select-trigger--lg) {
		height: 48px;
	}

	:global([data-select-value]) {
		flex: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.select-trigger-icon {
		flex: none;
		width: 14px;
		height: 14px;
		color: var(--text-secondary);
		transition: rotate var(--duration-fast) var(--ease-standard);
	}

	:global(.select-trigger[data-state='open']) .select-trigger-icon {
		rotate: 180deg;
	}
</style>
