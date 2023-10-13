<script>
	import IconTresure from '../Icons/Icon_Tresure.svelte';
</script>

<div class="p-2 bg-secondary w-full h-max flex flex-row text-primary border-black border-b">
	<a href="/"><IconTresure /></a>
	<nav class="flex flex-row justify-end w-full items-center px-16 gap-5">
		<slot />
	</nav>
</div>
