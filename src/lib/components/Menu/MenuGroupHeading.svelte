<script lang="ts">
	import { DropdownMenu as MenuPrimitive } from 'bits-ui';
	import type { ComponentProps } from 'svelte';

	type Props = ComponentProps<typeof MenuPrimitive.GroupHeading>;

	let { class: className = '', ...rest }: Props = $props();
</script>

<MenuPrimitive.GroupHeading class="menu-heading{className ? ' ' + className : ''}" {...rest} />

<style>
	:global(.menu-heading) {
		padding: 6px 10px 4px;

		font-family: var(--font-sans);
		font-size: var(--size-2xs);
		font-weight: var(--weight-semibold);
		letter-spacing: var(--tracking-eyebrow);
		text-transform: uppercase;
		color: var(--text-secondary);
	}
</style>
