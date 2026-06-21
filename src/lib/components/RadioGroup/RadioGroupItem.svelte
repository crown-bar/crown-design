<script lang="ts">
	import { RadioGroup as RadioGroupPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof RadioGroupPrimitive.Item> {
		/** Override the accent color. */
		color?: string;
	}

	let { color, class: className = '', ...rest }: Props = $props();
</script>

<RadioGroupPrimitive.Item
	class="radio-item{className ? ' ' + className : ''}"
	style={color ? `--radio-accent: ${color}` : undefined}
	{...rest}
/>

<style>
	:global(.radio-item) {
		position: relative;
		display: inline-flex;
		flex: none;
		width: 18px;
		height: 18px;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: 50%;
		cursor: pointer;

		transition: border-color var(--duration-fast) var(--ease-standard);

		&::after {
			content: '';
			position: absolute;
			inset: 0;
			margin: auto;
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: var(--radio-accent, var(--action-primary));
			scale: 0;
			transition: scale var(--duration-fast) var(--ease-emphasis);
		}

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

		&[data-state='checked'] {
			border-color: var(--radio-accent, var(--action-primary));
		}
	}

	:global(.radio-item[data-state='checked'])::after {
		scale: 1;
	}
</style>
