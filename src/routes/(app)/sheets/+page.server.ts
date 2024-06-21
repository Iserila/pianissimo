import { getSheets } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const sheets = await getSheets();
    return sheets;
}) satisfies PageServerLoad;