// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
type PocketBase = import('pocketbase').default;
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase;
			user?: Record<string, T>;

		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export { };
