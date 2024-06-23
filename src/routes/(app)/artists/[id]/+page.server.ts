import { getArtist } from '$lib/server/artists';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const artist = await getArtist(params.id);
    return artist;
}) satisfies PageServerLoad;