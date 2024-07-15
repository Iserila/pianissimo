import { getSheet } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';
import { handlePocketbaseError } from '$lib/utils';

export const load = (async ({ locals, params }) => {
	try {
		const sheet = await getSheet(locals, params.id);
		return sheet;
	} catch (e) {
		console.log(e);
		handlePocketbaseError(e);
	}
}) satisfies PageServerLoad;
