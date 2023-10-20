<script>
	import IconPlus from '../Icons/Icon_plus.svelte';

	export let styles = '';
</script>

<button
	on:click
	class="p-1 group bg-background dark:bg-background_dark w-max h-max border-primary dark:border-primary_dark cursor-pointer group transition-all {styles}"
	type="button"
>
	<IconPlus styles="group-active:scale-90 group-hover:scale-105" />
</button>
