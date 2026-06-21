<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof CalendarPrimitive.Heading>;

	let { class: className = '', ...rest }: Props = $props();
</script>

<CalendarPrimitive.Heading class="calendar-heading{className ? ' ' + className : ''}" {...rest} />

<style>
	:global(.calendar-heading) {
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		font-size: var(--size-sm);
		color: var(--text-primary);
	}
</style>
