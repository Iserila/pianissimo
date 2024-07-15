import { pb } from '$lib/pocketbase';
import type { Genre, Sheet } from '$lib/types/global.interface';

export async function getSheets(locals: any): Promise<Record<Genre, Sheet[]>> {
	const sheets = await locals.pb.collection('sheets').getFullList({
		sort: 'title',
		expand: 'artist'
	});
	sheets.sort((a: any, b: any) => a.genre.localeCompare(b.genre));
	let groupedSheets = sheets.reduce((groups: any, sheet: any) => {
		const genre = sheet.genre || 'Unknown';
		if (!groups[genre]) groups[genre] = [];
		groups[genre].push(sheet);
		return groups;
	}, {});

	return groupedSheets;
}

export async function getSheet(locals: App.Locals, id: string) {
	const sheet = await pb.collection('sheets').getOne(id, {
		expand: 'artist,publishedBy',
		headers: { 'Authorization': `Bearer ${locals.pb.authStore.token}` }
	});

	return sheet;
}

export async function saveSheet(locals: App.Locals, sheet: Sheet): Promise<Sheet | any> {
	try {
		const newSheet = {
			...sheet,
			publishedBy: await locals.pb.authStore.model?.id,
		}

		// Adding the Authorization header to the request manually works, but shouldn't it be added automatically by the pb client?
		const record: Sheet = await pb.collection('sheets').create(newSheet, { headers: { 'Authorization': `Bearer ${locals.pb.authStore.token}` } });
		return record;
	} catch (e: any) {
		console.error(e);
		return e;
	}
}