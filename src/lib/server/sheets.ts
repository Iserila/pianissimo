import { pb } from "$lib/pocketbase";
import type { Genre, Sheet } from "$lib/types/global.interface";

export async function getSheets(locals: any): Promise<Record<Genre, Sheet[]>> {
    const sheets = await locals.pb.collection('sheets').getFullList({
        sort: 'title',
        expand: 'artist',
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

export async function getSheet(locals: any, id: string) {
    const sheet = await pb.collection('sheets').getOne(id, {
        expand: 'artist,publishedBy'
    });

    return sheet;
}