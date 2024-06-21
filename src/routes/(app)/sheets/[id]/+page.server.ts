import { getSheet } from '$lib/server/sheets';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
    const sheet = await getSheet(params.id);
    return sheet;
}) satisfies PageServerLoad;