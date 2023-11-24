<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} Error</title>
</svelte:head>

<div class="flex flex-col w-screen h-screen items-center justify-center background-pattern">
	<div class="border border-primary w-max flex flex-col justify-center items-center bg-secondary">
		<div class="flex flex-col justify-center items-center p-6">
			<h1 class="text-primary font-bold text-8xl">{$page.status}</h1>
			<h2>{$page.error?.message}</h2>
		</div>
		<a
			class="border-t border-primary w-full text-3xl bg-primary text-white transition-colors group p-3 align-middle font-semibold"
			href="/">Back To Home Page</a
		>
	</div>
</div>
