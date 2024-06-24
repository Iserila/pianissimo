<script>
	import AuthCheck from '$lib/components/atoms/auth-check.svelte';
import Footer from '$lib/components/elements/footer.svelte';
import Navbar from '$lib/components/elements/navbar.svelte';
</script>

<AuthCheck>
	<Navbar />
	<div class="px-5 py-10 lg:px-40">
		<slot />
	</div>
	<Footer />
</AuthCheck>
