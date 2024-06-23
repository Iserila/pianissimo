import { getArtists } from '$lib/server/artists';
import { handlePocketbaseError } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    try {
        const artists = await getArtists();
        return { artists };
    } catch (e) {
        handlePocketbaseError(e);
    }
}) satisfies PageServerLoad;