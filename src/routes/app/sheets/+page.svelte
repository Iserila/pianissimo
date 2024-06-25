<script lang="ts">
	import SheetCard from '$lib/components/atoms/sheet-card.svelte';
	import type { Sheet } from '$lib/types/global.interface';

	// NOTE: 'string' should be Genre, but it's not working
	// export let data: Record<string, Sheet[]>;
	export let data: { user: any; sheets: Record<string, Sheet[]> };
</script>

{#if data.sheets}
	<h1 class="text-4xl font-bold">Sheets</h1>
	{#each Object.keys(data.sheets) as genre}
		<h2 class="mt-8 text-2xl font-bold">{genre}</h2>
		<div class="mt-4 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
			{#each data.sheets[genre] as sheet}
				<SheetCard {sheet} />
			{/each}
		</div>
	{/each}
{/if}
