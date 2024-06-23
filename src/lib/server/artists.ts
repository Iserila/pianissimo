import { pb } from "$lib/pocketbase";
import type { Artist } from "$lib/types/global.interface";

export async function getArtists(): Promise<Artist[]> {
    const artists = await pb.collection('artists').getFullList({
        sort: 'stageName',
    }) as Artist[];

    return artists;
}

export async function getArtist(id: string): Promise<Artist> {
    const artist = await pb.collection('artists').getOne(id) as Artist;
    return artist;
}