<script lang="ts">
	import { Slider as SliderPrimitive } from 'bits-ui';

	interface Props {
		type?: 'single' | 'multiple';
		value?: number | number[];
		min?: number;
		max?: number;
		step?: number;
		disabled?: boolean;
		/** Override the accent color. */
		color?: string;
		class?: string;
	}

	let {
		type = 'single',
		value = $bindable(type === 'multiple' ? [] : 0),
		min = 0,
		max = 100,
		step = 1,
		disabled = false,
		color,
		class: className = ''
	}: Props = $props();
</script>

{#snippet sliderBody({ thumbItems }: { thumbItems: { index: number }[] })}
	<span class="slider-track">
		<SliderPrimitive.Range class="slider-range" />
	</span>
	{#each thumbItems as thumb (thumb.index)}
		<SliderPrimitive.Thumb index={thumb.index} class="slider-thumb" />
	{/each}
{/snippet}

{#if type === 'multiple'}
	<SliderPrimitive.Root
		type="multiple"
		bind:value={value as number[]}
		{min}
		{max}
		{step}
		{disabled}
		class="slider{className ? ' ' + className : ''}"
		style={color ? `--slider-accent: ${color}` : undefined}
	>
		{#snippet children(props)}
			{@render sliderBody(props)}
		{/snippet}
	</SliderPrimitive.Root>
{:else}
	<SliderPrimitive.Root
		type="single"
		bind:value={value as number}
		{min}
		{max}
		{step}
		{disabled}
		class="slider{className ? ' ' + className : ''}"
		style={color ? `--slider-accent: ${color}` : undefined}
	>
		{#snippet children(props)}
			{@render sliderBody(props)}
		{/snippet}
	</SliderPrimitive.Root>
{/if}

<style>
	:global(.slider) {
		position: relative;
		display: inline-flex;
		align-items: center;
		width: 100%;
		height: 18px;
		touch-action: none;

		&[data-disabled] {
			opacity: 0.45;
			cursor: not-allowed;
		}
	}

	.slider-track {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		height: 4px;
		margin-top: -2px;

		background: var(--border-default);
		border-radius: var(--radius-pill);
	}

	:global(.slider-range) {
		top: 50%;
		height: 4px;
		margin-top: -2px;

		background: var(--slider-accent, var(--action-primary));
		border-radius: var(--radius-pill);
	}

	:global(.slider-thumb) {
		top: 50%;
		margin-top: -9px;
		width: 18px;
		height: 18px;

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-strong);
		border-radius: 50%;
		box-shadow: var(--shadow-xs);
		cursor: pointer;

		transition: box-shadow var(--duration-fast) var(--ease-standard);

		&:focus-visible {
			outline: var(--border-thick) solid var(--focus-ring);
			outline-offset: 2px;
		}

		&[data-disabled] {
			cursor: not-allowed;
		}
	}

	:global([data-theme='dark'] .slider-thumb) {
		border-color: var(--crown-white);
	}
</style>
