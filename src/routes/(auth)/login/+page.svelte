<script lang="ts">
	import Login from '$lib/components/elements/login-form.svelte';
	import meta from '$lib/meta';
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

<div class="flex items-center justify-center h-screen">
	<Login />
</div>