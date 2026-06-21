<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.Separator>;

	let { class: className = '', ...rest }: Props = $props();
</script>

<MenuPrimitive.Separator class="menu-separator{className ? ' ' + className : ''}" {...rest} />

<style>
	:global(.menu-separator) {
		height: 1px;
		margin: 6px 0;
		background: var(--border-subtle);
	}
</style>
