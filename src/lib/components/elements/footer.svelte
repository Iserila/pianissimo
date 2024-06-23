<script>
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Github } from 'lucide-svelte';

	// @ts-expect-error
	// eslint-disble-next-line no-undef
	const pkg = __PACKAGE__;
</script>

<Separator />

<footer class="px-5 py-10 lg:px-40">
	<div class="flex items-center gap-2">
		<img src="/images/logo.svg" alt="logo" class="h-12 w-12" />
		<h6 class="mt-2 items-center text-xl font-bold">
			Pianissimo
			<Badge variant="secondary">v{pkg.version}</Badge>
		</h6>
	</div>
	<p class="text-muted-foreground">A private, invite-only sheet music platform.</p>
	<Button variant="outline" class="mt-4" href="https://github.com/Fyxren/pianissimo">
		<Github class="mr-2 h-4 w-4" />
		Open Source
	</Button>
</footer>
