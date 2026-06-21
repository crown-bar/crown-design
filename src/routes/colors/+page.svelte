<script lang="ts">
	import Switch from '$lib/components/Switch/Switch.svelte';
	import Label from '$lib/components/Label/Label.svelte';

	let darkMode = $state(false);
	let resolved = $state<Record<string, string>>({});

	const groups = [
		{ title: 'Brand', tokens: ['--crown-black', '--crown-white'] },
		{
			title: 'Neutral scale',
			tokens: [
				'--neutral-0',
				'--neutral-50',
				'--neutral-100',
				'--neutral-200',
				'--neutral-300',
				'--neutral-400',
				'--neutral-500',
				'--neutral-600',
				'--neutral-700',
				'--neutral-800',
				'--neutral-900',
				'--neutral-950'
			]
		},
		{
			title: 'Semantic accents',
			tokens: [
				'--green-600',
				'--green-100',
				'--gold-600',
				'--gold-100',
				'--red-600',
				'--red-100',
				'--blue-600',
				'--blue-100'
			]
		},
		{
			title: 'Surfaces',
			tokens: [
				'--surface-page',
				'--surface-card',
				'--surface-sunken',
				'--surface-inverse',
				'--surface-hover',
				'--surface-active'
			]
		},
		{
			title: 'Text',
			tokens: [
				'--text-primary',
				'--text-secondary',
				'--text-disabled',
				'--text-inverse',
				'--text-on-accent'
			]
		},
		{
			title: 'Borders',
			tokens: ['--border-subtle', '--border-default', '--border-strong', '--border-inverse']
		},
		{
			title: 'Interactive',
			tokens: ['--action-primary', '--action-primary-hover', '--action-primary-active']
		},
		{ title: 'Focus', tokens: ['--focus-ring'] },
		{
			title: 'Status',
			tokens: [
				'--status-success-fg',
				'--status-success-bg',
				'--status-warning-fg',
				'--status-warning-bg',
				'--status-danger-fg',
				'--status-danger-bg',
				'--status-info-fg',
				'--status-info-bg'
			]
		}
	];

	function refreshResolved() {
		const styles = getComputedStyle(document.documentElement);
		const next: Record<string, string> = {};
		for (const group of groups) {
			for (const token of group.tokens) {
				next[token] = styles.getPropertyValue(token).trim();
			}
		}
		resolved = next;
	}

	$effect(() => {
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.removeAttribute('data-theme');
		}
		refreshResolved();
	});
</script>

<div class="theme-toggle">
	<Switch id="theme-toggle" bind:checked={darkMode} />
	<Label for="theme-toggle" size="sm">Dark mode</Label>
</div>

<main>
	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Color Tokens</h1>
		<a class="back-link" href="/">← Back to components</a>
	</header>

	{#each groups as group (group.title)}
		<section>
			<p class="crown-eyebrow">{group.title}</p>
			<div class="swatches">
				{#each group.tokens as token (token)}
					<div class="swatch">
						<div class="swatch-color" style:background="var({token})"></div>
						<div class="swatch-meta">
							<span class="swatch-name">{token}</span>
							<span class="swatch-value">{resolved[token] ?? ''}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
</main>

<style>
	.theme-toggle {
		position: fixed;
		top: var(--space-4);
		right: var(--space-4);
		z-index: var(--z-sticky);
		display: flex;
		align-items: center;
		gap: var(--space-2);

		background: var(--surface-card);
		border: var(--border-hairline) solid var(--border-default);
		border-radius: var(--radius-sm);
		padding: var(--space-2) var(--space-3);
		box-shadow: var(--shadow-sm);
	}

	main {
		max-width: 960px;
		margin: 0 auto;
		padding: var(--space-12) var(--space-8);
		display: flex;
		flex-direction: column;
		gap: var(--space-10);
	}

	header {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.back-link {
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-secondary);
		text-decoration: none;

		&:hover {
			color: var(--text-primary);
			text-decoration: underline;
		}
	}

	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.swatches {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}

	.swatch {
		width: 156px;
	}

	.swatch-color {
		height: 64px;
		border: var(--border-hairline) solid var(--border-subtle);
		border-radius: var(--radius-sm);
	}

	.swatch-meta {
		display: flex;
		flex-direction: column;
		gap: 2px;
		margin-top: var(--space-2);
	}

	.swatch-name {
		font-family: var(--font-mono);
		font-size: var(--size-2xs);
		font-weight: var(--weight-medium);
		color: var(--text-primary);
		word-break: break-all;
	}

	.swatch-value {
		font-family: var(--font-mono);
		font-size: var(--size-2xs);
		color: var(--text-secondary);
		text-transform: uppercase;
	}
</style>
