import { getSheets } from '$lib/server/sheets';
import { handlePocketbaseError } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    try {
        const sheets = await getSheets();
        return sheets;
    } catch (e) {
        handlePocketbaseError(e);
    }
}) satisfies PageServerLoad;