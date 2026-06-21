<script lang="ts">
	import { Tooltip as TooltipPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof TooltipPrimitive.Root>;

	let { open = $bindable(false), delayDuration = 120, ...rest }: Props = $props();
</script>

<TooltipPrimitive.Provider {delayDuration}>
	<TooltipPrimitive.Root bind:open {delayDuration} {...rest} />
</TooltipPrimitive.Provider>
