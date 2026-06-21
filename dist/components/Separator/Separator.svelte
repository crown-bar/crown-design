<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLHRElement> {
		orientation?: 'horizontal' | 'vertical';
		decorative?: boolean;
	}

	let { orientation = 'horizontal', decorative = true, class: className = '', ...rest }: Props =
		$props();
</script>

<hr
	class="separator separator--{orientation}{className ? ' ' + className : ''}"
	role={decorative ? 'none' : 'separator'}
	aria-orientation={decorative ? undefined : orientation}
	{...rest}
/>

<style>
	.separator {
		border: none;
		margin: 0;
		background: var(--border-subtle);
		flex: none;
	}

	.separator--horizontal {
		width: 100%;
		height: var(--border-hairline);
	}

	.separator--vertical {
		width: var(--border-hairline);
		height: 100%;
		align-self: stretch;
	}
</style>
