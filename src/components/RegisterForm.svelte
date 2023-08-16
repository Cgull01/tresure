<script>
	import { enhance } from '$app/forms';
</script>

<form class="flex flex-col text-black" method="post" action="?/register" use:enhance>
	<div class="p-3 flex flex-col">
		<label for="username" class="font-semibold">Username:</label>
		<input
			required
			type="text"
			autoComplete="username"
			id="username"
			name="username"
			class="p-1 border-l-2 border-accent bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 border" />

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="new-password"
			id="password"
			name="password"
			class="p-1 border-l-2 border-accent bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 border" />
		<!--
		<label for="repeatPassword" class="font-semibold">Repeat Password:</label>
		<input
			required
			type="password"
			autoComplete="new-password"
			id="repeatPassword"
			name="repeatPassword"
			class="p-1 border-l-2 border-accent bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 border" /> -->

		<!-- <div class="text-xl">
			<input
				required
				type="checkbox"
				id="remember"
				name="remember"
				class="accent-accent h-4 w-4 border-l-2 rounded-full mr-1" />
			<a class="select-none" href="#">Agree to <u>terms of service</u></a>
		</div> -->
	</div>
	<div
		class="flex flex-row cursor-pointer border-t border-accent w-full text-3xl mt-6 hover:bg-accent hover:text-white transition-colors group px-4 align-middle font-semibold">
		<button>Continue</button>
		<svg
			class="group-active:translate-x-11 group-active:transition-none group-hover:translate-x-6 transition-transform group-hover:fill-white"
			xmlns="http://www.w3.org/2000/svg"
			height="48"
			viewBox="0 -960 960 960"
			width="48"
			><path
				d="m242-200 210-280-210-280h74l210 280-210 280h-74Zm252 0 210-280-210-280h74l210 280-210 280h-74Z" /></svg>
	</div>
</form>
