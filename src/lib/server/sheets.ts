import { pb } from "$lib/pocketbase";

export async function getSheets() {
    const sheets = await pb.collection('sheets').getFullList({
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