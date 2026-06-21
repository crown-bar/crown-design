<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof CalendarPrimitive.Header>;

	let { class: className = '', children, ...rest }: Props = $props();
</script>

<CalendarPrimitive.Header class="calendar-header{className ? ' ' + className : ''}" {...rest}>
	{@render children?.()}
</CalendarPrimitive.Header>

<style>
	:global(.calendar-header) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-2);
		padding: 0 var(--space-1) var(--space-3);
	}
</style>
