<script>
	import IconLogo from '../Icons/Icon_Logo.svelte';
</script>

<div class="p-2 bg-secondary w-full h-max flex flex-row text-primary border-black border-b">
	<a href="/"><IconLogo /></a>
	<nav>
		<slot />
	</nav>
</div>
