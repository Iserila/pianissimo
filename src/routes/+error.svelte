<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<h1 class="text-4xl font-bold text-accent-foreground">{$page.status}</h1>
	<p class="text-muted-foreground">{$page.error?.message}</p>
	<Button href="/" class="mt-6">Go back to home</Button>
</div>
