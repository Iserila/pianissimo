<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { pb } from '$lib/pocketbase';
	import meta from '$lib/meta';
	import type { Artist } from '$lib/types/global.interface';

	export let data: Artist;
	const fileUrl = data.image
		? pb.files.getUrl(data, data.image?.toString(), { thumb: '512x512' })
		: '/images/no-file.png';
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Artist >> {data.stageName} • {meta.title}</title>
	<meta name="title" content={`Artist >> ${data.stageName} • ${meta.title}`} />

	<!-- Open Graph -->
	<meta property="og:url" content={meta.url + '/artists/' + data.id} />
	<meta property="og:title" content={`Artist >> ${data.stageName} • ${meta.title}`} />
	<meta property="og:image" content={fileUrl} />

	<!-- Twitter -->
	<meta property="twitter:url" content={meta.url + '/artists/' + data.id} />
	<meta property="twitter:title" content={`Artist >> ${data.stageName} • ${meta.title}`} />
	<meta property="twitter:image" content={fileUrl} />
</svelte:head>

<div class="grid gap-10 py-4 xl:grid-cols-2 xl:gap-20 xl:py-10">
	<div class="flex flex-col items-center gap-8 xl:flex-row">
		<img src={fileUrl} alt={data.stageName} class="w-40 rounded-lg xl:w-56" />
		<div class="text-center xl:text-start">
			<h1 class="text-5xl font-bold">{data.stageName}</h1>
			<p class="mt-2 text-lg">{data.realName} {data.localName && ` • ${data.localName}`}</p>
		</div>
	</div>

	<Table.Root>
		<Table.Body>
			<Table.Row>
				<Table.Cell>Real Name</Table.Cell>
				<Table.Cell>{data.realName}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Local Name</Table.Cell>
				<Table.Cell>{data.localName === '' ? '-' : '-'}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Birth</Table.Cell>
				<Table.Cell>
					{Intl.DateTimeFormat('en-US', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					}).format(new Date(data.birth))}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Country</Table.Cell>
				<Table.Cell>{data.country}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Band</Table.Cell>
				<Table.Cell>{data.band ? '✅' : '❌'}</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Website</Table.Cell>
				<Table.Cell>
					{#if data.website}
						<Button
							variant="link"
							href={data.website}
							target="_blank"
							rel="noopener noreferrer"
							class="px-0"
						>
							{data.website}
						</Button>
					{/if}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Created At</Table.Cell>
				<Table.Cell>
					{Intl.DateTimeFormat('en-US', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					}).format(new Date(data.created))}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Last Updated</Table.Cell>
				<Table.Cell>
					{Intl.DateTimeFormat('en-US', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					}).format(new Date(data.updated))}
				</Table.Cell>
			</Table.Row>
			<Table.Row>
				<Table.Cell>Note</Table.Cell>
				<Table.Cell>{data.note === '' ? '-' : '-'}</Table.Cell>
			</Table.Row>
		</Table.Body>
	</Table.Root>
</div>
