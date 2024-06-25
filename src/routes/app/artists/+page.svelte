<script lang="ts">
	import ArtistCard from '$lib/components/atoms/artist-card.svelte';
	import type { Artist } from '$lib/types/global.interface';

	export let data: { artists: Artist[] };
</script>

{#if data}
	<h1 class="text-4xl font-bold">Artists</h1>
	<div class="mt-4 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
		{#each data.artists as artist}
			<ArtistCard {artist} />
		{/each}
	</div>
{/if}
