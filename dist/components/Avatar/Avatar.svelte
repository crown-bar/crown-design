<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';

	type Shape = 'rounded' | 'circle';

	interface Props extends HTMLAttributes<HTMLSpanElement> {
		name?: string;
		src?: string;
		size?: number;
		shape?: Shape;
	}

	let { name = '', src, size = 36, shape = 'rounded', class: className = '', ...rest }: Props =
		$props();

	const initials = $derived(
		name
			.split(' ')
			.filter(Boolean)
			.slice(0, 2)
			.map((p) => p[0])
			.join('')
			.toUpperCase() || '?'
	);

	const fontSize = $derived(Math.round(size * 0.4));
</script>

<span
	class="avatar avatar--{shape}{className ? ' ' + className : ''}"
	style:width="{size}px"
	style:height="{size}px"
	style:font-size="{fontSize}px"
	{...rest}
>
	{#if src}
		<img src={src} alt={name} class="avatar-img" />
	{:else}
		{initials}
	{/if}
</span>

<style>
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		flex: none;
		user-select: none;

		background: var(--neutral-900);
		color: var(--neutral-50);
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		letter-spacing: 0.02em;
	}

	.avatar--rounded {
		border-radius: var(--radius-sm);
	}

	.avatar--circle {
		border-radius: 50%;
	}

	.avatar-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
</style>
