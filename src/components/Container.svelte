<script lang="ts">
	export let title: string = '';
</script>

<div class="w-96 h-24">
	<h1 class="text-white bg-accent font-sans py-3 text-3xl mb-1 px-3">{title}</h1>
	<div class="border border-black w-full">
		<slot />
	</div>
</div>
