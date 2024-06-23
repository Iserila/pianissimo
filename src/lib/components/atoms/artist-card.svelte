<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import type { Artist } from '$lib/types/global.interface';

	export let artist: Artist;
</script>

<a href={`/artists/${artist.id}`}>
	<div class="flex h-32 rounded-lg border hover:bg-muted/25">
		<img
			src={artist.image
				? `${pb.baseUrl}/api/files/${artist.collectionId}/${artist.id}/${artist.image}`
				: 'https://placehold.co/100'}
			alt={artist.stageName}
			class="aspect-square h-32 rounded-l-lg object-cover"
		/>
		<div class="flex w-full flex-col justify-between p-4">
			<div>
				<Card.Title>{artist.stageName}</Card.Title>
				<Card.Description
					>{artist.realName ?? ''}
					{artist.localName ? ` ( ${artist.localName} )` : ''}</Card.Description
				>
			</div>
			<div>
				{#if artist.band}
					<Badge variant="secondary">Band</Badge>
				{/if}
			</div>
		</div>
	</div>
</a>
