<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { currentUser, pb } from '$lib/pocketbase';

	let user: string;
	let password: string;

	async function login() {
		let res = await pb.collection('users').authWithPassword(user, password);
		if (res) {
			console.log('PB - Logged in');
			goto('/sheets');
		}
	}

	function signOut() {
		pb.authStore.clear();
	}
</script>

<Card.Root class="w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-2xl">Sign In</Card.Title>
		<Card.Description>Enter your credentials below to login to your account.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-4">
		<div class="grid gap-2">
			<Label for="email">Email</Label>
			<Input id="email" type="email" placeholder="ben@example.com" required bind:value={user} />
		</div>
		<div class="grid gap-2">
			<Label for="password">Password</Label>
			<Input id="password" type="password" required bind:value={password} />
		</div>
	</Card.Content>
	<Card.Footer>
		{#if $currentUser}
			<div class="flex w-full flex-col justify-center gap-1">
				<p class="text-center">You are already logged in.</p>
				<Button class="w-full" on:click={() => goto('/dashboard')}>Go to dashboard</Button>
				<Button variant="link" on:click={signOut}>Sign out</Button>
			</div>
		{:else}
			<div class="flex w-full flex-col">
				<Button class="w-full" on:click={login}>Sign in</Button>
				<Button variant="link" href="/activate">Activate your account</Button>
			</div>
		{/if}
	</Card.Footer>
</Card.Root>
