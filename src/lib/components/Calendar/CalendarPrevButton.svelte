<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof CalendarPrimitive.PrevButton>;

	let { class: className = '', ...rest }: Props = $props();
</script>

<CalendarPrimitive.PrevButton
	class="calendar-nav-btn{className ? ' ' + className : ''}"
	{...rest}
>
	<svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
		<path
			d="M10 3L5 8L10 13"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</CalendarPrimitive.PrevButton>

<style>
	:global(.calendar-nav-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex: none;
		width: 28px;
		height: 28px;

		background: transparent;
		border: var(--border-hairline) solid transparent;
		border-radius: var(--radius-sm);
		color: var(--text-secondary);
		cursor: pointer;

		transition:
			background var(--duration-fast) var(--ease-standard),
			border-color var(--duration-fast) var(--ease-standard);

		& svg {
			width: 14px;
			height: 14px;
		}

		&:hover:not([data-disabled]) {
			background: var(--surface-hover);
			border-color: var(--border-default);
			color: var(--text-primary);
		}

		&:focus-visible {
			outline: none;
			border-color: var(--border-strong);
			box-shadow: 0 0 0 3px var(--surface-active);
		}

		&[data-disabled] {
			opacity: 0.35;
			cursor: not-allowed;
		}
	}
</style>
