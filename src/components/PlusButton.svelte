<script>
	import Icon from './Icon.svelte';

	export let size = 32;
	export let bonusStyles = '';
</script>

<button
	on:click
	class={`p-1 group ${bonusStyles} bg-background w-max h-max border-black cursor-pointer group hover:invert transition-all`}
	type="button"
>
	<Icon
		name="plus"
		width={size}
		height={size}
		styles="group-active:scale-100 scale-90"
		stroke="none"
	/>
</button>
