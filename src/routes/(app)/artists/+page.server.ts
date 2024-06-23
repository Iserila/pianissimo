import { getArtists } from '$lib/server/artists';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const artists = await getArtists();
    return { artists };
}) satisfies PageServerLoad;