import { getArtist } from '$lib/server/artists';
import { handlePocketbaseError } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
	try {
		const artist = await getArtist(locals, params.id);
		return artist;
	} catch (e) {
		handlePocketbaseError(e);
	}
}) satisfies PageServerLoad;
