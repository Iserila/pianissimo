export interface Sheet {
	annotatedSheet: string;
	artist: string;
	cleanSheet: string;
	collectionId: string;
	collectionName: string;
	created: string;
	duo: boolean;
	genre: Genre;
	id: string;
	image: string;
	note: string;
	published: boolean;
	publishedBy: string;
	source: string;
	title: string;
	updated: string;
	expand?: {
		artist?: Artist;
	};
}

export interface Artist {
	band: boolean;
	birth: string;
	collectionId: string;
	collectionName: string;
	country: string;
	created: string;
	id: string;
	image: string;
	localName: string;
	note: string;
	realName: string;
	stageName: string;
	updated: string;
	website: string;
}

export interface User {
	activated: boolean;
	avatar: string;
	bio: string;
	collectionId: string;
	collectionName: string;
	created: string;
	emailVisibility: boolean;
	id: string;
	inviteCode: string;
	name: string;
	role: Role;
	updated: string;
	username: string;
	verified: boolean;
}

export enum Role {
	Admin = 'admin',
	Moderator = 'mod',
	User = 'user'
}

export enum Genre {
	Anime = 'Anime',
	Blues = 'Blues',
	Classical = 'Classical',
	Comedy = 'Comedy',
	Country = 'Country',
	Darkwave = 'Darkwave',
	Disco = 'Disco',
	Electronic = 'Electronic',
	Experimental = 'Experimental',
	Folk = 'Folk',
	Game = 'Game',
	HipHop = 'Hip Hop',
	Jazz = 'Jazz',
	Metal = 'Metal',
	NewAge = 'New Age',
	Pop = 'Pop',
	RB = 'R&B',
	FunkSoul = 'Funk & Soul',
	ReggaeSka = 'Reggae & Ska',
	Rock = 'Rock',
	Soundtrack = 'Soundtrack',
	Theme = 'Theme',
	Other = 'Other'
}
