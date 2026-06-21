<script lang="ts">
	import Button from '$lib/components/Button/Button.svelte';
	import Badge from '$lib/components/Badge/Badge.svelte';
	import Avatar from '$lib/components/Avatar/Avatar.svelte';
	import Separator from '$lib/components/Separator/Separator.svelte';
	import Label from '$lib/components/Label/Label.svelte';
	import Input from '$lib/components/Input/Input.svelte';
	import Textarea from '$lib/components/Textarea/Textarea.svelte';
	import Checkbox from '$lib/components/Checkbox/Checkbox.svelte';
	import Switch from '$lib/components/Switch/Switch.svelte';
	import Slider from '$lib/components/Slider/Slider.svelte';
	import * as RadioGroup from '$lib/components/RadioGroup/index.js';
	import * as Select from '$lib/components/Select/index.js';
	import Alert from '$lib/components/Alert/Alert.svelte';
	import Toast from '$lib/components/Toast/Toast.svelte';
	import Spinner from '$lib/components/Spinner/Spinner.svelte';
	import Progress from '$lib/components/Progress/Progress.svelte';
	import * as Dialog from '$lib/components/Dialog/index.js';
	import * as Tooltip from '$lib/components/Tooltip/index.js';
	import * as Menu from '$lib/components/Menu/index.js';
	import * as Tabs from '$lib/components/Tabs/index.js';
	import Card from '$lib/components/Card/Card.svelte';
	import * as Accordion from '$lib/components/Accordion/index.js';
	import * as SplitPanel from '$lib/components/SplitPanel/index.js';
	import Calendar from '$lib/components/Calendar/Calendar.svelte';
	import DateField from '$lib/components/DateField/DateField.svelte';
	import TimeField from '$lib/components/TimeField/TimeField.svelte';
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import DateRangePicker from '$lib/components/DateRangePicker/DateRangePicker.svelte';
	import TimePicker from '$lib/components/TimePicker/TimePicker.svelte';
	import DateTimePicker from '$lib/components/DateTimePicker/DateTimePicker.svelte';
	import DateTimeRangePicker, {
		type DateTimeRangeValue
	} from '$lib/components/DateTimeRangePicker/DateTimeRangePicker.svelte';
	import {
		CalendarDate,
		CalendarDateTime,
		Time,
		getLocalTimeZone,
		today,
		toCalendarDateTime
	} from '@internationalized/date';

	let checkboxChecked = $state(true);
	let checkboxIndeterminate = $state(true);
	let switchChecked = $state(true);
	let radioValue = $state('standard');
	let radioValueHorizontal = $state('a');
	let selectValue = $state('');
	let sliderValue = $state(40);
	let darkMode = $state(true);
	let dialogOpen = $state(false);
	let cardBgOutline = $state(false);
	let cardBgFlat = $state(false);
	let cardBgElevated = $state(false);
	let cardBgFooter = $state(false);
	let panelBg = $state(false);

	const todayDate = today(getLocalTimeZone());
	let calendarValue = $state<CalendarDate | undefined>(todayDate);
	let clockInValue = $state<Time | undefined>(new Time(9, 0));
	let shiftStartValue = $state<Time | undefined>(new Time(19, 0));
	let eventDateValue = $state<CalendarDate | undefined>(todayDate.add({ days: 4 }));
	let payPeriodValue = $state<{ start: CalendarDate; end: CalendarDate } | undefined>({
		start: todayDate.set({ day: 1 }),
		end: todayDate.add({ months: 1 }).set({ day: 1 }).subtract({ days: 1 })
	});

	const todayWeekday = todayDate.toDate(getLocalTimeZone()).getDay(); // 0=Sun..6=Sat
	const nextFriday = todayDate.add({ days: (5 - todayWeekday + 7) % 7 });
	let reminderValue = $state<CalendarDateTime | undefined>(
		toCalendarDateTime(todayDate, new Time(14, 30))
	);
	let shiftValue = $state<DateTimeRangeValue>({
		start: toCalendarDateTime(nextFriday, new Time(18, 0)),
		end: toCalendarDateTime(nextFriday.add({ days: 1 }), new Time(2, 0))
	});

	$effect(() => {
		if (darkMode) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.removeAttribute('data-theme');
		}
	});
</script>

<div class="theme-toggle">
	<Switch id="theme-toggle" bind:checked={darkMode} />
	<Label for="theme-toggle" size="sm">Dark mode</Label>
</div>

<main>
	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Primitives</h1>
		<a class="back-link" href="/colors">View color tokens →</a>
	</header>

	<section>
		<p class="crown-eyebrow">Button</p>
		<div class="grid">
			<div class="cell">
				<span class="label">primary</span>
				<Button variant="primary">Save shift</Button>
			</div>
			<div class="cell">
				<span class="label">secondary</span>
				<Button variant="secondary">Add staff</Button>
			</div>
			<div class="cell">
				<span class="label">ghost</span>
				<Button variant="ghost">Cancel</Button>
			</div>
			<div class="cell">
				<span class="label">danger</span>
				<Button variant="danger">Delete event</Button>
			</div>
			<div class="cell">
				<span class="label">sm</span>
				<Button size="sm">Small</Button>
			</div>
			<div class="cell">
				<span class="label">md</span>
				<Button size="md">Medium</Button>
			</div>
			<div class="cell">
				<span class="label">lg</span>
				<Button size="lg">Large</Button>
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Button disabled>Disabled</Button>
			</div>
			<div class="cell">
				<span class="label">color override</span>
				<Button color="var(--gold-600)">Custom color</Button>
			</div>
			<div class="cell">
				<span class="label">radius override</span>
				<Button variant="secondary" radius="var(--radius-pill)">Pill shape</Button>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Badge</p>
		<div class="grid">
			<div class="cell">
				<span class="label">neutral</span>
				<Badge tone="neutral">Draft</Badge>
			</div>
			<div class="cell">
				<span class="label">success</span>
				<Badge tone="success" dot>Confirmed</Badge>
			</div>
			<div class="cell">
				<span class="label">warning</span>
				<Badge tone="warning">Pending</Badge>
			</div>
			<div class="cell">
				<span class="label">danger</span>
				<Badge tone="danger">Cancelled</Badge>
			</div>
			<div class="cell">
				<span class="label">info</span>
				<Badge tone="info">Info</Badge>
			</div>
			<div class="cell">
				<span class="label">solid</span>
				<Badge tone="solid">VIP</Badge>
			</div>
			<div class="cell">
				<span class="label">outline neutral</span>
				<Badge tone="neutral" variant="outline">Draft</Badge>
			</div>
			<div class="cell">
				<span class="label">outline success</span>
				<Badge tone="success" variant="outline">Confirmed</Badge>
			</div>
			<div class="cell">
				<span class="label">outline warning</span>
				<Badge tone="warning" variant="outline">Pending</Badge>
			</div>
			<div class="cell">
				<span class="label">outline danger</span>
				<Badge tone="danger" variant="outline" dot>Cancelled</Badge>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Avatar</p>
		<div class="grid">
			<div class="cell">
				<span class="label">rounded · default</span>
				<Avatar name="Lena Brunner" />
			</div>
			<div class="cell">
				<span class="label">rounded · lg</span>
				<Avatar name="Marco Keller" size={44} />
			</div>
			<div class="cell">
				<span class="label">rounded · sm</span>
				<Avatar name="Marco Keller" size={28} />
			</div>
			<div class="cell">
				<span class="label">circle · default</span>
				<Avatar name="Lena Brunner" shape="circle" />
			</div>
			<div class="cell">
				<span class="label">circle · lg</span>
				<Avatar name="The Crown Bar" size={48} shape="circle" />
			</div>
			<div class="cell">
				<span class="label">circle · sm</span>
				<Avatar name="Marco Keller" size={28} shape="circle" />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Separator</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">horizontal</span>
				<div style="width: 100%; padding: 0 var(--space-6)">
					<Separator />
				</div>
			</div>
			<div class="cell">
				<span class="label">vertical</span>
				<div style="display: flex; align-items: center; gap: var(--space-3); height: 40px">
					<span class="crown-body" style="font-size: var(--size-sm)">One</span>
					<Separator orientation="vertical" />
					<span class="crown-body" style="font-size: var(--size-sm)">Two</span>
					<Separator orientation="vertical" />
					<span class="crown-body" style="font-size: var(--size-sm)">Three</span>
				</div>
			</div>
		</div>
	</section>

	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Form</h1>
	</header>

	<section>
		<p class="crown-eyebrow">Label</p>
		<div class="grid">
			<div class="cell">
				<span class="label">default</span>
				<Label for="demo-name">Full name</Label>
			</div>
			<div class="cell">
				<span class="label">required</span>
				<Label for="demo-email" required>Email</Label>
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Label disabled>Disabled field</Label>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Input</p>
		<div class="grid">
			<div class="cell">
				<span class="label">sm</span>
				<Input size="sm" placeholder="Small" />
			</div>
			<div class="cell">
				<span class="label">md</span>
				<Input size="md" placeholder="Medium" />
			</div>
			<div class="cell">
				<span class="label">lg</span>
				<Input size="lg" placeholder="Large" />
			</div>
			<div class="cell">
				<span class="label">invalid</span>
				<Input invalid value="bad@" placeholder="Invalid" />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Input disabled placeholder="Disabled" />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Textarea</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">default</span>
				<Textarea placeholder="Add a note about this shift…" />
			</div>
			<div class="cell cell--wide">
				<span class="label">disabled</span>
				<Textarea disabled value="Locked for editing" />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Checkbox</p>
		<div class="grid">
			<div class="cell">
				<span class="label">unchecked</span>
				<Checkbox />
			</div>
			<div class="cell">
				<span class="label">checked</span>
				<Checkbox bind:checked={checkboxChecked} />
			</div>
			<div class="cell">
				<span class="label">indeterminate</span>
				<Checkbox bind:indeterminate={checkboxIndeterminate} />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Checkbox disabled />
			</div>
			<div class="cell">
				<span class="label">with label</span>
				<div style="display: flex; align-items: center; gap: var(--space-2)">
					<Checkbox id="demo-terms" />
					<Label for="demo-terms" size="sm">Accept terms</Label>
				</div>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Radio Group</p>
		<div class="grid">
			<div class="cell">
				<span class="label">vertical</span>
				<RadioGroup.Root bind:value={radioValue}>
					<div style="display: flex; align-items: center; gap: var(--space-2)">
						<RadioGroup.Item value="standard" id="radio-standard" />
						<Label for="radio-standard" size="sm">Standard</Label>
					</div>
					<div style="display: flex; align-items: center; gap: var(--space-2)">
						<RadioGroup.Item value="express" id="radio-express" />
						<Label for="radio-express" size="sm">Express</Label>
					</div>
					<div style="display: flex; align-items: center; gap: var(--space-2)">
						<RadioGroup.Item value="pickup" id="radio-pickup" />
						<Label for="radio-pickup" size="sm">Pickup</Label>
					</div>
				</RadioGroup.Root>
			</div>
			<div class="cell">
				<span class="label">horizontal</span>
				<RadioGroup.Root orientation="horizontal" bind:value={radioValueHorizontal}>
					<RadioGroup.Item value="a" aria-label="Option A" />
					<RadioGroup.Item value="b" aria-label="Option B" />
					<RadioGroup.Item value="c" aria-label="Option C" />
				</RadioGroup.Root>
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<RadioGroup.Root value="x" disabled>
					<RadioGroup.Item value="x" aria-label="Disabled option" />
				</RadioGroup.Root>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Switch</p>
		<div class="grid">
			<div class="cell">
				<span class="label">off</span>
				<Switch />
			</div>
			<div class="cell">
				<span class="label">on</span>
				<Switch bind:checked={switchChecked} />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Switch disabled />
			</div>
			<div class="cell">
				<span class="label">with label</span>
				<div style="display: flex; align-items: center; gap: var(--space-2)">
					<Switch id="demo-notify" checked />
					<Label for="demo-notify" size="sm">Notify staff</Label>
				</div>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Select</p>
		<div class="grid">
			<div class="cell">
				<span class="label">default</span>
				<Select.Root
					type="single"
					bind:value={selectValue}
					items={[
						{ value: 'bartender', label: 'Bartender' },
						{ value: 'server', label: 'Server' },
						{ value: 'host', label: 'Host' },
						{ value: 'manager', label: 'Manager' }
					]}
				>
					<Select.Trigger>
						<Select.Value placeholder="Choose a role" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="bartender">Bartender</Select.Item>
						<Select.Item value="server">Server</Select.Item>
						<Select.Item value="host">Host</Select.Item>
						<Select.Item value="manager">Manager</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<Select.Root type="single" disabled>
					<Select.Trigger>
						<Select.Value placeholder="Unavailable" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="a">A</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Slider</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">default — {sliderValue}</span>
				<Slider bind:value={sliderValue} />
			</div>
			<div class="cell cell--wide">
				<span class="label">disabled</span>
				<Slider value={30} disabled />
			</div>
		</div>
	</section>

	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Date &amp; Time</h1>
	</header>

	<section>
		<p class="crown-eyebrow">Calendar</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">default — {calendarValue?.toString() ?? 'none'}</span>
				<Calendar bind:value={calendarValue} />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Date Field</p>
		<div class="grid">
			<div class="cell">
				<span class="label">sm</span>
				<DateField size="sm" />
			</div>
			<div class="cell">
				<span class="label">md</span>
				<DateField size="md" />
			</div>
			<div class="cell">
				<span class="label">lg</span>
				<DateField size="lg" />
			</div>
			<div class="cell">
				<span class="label">invalid</span>
				<DateField value={todayDate} validate={() => 'Required'} />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<DateField value={todayDate} disabled />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Time Field</p>
		<div class="grid">
			<div class="cell">
				<span class="label">sm — clock in</span>
				<TimeField size="sm" bind:value={clockInValue} />
			</div>
			<div class="cell">
				<span class="label">md</span>
				<TimeField size="md" />
			</div>
			<div class="cell">
				<span class="label">lg</span>
				<TimeField size="lg" />
			</div>
			<div class="cell">
				<span class="label">invalid</span>
				<TimeField value={new Time(9, 0)} validate={() => 'Required'} />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<TimeField value={new Time(9, 0)} disabled />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Time Picker</p>
		<div class="grid">
			<div class="cell">
				<span class="label">sm — shift start ({shiftStartValue?.toString() ?? 'none'})</span>
				<TimePicker size="sm" bind:value={shiftStartValue} />
			</div>
			<div class="cell">
				<span class="label">md</span>
				<TimePicker size="md" />
			</div>
			<div class="cell">
				<span class="label">lg</span>
				<TimePicker size="lg" />
			</div>
			<div class="cell">
				<span class="label">invalid</span>
				<TimePicker value={new Time(9, 0)} invalid />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<TimePicker value={new Time(9, 0)} disabled />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Date Picker</p>
		<div class="grid">
			<div class="cell">
				<span class="label">default — event date</span>
				<DatePicker bind:value={eventDateValue} minValue={todayDate} />
			</div>
			<div class="cell">
				<span class="label">disabled</span>
				<DatePicker value={todayDate} disabled />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Date Range Picker</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">pay period</span>
				<DateRangePicker bind:value={payPeriodValue} />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Date Time Picker</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">reminder — {reminderValue?.toString() ?? 'none'}</span>
				<DateTimePicker bind:value={reminderValue} />
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Date Time Range Picker</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label"
					>shift — {shiftValue.start?.toString() ?? '?'} → {shiftValue.end?.toString() ?? '?'}</span
				>
				<DateTimeRangePicker bind:value={shiftValue} minValue={todayDate} />
			</div>
		</div>
	</section>

	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Feedback</h1>
	</header>

	<section>
		<p class="crown-eyebrow">Alert</p>
		<div class="stack">
			<Alert tone="warning" title="2 shifts unfilled">
				{#snippet icon()}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /><path d="M12 9v4M12 17h.01" /></svg>
				{/snippet}
				Saturday 22:00 — bar &amp; floor still need cover.
			</Alert>
			<Alert tone="danger" title="Payroll export failed" onclose={() => {}}>
				Three records were rejected by the bank.
			</Alert>
			<Alert tone="success" title="Roster published">
				{#snippet action()}
					<Button variant="secondary" size="sm">View roster</Button>
				{/snippet}
				12 staff notified by email.
			</Alert>
			<Alert tone="neutral">Changes are saved automatically.</Alert>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Toast</p>
		<div class="row">
			<Toast tone="success" title="Roster published" description="12 staff notified by email." onclose={() => {}}>
				{#snippet icon()}
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" /></svg>
				{/snippet}
			</Toast>
			<Toast tone="danger" title="Export failed" description="Try again in a moment." />
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Progress</p>
		<div class="stack" style="max-width: 360px">
			<Progress value={72} label="Roster filled" showValue />
			<Progress value={9200} max={12000} tone="warning" size="sm" />
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Spinner · Tooltip · Dialog</p>
		<div class="grid">
			<div class="cell">
				<span class="label">default</span>
				<Spinner />
			</div>
			<div class="cell">
				<span class="label">with label</span>
				<Spinner size={20} label="Loading roster…" />
			</div>
			<div class="cell">
				<span class="label">in a button</span>
				<Button variant="primary" disabled>
					{#snippet iconLeft()}<Spinner size={14} />{/snippet}
					Saving
				</Button>
			</div>
			<div class="cell">
				<span class="label">tooltip</span>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="secondary" size="sm">Hover me</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Export to CSV</Tooltip.Content>
				</Tooltip.Root>
			</div>
			<div class="cell">
				<span class="label">dialog</span>
				<Button variant="secondary" onclick={() => (dialogOpen = true)}>Open dialog</Button>
				<Dialog.Root bind:open={dialogOpen}>
					<Dialog.Content eyebrow="Confirm" title="Delete event?">
						This removes the event and all assigned shifts. This can't be undone.
						{#snippet footer()}
							<Button variant="ghost" onclick={() => (dialogOpen = false)}>Cancel</Button>
							<Button variant="danger" onclick={() => (dialogOpen = false)}>Delete</Button>
						{/snippet}
					</Dialog.Content>
				</Dialog.Root>
			</div>
		</div>
	</section>

	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Navigation</h1>
	</header>

	<section>
		<p class="crown-eyebrow">Menu</p>
		<div class="grid">
			<div class="cell">
				<span class="label">default</span>
				<Menu.Root>
					<Menu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="secondary" size="sm">Actions</Button>
						{/snippet}
					</Menu.Trigger>
					<Menu.Content>
						<Menu.Group>
							<Menu.GroupHeading>Shift</Menu.GroupHeading>
							<Menu.Item>
								{#snippet icon()}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
								{/snippet}
								Edit
							</Menu.Item>
							<Menu.Item shortcut="⌘D">
								{#snippet icon()}
									<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
								{/snippet}
								Duplicate
							</Menu.Item>
						</Menu.Group>
						<Menu.Separator />
						<Menu.Item danger>
							{#snippet icon()}
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
							{/snippet}
							Delete
						</Menu.Item>
					</Menu.Content>
				</Menu.Root>
			</div>
			<div class="cell">
				<span class="label">align end</span>
				<Menu.Root>
					<Menu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="sm">Align end</Button>
						{/snippet}
					</Menu.Trigger>
					<Menu.Content align="end">
						<Menu.Item disabled>Disabled action</Menu.Item>
						<Menu.Item>Another action</Menu.Item>
					</Menu.Content>
				</Menu.Root>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Tabs</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">horizontal</span>
				<Tabs.Root value="overview">
					<Tabs.List>
						<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
						<Tabs.Trigger value="shifts">Shifts</Tabs.Trigger>
						<Tabs.Trigger value="payroll" disabled>Payroll</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="overview">Saturday roster is 82% filled — 3 shifts still open.</Tabs.Content>
					<Tabs.Content value="shifts">14 shifts scheduled this week across bar, floor, and kitchen.</Tabs.Content>
					<Tabs.Content value="payroll">Payroll export unlocks after the pay period closes.</Tabs.Content>
				</Tabs.Root>
			</div>
			<div class="cell cell--wide">
				<span class="label">vertical</span>
				<Tabs.Root value="venue" orientation="vertical">
					<Tabs.List>
						<Tabs.Trigger value="venue">Venue</Tabs.Trigger>
						<Tabs.Trigger value="staff">Staff</Tabs.Trigger>
						<Tabs.Trigger value="billing">Billing</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content value="venue">Rapperswil location details and opening hours.</Tabs.Content>
					<Tabs.Content value="staff">12 active staff members across 4 roles.</Tabs.Content>
					<Tabs.Content value="billing">Invoices and catering deposits.</Tabs.Content>
				</Tabs.Root>
			</div>
		</div>
	</section>

	<header>
		<p class="crown-eyebrow">Crown Design System</p>
		<h1 class="crown-display" style="font-size: var(--size-display-md)">Layout</h1>
	</header>

	<section>
		<p class="crown-eyebrow">Card</p>
		<div class="grid grid--2up">
			<div class="cell cell--card">
				<div class="cell-header">
					<span class="label">outline</span>
					<Switch class="bg-toggle" bind:checked={cardBgOutline} aria-label="Show background image behind card" />
				</div>
				<div class="bg-demo">
					<div class="bg-pattern" class:is-visible={cardBgOutline}></div>
					<Card eyebrow="Event" title="Keller Wedding">
						86 guests · Saturday 18:00 · Lakeside terrace
					</Card>
				</div>
			</div>
			<div class="cell cell--card">
				<div class="cell-header">
					<span class="label">flat</span>
					<Switch class="bg-toggle" bind:checked={cardBgFlat} aria-label="Show background image behind card" />
				</div>
				<div class="bg-demo">
					<div class="bg-pattern" class:is-visible={cardBgFlat}></div>
					<Card variant="flat" eyebrow="Today" title="Service note">
						Switch to the winter cocktail menu after 21:00.
					</Card>
				</div>
			</div>
			<div class="cell cell--card">
				<div class="cell-header">
					<span class="label">elevated</span>
					<Switch class="bg-toggle" bind:checked={cardBgElevated} aria-label="Show background image behind card" />
				</div>
				<div class="bg-demo">
					<div class="bg-pattern" class:is-visible={cardBgElevated}></div>
					<Card variant="elevated" eyebrow="Payroll" title="October export">
						All 12 staff records verified.
					</Card>
				</div>
			</div>
			<div class="cell cell--card">
				<div class="cell-header">
					<span class="label">with footer</span>
					<Switch class="bg-toggle" bind:checked={cardBgFooter} aria-label="Show background image behind card" />
				</div>
				<div class="bg-demo">
					<div class="bg-pattern" class:is-visible={cardBgFooter}></div>
					<Card eyebrow="Catering" title="Burkhalter Anniversary">
						{#snippet footer()}
							<Button variant="ghost" size="sm">Decline</Button>
							<Button variant="primary" size="sm">Confirm booking</Button>
						{/snippet}
						120 guests · Sunday 12:00 · Full bar &amp; canapés
					</Card>
				</div>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Accordion</p>
		<div class="grid">
			<div class="cell cell--wide">
				<span class="label">single</span>
				<Accordion.Root type="single">
					<Accordion.Item value="swap">
						<Accordion.Trigger>Shift swap policy</Accordion.Trigger>
						<Accordion.Content>
							Swaps must be approved by a manager at least 24 hours before the shift starts.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="tipping">
						<Accordion.Trigger>Tipping &amp; service charge</Accordion.Trigger>
						<Accordion.Content>
							Service charge is pooled weekly and split evenly across floor and bar staff.
						</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="dress">
						<Accordion.Trigger>Dress code</Accordion.Trigger>
						<Accordion.Content>Black on black. Aprons provided for bar and kitchen staff.</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
			<div class="cell cell--wide">
				<span class="label">multiple</span>
				<Accordion.Root type="multiple">
					<Accordion.Item value="deposit">
						<Accordion.Trigger>Deposit &amp; cancellation</Accordion.Trigger>
						<Accordion.Content>A 30% deposit secures the date; refundable up to 14 days prior.</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="menu">
						<Accordion.Trigger>Menu customization</Accordion.Trigger>
						<Accordion.Content>Cocktail and canapé menus can be tailored during the tasting.</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</div>
	</section>

	<section>
		<p class="crown-eyebrow">Split Panel</p>
		<div class="grid">
			<div class="cell cell--wide cell--card">
				<div class="cell-header">
					<span class="label">default</span>
					<Switch class="bg-toggle" bind:checked={panelBg} aria-label="Show background image behind panel" />
				</div>
				<div class="bg-demo">
					<div class="bg-pattern" class:is-visible={panelBg}></div>
						<SplitPanel.Root ratio="1.08fr 0.92fr">
							<SplitPanel.Pane>
								<p class="crown-eyebrow">June 2026 · Overview</p>
								<div class="panel-stat">
									<span class="panel-stat-value">14</span>
									<span class="panel-stat-unit">Events</span>
								</div>
								<p class="panel-text">
									Three more than last month. 612 hours booked across 9 events, with a CHF 38,400
									payroll run waiting for approval.
								</p>
								<div class="panel-actions">
									<Button variant="primary">Approve payroll</Button>
									<Button variant="secondary">New event</Button>
								</div>
							</SplitPanel.Pane>
							<SplitPanel.Pane tone="secondary">
								<div class="panel-row">
									<p class="crown-eyebrow">Next event</p>
									<Badge tone="success" variant="soft" dot>Confirmed</Badge>
								</div>
								<p class="panel-title">ENTRA — Open Air</p>
								<div class="panel-details">
									<div class="panel-detail">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
										<span>Sat 21 Jun · 16:00 – 02:00</span>
									</div>
									<div class="panel-detail">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
										<span>Seequai, Rapperswil</span>
									</div>
									<div class="panel-detail">
										<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
										<span><strong>10</strong> of 12 staffed</span>
									</div>
								</div>
							</SplitPanel.Pane>
						</SplitPanel.Root>
				</div>
			</div>
		</div>
	</section>
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

	.stack {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-4);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		border-top: 1px solid var(--border-subtle);
		border-left: 1px solid var(--border-subtle);
	}

	.cell {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-3);
		padding: var(--space-6);
		border-right: 1px solid var(--border-subtle);
		border-bottom: 1px solid var(--border-subtle);
	}

	.cell--wide {
		grid-column: span 4;
	}

	.grid--2up {
		grid-template-columns: repeat(2, 1fr);
	}

	.cell--card {
		align-items: stretch;
	}

	.cell-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
	}

	:global(.bg-toggle) {
		scale: 0.7;
	}

	.bg-demo {
		position: relative;
		padding: var(--space-4);
		border-radius: var(--radius-md);
	}

	.bg-demo :global(.card),
	.bg-demo :global(.split-panel) {
		position: relative;
		z-index: 1;
	}

	.bg-pattern {
		position: absolute;
		inset: 0;
		z-index: 0;
		border-radius: var(--radius-md);
		opacity: 0;

		background-image: url('https://cellar.thecrownbar.ch/public/bar/rooms/floor.jpeg');
		background-size: cover;
		background-position: center;

		transition: opacity var(--duration-fast) var(--ease-standard);
	}

	.bg-pattern.is-visible {
		opacity: 1;
	}

	.label {
		font-family: var(--font-sans);
		font-size: var(--size-2xs);
		font-weight: var(--weight-medium);
		letter-spacing: var(--tracking-wide);
		color: var(--text-secondary);
		text-transform: uppercase;
	}

	.panel-stat {
		display: flex;
		align-items: baseline;
		gap: var(--space-3);
		margin: var(--space-3) 0 var(--space-1);
	}

	.panel-stat-value {
		font-family: var(--font-serif);
		font-weight: var(--weight-semibold);
		font-size: var(--size-display-lg);
		line-height: 0.9;
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.panel-stat-unit {
		font-family: var(--font-sans);
		font-size: var(--size-lg);
		color: var(--text-secondary);
	}

	.panel-text {
		max-width: 34ch;
		margin: var(--space-4) 0 var(--space-6);
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		line-height: var(--leading-normal);
		color: var(--text-secondary);
	}

	.panel-actions {
		display: flex;
		gap: var(--space-2);
	}

	.panel-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-3);
		margin-bottom: var(--space-3);
	}

	.panel-title {
		margin: 0 0 var(--space-5);
		font-family: var(--font-sans);
		font-weight: var(--weight-semibold);
		font-size: var(--size-display-sm);
		line-height: 1.15;
		letter-spacing: var(--tracking-tight);
		color: var(--text-primary);
	}

	.panel-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.panel-detail {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		font-family: var(--font-sans);
		font-size: var(--size-sm);
		color: var(--text-secondary);
	}

	.panel-detail svg {
		flex: none;
		width: 16px;
		height: 16px;
		color: var(--text-disabled);
	}

	.panel-detail strong {
		color: var(--text-primary);
		font-weight: var(--weight-semibold);
	}
</style>
