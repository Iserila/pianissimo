import { getArtist } from '$lib/server/artists';
import { handlePocketbaseError } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    try {
        const artist = await getArtist(params.id);
        return artist;
    } catch (e) {
        handlePocketbaseError(e);
    }
}) satisfies PageServerLoad;