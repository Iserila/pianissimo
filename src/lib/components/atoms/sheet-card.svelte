<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import * as Card from '$lib/components/ui/card';
	import { pb } from '$lib/pocketbase';
	import type { Sheet } from '$lib/types/global.interface';

	export let sheet: Sheet;
</script>

<a href={`/app/sheets/${sheet.id}`}>
	<div class="flex h-32 rounded-lg border hover:bg-muted/25">
		<img
			src={sheet.image ? pb.files.getUrl(sheet, sheet.image?.toString(), { thumb: '256'}) : '/images/no-file.png'}
			alt={sheet.title}
			class="aspect-square h-32 rounded-l-lg object-cover"
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
