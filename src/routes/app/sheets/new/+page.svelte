<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { cn } from '$lib/utils';
	import { genres, SheetSchema, type ZodSheet } from '$lib/form-schemas';
	import type { User } from '$lib/types/global.interface';
	import { Box, Check, ChevronsUpDown, FileImage, FileText } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { toast } from 'svelte-sonner';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import { Separator } from '$lib/components/ui/separator';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { buttonVariants } from '$lib/components/ui/button';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { goto } from '$app/navigation';

	export let data: { user: User; form: SuperValidated<Infer<ZodSheet>> };

	const form = superForm(data.form, {
		taintedMessage:
			'You have unsaved changes. Are you sure you want to leave this page?\n\n(。_。)',
		validators: zodClient(SheetSchema),
		async onResult({ result }) {
			// This actively hurts my soul
			if (result.type === 'success' && result.data?.form?.data) {
				const { title } = result.data.form.data;
				toast.success(`Sheet '${title}' has been created.`);
				await goto(`/app/sheets`);
			} else {
				toast.error('Something went wrong. Please try again later.');
			}
		}
	});
	const { form: formData, enhance } = form;

	let open = false;
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<h1 class="text-4xl font-bold">New Sheet</h1>
<button on:click={() => toast.error('Hello world')}>Show toast</button>

<form method="POST" use:enhance enctype="multipart/form-data" class="mt-8 max-w-4xl space-y-8">
	<div class="grid space-y-4 md:grid-cols-2 md:space-y-0">
		<div>
			<h2 class="flex items-center text-xl font-bold">
				<FileText class="mr-1 h-5 object-contain" />
				Info
			</h2>
			<p class="text-sm text-muted-foreground">Fill in the details of the sheet.</p>
		</div>
		<div>
			<Form.Field {form} name="title">
				<Form.Control let:attrs>
					<Form.Label>Title</Form.Label>
					<Input
						class="focus:border-2 focus:border-accent-foreground"
						{...attrs}
						bind:value={$formData.title}
					/>
				</Form.Control>
				<Form.Description>The original song title.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="source">
				<Form.Control let:attrs>
					<Form.Label>Source</Form.Label>
					<Input
						class="focus:border-2 focus:border-accent-foreground"
						{...attrs}
						bind:value={$formData.source}
					/>
				</Form.Control>
				<Form.Description>The source. E.g. the name of a movie, game, etc.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="genre" class="flex flex-col">
				<Popover.Root bind:open let:ids>
					<Form.Control let:attrs>
						<Form.Label>Genre</Form.Label>
						<Popover.Trigger
							class={cn(
								buttonVariants({ variant: 'outline' }),
								'w-full justify-between focus:border-2 focus:border-accent-foreground',
								!$formData.genre && 'text-muted-foreground'
							)}
							role="combobox"
							{...attrs}
						>
							{genres.find((x) => x === $formData.genre) ?? 'Select genre'}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Popover.Trigger>
						<input hidden value={$formData.genre} name={attrs.name} />
					</Form.Control>
					<Popover.Content class="p-0">
						<Command.Root>
							<Command.Input autofocus placeholder="Search genre..." class="h-9" />
							<Command.Empty>No genre found.</Command.Empty>
							<Command.Group>
								<ScrollArea class="h-72">
									{#each genres as genre}
										<Command.Item
											value={genre}
											onSelect={() => {
												$formData.genre = genre;
												closeAndFocusTrigger(ids.trigger);
											}}
										>
											{genre}
											<Check
												class={cn(
													'ml-auto h-4 w-4',
													genre !== $formData.genre && 'text-transparent'
												)}
											/>
										</Command.Item>
									{/each}
								</ScrollArea>
							</Command.Group>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
				<Form.Description>The genre of the song.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="duo">
				<Form.Control let:attrs>
					<Form.Label>Duo</Form.Label>
					<div>
						<Switch
							class="focus:border-2 focus:border-accent-foreground"
							includeInput
							{...attrs}
							bind:checked={$formData.duo}
						/>
					</div>
				</Form.Control>
				<Form.Description>Whether the song is meant to be played by two people.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<Separator />

	<!-- Media -->
	<div class="grid space-y-4 md:grid-cols-2 md:space-y-0">
		<div>
			<h2 class="flex items-center text-xl font-bold">
				<FileImage class="mr-1 h-5 object-contain" />
				Media
			</h2>
			<p class="text-sm text-muted-foreground">Upload the media related to the song.</p>
		</div>
		<div>
			<Form.Field {form} name="image">
				<Form.Control let:attrs>
					<Form.Label>Image</Form.Label>
					<Input
						{...attrs}
						type="file"
						name="image"
						accept="image/png, image/jpeg"
						on:input={(e) => ($formData.image = e.currentTarget.files?.item(0) ?? null)}
						class="focus:border-2 focus:border-accent-foreground"
					/>
				</Form.Control>
				<Form.Description>A fitting (square) image. E.g. a Spotify cover.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="annotatedSheet">
				<Form.Control let:attrs>
					<Form.Label>Annotated Sheet</Form.Label>
					<Input
						{...attrs}
						type="file"
						accept="application/pdf"
						on:input={(e) => ($formData.annotatedSheet = e.currentTarget.files?.item(0) ?? null)}
						class="focus:border-2 focus:border-accent-foreground"
					/>
				</Form.Control>
				<Form.Description>A sheet with annotations.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="cleanSheet">
				<Form.Control let:attrs>
					<Form.Label>Clean Sheet</Form.Label>
					<Input
						{...attrs}
						type="file"
						accept="application/pdf"
						on:input={(e) => ($formData.cleanSheet = e.currentTarget.files?.item(0) ?? null)}
						class="focus:border-2 focus:border-accent-foreground"
					/>
				</Form.Control>
				<Form.Description>A fresh sheet without any annotations.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<Separator />

	<!-- Misc -->
	<div class="grid space-y-4 md:grid-cols-2 md:space-y-0">
		<div>
			<h2 class="flex items-center text-xl font-bold">
				<Box class="mr-1 h-5 object-contain" />
				Miscellaneous
			</h2>
			<p class="text-sm text-muted-foreground">Other information about the sheet.</p>
		</div>
		<div>
			<Form.Field {form} name="published">
				<Form.Control let:attrs>
					<Form.Label>Publish</Form.Label>
					<div>
						<Switch
							class="focus:border-2 focus:border-accent-foreground"
							includeInput
							{...attrs}
							bind:checked={$formData.published}
						/>
					</div>
				</Form.Control>
				<Form.Description
					>Whether the sheet should be visible to others. Preferably yes.</Form.Description
				>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="note">
				<Form.Control let:attrs>
					<Form.Label>Note</Form.Label>
					<Input
						{...attrs}
						bind:value={$formData.note}
						class="focus:border-2 focus:border-accent-foreground"
					/>
				</Form.Control>
				<Form.Description
					>Any additional notes. E.g. partly annotated or iffy quality.</Form.Description
				>
				<Form.FieldErrors />
			</Form.Field>
		</div>
	</div>

	<div class="flex justify-end">
		<Form.Button class="focus:border-2 focus:border-accent-foreground">Create</Form.Button>
	</div>
</form>
