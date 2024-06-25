import type { Artist } from "$lib/types/global.interface";

export async function getArtists(locals: any): Promise<Artist[]> {
    const artists = await locals.pb.collection('artists').getFullList({
        sort: 'stageName',
    }) as Artist[];

    return artists;
}

export async function getArtist(locals: any, id: string): Promise<Artist> {
    const artist = await locals.pb.collection('artists').getOne(id) as Artist;
    return artist;
}