<script>
	export let size = 32;
	export let bonusStyles = '';
</script>

<button
	on:click
	class={`p-1 group ${bonusStyles} bg-background w-max h-max border-black cursor-pointer group hover:invert transition-all`}
>
	<svg
		width={size}
		height={size}
		viewBox="0 0 49 49"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		class="group-active:scale-100 scale-90"
	>
		<rect y="16.5375" width="49" height="15.925" class="group-hover:fill-black" fill="#071525" />
		<rect
			x="32.4625"
			width="49"
			height="15.925"
			class="group-hover:fill-black"
			transform="rotate(90 32.4625 0)"
			fill="#071525"
		/>
	</svg>
</button>
