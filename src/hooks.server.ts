import PocketBase from 'pocketbase';
import { PUBLIC_PB_URL } from "$env/static/public";
import { serializeNonPOJOs } from '$lib/utils';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    event.locals.pb = new PocketBase(PUBLIC_PB_URL);
    event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    if (event.locals.pb.authStore.isValid) {
        await event.locals.pb.collection('users').authRefresh();
        event.locals.user = serializeNonPOJOs(event.locals.pb.authStore.model);
    } else {
        event.locals.user = undefined;
    }

    if (event.url.pathname.startsWith('/app')) {
        if (!event.locals.user) throw redirect(303, '/login');
    }

    const response = await resolve(event);

    response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie());

    return response;
}