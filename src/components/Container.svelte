<script lang="ts">
	export let title: string = '';
</script>

<div class="flex flex-col w-96">
	<h1 class="text-white bg-primary font-sans py-3 text-3xl mb-1 px-3">{title}</h1>
	<div class="border border-black w-full">
		<slot />
	</div>
</div>
