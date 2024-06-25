<script lang="ts">
	import meta from '$lib/meta';

	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	export let form;
	export let data;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Login • {meta.title}</title>
	<meta name="title" content={`Login • ${meta.title}`} />

	<!-- Open Graph -->
	<meta property="og:url" content={meta.url + '/login'} />
	<meta property="og:title" content={`Login • ${meta.title}`} />

	<!-- Twitter -->
	<meta property="twitter:url" content={meta.url + '/login'} />
	<meta property="twitter:title" content={`Login • ${meta.title}`} />
</svelte:head>

<div class="flex h-screen items-center justify-center px-5">
	<form action="?/login" method="POST">
		<Card.Root class="w-full max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Sign In</Card.Title>
				<Card.Description>Enter your credentials below to login to your account.</Card.Description>
			</Card.Header>
			<Card.Content class="grid gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input name="email" type="email" placeholder="ben@example.com" required />
				</div>
				<div class="grid gap-2">
					<Label for="password">Password</Label>
					<Input name="password" type="password" required />
				</div>
			</Card.Content>
			<Card.Footer>
				{#if data.user}
					<div class="flex w-full flex-col justify-center gap-1">
						<p class="text-center">You are already logged in.</p>
						<Button class="w-full" on:click={() => goto('/app/sheets')}>Go to dashboard</Button>
						<!-- <Button variant="link" on:click={signOut}>Sign out</Button> -->
					</div>
				{:else}
					<div class="flex w-full flex-col">
						{#if form?.error}
							<p class="mb-4 text-center text-sm text-red-500">
								{form.error.status} - {form.error.message}
							</p>
						{/if}
						<Button class="w-full" type="submit">Sign in</Button>
						<p class="text-center text-sm text-muted-foreground mt-2">
							Account activation/creation is not available yet.
						</p>
						<!-- <Button variant="link" href="/activate">Activate your account</Button> -->
					</div>
				{/if}
			</Card.Footer>
		</Card.Root>
	</form>
</div>
