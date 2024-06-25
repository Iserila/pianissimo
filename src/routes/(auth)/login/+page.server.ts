import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { handlePocketbaseError } from '$lib/utils';
import { ClientResponseError } from 'pocketbase';

export const load = (async () => {
    return {};
}) satisfies PageServerLoad;

export const actions = {
    login: async ({ request, locals }) => {
        const { email, password } = Object.fromEntries(await request.formData());

        if (typeof email !== 'string' || typeof password !== 'string') {
            throw error(400, 'Invalid form data');
        }

        try {
            await locals.pb.collection('users').authWithPassword(email, password);
        } catch (e: any) {
            return {
                error: {
                    status: e.status || 500,
                    message: e.message || 'An error occurred'
                }
            }
        }

        throw redirect(303, '/app/sheets');
    }
}