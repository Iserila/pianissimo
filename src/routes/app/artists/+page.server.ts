import { getArtists } from '$lib/server/artists';
import { handlePocketbaseError } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    try {
        const artists = await getArtists(locals);
        return { artists };
    } catch (e) {
        handlePocketbaseError(e);
    }
}) satisfies PageServerLoad;