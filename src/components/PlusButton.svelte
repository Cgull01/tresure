<script>
	import IconPlus from '../Icons/Icon_plus.svelte';

	export let styles = '';
</script>

<button
	on:click
	class={`p-1 group bg-background w-max h-max border-primary cursor-pointer group hover:mix-blend-difference transition-all ${styles}`}
	type="button"
>
	<IconPlus styles="group-active:scale-100 scale-90" />
</button>
