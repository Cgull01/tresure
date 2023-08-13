<script>
	import IconPlus from '../Icons/Icon_plus.svelte';

	export let bonusStyles = '';
</script>

<button
	on:click
	class={`p-1 group ${bonusStyles} bg-background w-max h-max border-black cursor-pointer group hover:invert transition-all`}
	type="button"
>
	<IconPlus styles="group-active:scale-100 scale-90" />
</button>
