import type { RequestHandler } from './$types';
import { redirect } from '@sveltejs/kit';

export const POST: RequestHandler = ({ locals }) => {
	locals.pb.authStore.clear();
	locals.user = undefined;

	throw redirect(303, '/');
};
