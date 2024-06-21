<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { currentUser, pb } from '$lib/pocketbase';

	function signOut() {
		pb.authStore.clear();
	}
</script>

<div class="flex h-screen flex-col justify-center px-40">
	<h1 class="text-7xl font-bold">Pianissimo</h1>
	<p class="mt-2 text-xl">A personal use, private piano sheet collection.</p>
	{#if $currentUser}
		<Separator class="mt-8 w-64" />
		<p class="mt-8">Welcome back, {$currentUser.name}!</p>
		<div>
			<Button class="mt-8 w-40" href="/sheets">View Sheets</Button>
			<Button variant="link" on:click={signOut}>Sign out</Button>
		</div>
	{:else}
		<Button class="mt-8 w-40" href="/login">Continue To Login</Button>
	{/if}
</div>
