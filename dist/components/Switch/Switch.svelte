<script lang="ts">
	import { Switch as SwitchPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	interface Props extends ComponentProps<typeof SwitchPrimitive.Root> {
		/** Override the accent color. */
		color?: string;
	}

	let { checked = $bindable(false), color, class: className = '', ...rest }: Props = $props();
</script>

<SwitchPrimitive.Root
	bind:checked
	class="switch{className ? ' ' + className : ''}"
	style={color ? `--switch-accent: ${color}` : undefined}
	{...rest}
>
	<SwitchPrimitive.Thumb class="switch-thumb" />
</SwitchPrimitive.Root>

<style>
	:global(.switch) {
		display: inline-flex;
		align-items: center;
		flex: none;
		width: 40px;
		height: 22px;
		padding: 3px;

		background: var(--border-default);
		border: none;
		border-radius: var(--radius-pill);
		cursor: pointer;

		transition: background-color var(--duration-fast) var(--ease-standard);

		&:hover:not(:disabled) {
			background: var(--border-strong);
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
			background: var(--switch-accent, var(--action-primary));
		}
	}

	:global(.switch[data-state='checked']:hover:not(:disabled)) {
		background: color-mix(in srgb, var(--switch-accent, var(--action-primary)) 85%, var(--crown-black));
	}

	:global(.switch-thumb) {
		width: 16px;
		height: 16px;
		flex: none;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: 50%;
		box-shadow: var(--shadow-xs);

		translate: 0 0;
		transition: translate var(--duration-normal) var(--ease-standard);

		&[data-state='checked'] {
			translate: 18px 0;
		}
	}
</style>
