<script lang="ts">
	import Footer from '$lib/components/elements/footer.svelte';
	import Navbar from '$lib/components/elements/navbar.svelte';
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

{#if data.user}
	<Navbar user={data.user} />
	<div class="px-5 py-10 lg:px-40">
		<slot />
	</div>
	<Footer />
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
