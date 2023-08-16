<script>
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';
</script>

<form class="flex flex-col text-accent" method="post" action="?/login">
	<div class="p-3 flex flex-col">
		<label for="email" class="font-semibold">Email:</label>
		<input
			type="email"
			autoComplete="email"
			id="email"
			name="email"
			class="p-1 border border-l-2 border-accent bg-formBackground focus:bg-formBackgroundFocused outline-none" />

		<label for="password" class="font-semibold">Password:</label>
		<input
			type="password"
			autoComplete="current-password"
			id="password"
			name="password"
			class="p-1 border border-l-2 border-accent bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3" />

		<div class="text-xl self-end hover:bg-formBackground px-2 cursor-pointer">
			<input
				type="checkbox"
				autoComplete="off"
				id="remember"
				name="remember"
				class="cursor-pointer accent-accent h-4 w-4 border-l-2 rounded-full mr-1" />
			<label for="remember" class="cursor-pointer select-none">Remember me</label>
		</div>
	</div>
	<div
		class="flex flex-row cursor-pointer border-t border-accent w-full text-3xl mt-6 hover:bg-accent hover:text-white transition-colors group px-4 align-middle font-semibold h-12">
		<button>Continue</button>
	</div>
</form>
