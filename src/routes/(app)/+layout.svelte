<script>
	import Footer from '$lib/components/elements/footer.svelte';
import Navbar from '$lib/components/elements/navbar.svelte';
</script>

<div>
	<Navbar />
	<div class="px-5 py-10 lg:px-40">
		<slot />
	</div>
	<Footer />
</div>
