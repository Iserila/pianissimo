import { z } from 'zod';

export const genres = [
    'Anime', 'Blues',
    'Classical', 'Comedy',
    'Country', 'Darkwave',
    'Disco', 'Electronic',
    'Experimental', 'Folk',
    'Game', 'Hip Hop',
    'Jazz', 'Metal',
    'New Age', 'Pop',
    'R&B', 'Funk & Soul',
    'Reggae & Ska', 'Rock',
    'Soundtrack', 'Theme',
    'Other'
] as const;
export type Genre = typeof genres[number];

export const SheetSchema = z.object({
    title: z.string().min(1),
    source: z.string().nullable(),
    genre: z.enum(genres),
    image: z.instanceof(File, { message: 'Please upload an actual file ╰（‵□′）╯'}).refine((x) => x.size < 5_000_000, 'Max 5MB upload size.').nullable(),
    annotatedSheet: z.instanceof(File, { message: 'Please upload an actual file ╰（‵□′）╯'}).refine((x) => x.size < 10_000_000, 'Max 10MB upload size.').nullable(),
    cleanSheet: z.instanceof(File, { message: 'Please upload an actual file ╰（‵□′）╯'}).refine((x) => x.size < 10_000_000, 'Max 10MB upload size.').nullable(),
    duo: z.boolean().default(false),
    note: z.string().nullable(),
    published: z.boolean().default(true),
});
export type ZodSheet = typeof SheetSchema;

export const ArtistSchema = z.object({
    stageName: z.string().min(1),
    localName: z.string().nullable(),
    realName: z.string().nullable(),
    birth: z.date().nullable(),
    band: z.boolean().default(false),
    country: z.string().nullable(),
    website: z.string().nullable(),
    image: z.instanceof(File).nullable(),
    note: z.string().nullable()
})
export type ZodArtist = typeof ArtistSchema;