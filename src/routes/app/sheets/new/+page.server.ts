import { superValidate } from 'sveltekit-superforms';
import type { Actions, PageServerLoad } from './$types';
import { SheetSchema } from '$lib/form-schemas';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { saveSheet } from '$lib/server/sheets';
import type { Sheet } from '$lib/types/global.interface';

export const load = (async (event) => {
	const form = await superValidate(zod(SheetSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(SheetSchema));
		if (!form.valid) return fail(400, { form });

		const formData = form.data as unknown as Sheet;
		const record = await saveSheet(event.locals, formData);

		return console.log('new/+page.server.ts: ', record);
	}
}