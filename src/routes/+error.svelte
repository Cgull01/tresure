<script lang="ts">
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>{$page.status} Error</title>
</svelte:head>

<div class="flex flex-col w-screen h-screen items-center justify-center">
	<div class="border border-accent w-max flex flex-col justify-center items-center">
		<div class="flex flex-col justify-center items-center p-6">
			<h1 class="text-accent font-bold text-8xl">{$page.status}</h1>
			<h2>{$page.error?.message}</h2>
		</div>
		<a
			class="border-t border-accent w-full text-3xl hover:bg-accent hover:text-white transition-colors group p-3 align-middle font-semibold select-none"
			href="/">Back To Home Page</a>
	</div>
</div>
