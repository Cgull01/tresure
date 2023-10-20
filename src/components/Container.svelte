<script lang="ts">
	export let title: string = '';
</script>

<div class="flex flex-col w-96">
	<h1 class="text-text_secondary dark:text-text_secondary_dark bg-primary dark:bg-primary_dark font-sans py-3 text-3xl mb-1 px-3">{title}</h1>
	<div class="border border-primary dark:border-primary_dark w-full">
		<slot />
	</div>
</div>
