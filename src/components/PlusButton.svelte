<script>
	import IconPlus from '../Icons/Icon_plus.svelte';

	export let styles = '';
</script>

<button
	on:click
	class={`p-1 group ${styles} bg-background w-max h-max border-black cursor-pointer group hover:invert transition-all`}
	type="button">
	<IconPlus styles="group-active:scale-100 scale-90" />
</button>
