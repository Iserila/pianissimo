import { getSheet } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';
import { handlePocketbaseError } from '$lib/utils';

export const load = (async ({ params }) => {
    try {
        const sheet = await getSheet(params.id);
        return sheet;
    } catch (e) {
        handlePocketbaseError(e);
    }
}) satisfies PageServerLoad;