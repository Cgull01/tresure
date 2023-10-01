<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: any;
</script>

<form
	class="flex flex-col text-primary bg-background"
	method="POST"
	action="?/register"
	use:enhance
>
	{#if form?.message}
		<p class="bg-accent text-secondary text-2xl py-1">{form.message}</p>
	{/if}

	<div class="p-3 flex flex-col">
		<label for="username" class="font-semibold">Username:</label>
		<input
			required
			type="text"
			autoComplete="username"
			id="username"
			name="username"
			class="p-1 border-l-2 border-primary bg-secondary outline-none mb-3 border"
		/>
		<label for="email" class="font-semibold">Email:</label>

		<input
			required
			type="email"
			autoComplete="email"
			id="email"
			name="email"
			class="p-1 border-l-2 border-primary bg-secondary outline-none mb-3 border"
		/>

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="new-password"
			id="password"
			name="password"
			class="p-1 border-l-2 border-primary bg-secondary outline-none mb-3 border"
		/>
	</div>
	<div
		class="flex flex-row cursor-pointer border-t border-primary w-full text-3xl mt-6 hover:bg-primary hover:text-white transition-colors group px-4 align-middle font-semibold h-12"
	>
		<button>Continue</button>
	</div>
</form>
