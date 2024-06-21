<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { pb } from '$lib/pocketbase';

	export let sheet: any;
</script>

<a href={`/sheets/${sheet.id}`}>
	<div class="flex h-32 rounded-lg border hover:bg-muted/25">
		<img
			src={sheet.image
				? `${pb.baseUrl}/api/files/${sheet.collectionId}/${sheet.id}/${sheet.image}`
				: 'https://placehold.co/100'}
			alt={sheet.title}
			class="h-32 rounded-l-lg object-cover aspect-square"
		/>
		<div class="flex w-full flex-col justify-between p-4">
			<div>
				<Card.Title>{sheet.title}</Card.Title>
				<Card.Description>{sheet.expand?.artist?.stageName ?? 'Unknown'}</Card.Description>
			</div>
			<div>
				{#if sheet.annotatedSheet}
					<Badge variant="secondary">Annotated</Badge>
				{/if}
				{#if sheet.cleanSheet}
					<Badge variant="secondary">Clean</Badge>
				{/if}
			</div>
		</div>
	</div>
</a>
