<script lang="ts">
	import { currentUser } from '$lib/pocketbase';
	import Button from '../ui/button/button.svelte';

	export let checkAdmin = false;
</script>

{#if $currentUser && (!checkAdmin || $currentUser.role === 'admin')}
	<slot />
{:else if $currentUser && checkAdmin && $currentUser.role !== 'admin'}
	<div class="flex h-screen items-center justify-center">
		<div class="space-y-4 text-center">
			<p class="text-4xl font-bold tracking-widest text-primary">404</p>
			<h1 class="text-5xl font-thin">Page not found</h1>
			<p class="italic">This page does not exist. Let's head back, shall we?</p>

			<Button href="/sheets">Back to the sheets</Button>
		</div>
	</div>
{:else}
	<div class="flex h-screen items-center justify-center">
		<div class="space-y-4 text-center">
			<p class="text-4xl font-bold tracking-widest text-primary">401</p>
			<h1 class="text-5xl font-thin">You are not logged in</h1>
			<p class="italic">This is an invite-only platform. You can only join using an invite code.</p>

			<Button href="/login">Go to Login</Button>
		</div>
	</div>
{/if}
