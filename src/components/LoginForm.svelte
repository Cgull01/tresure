<script lang="ts">
	import { enhance } from '$app/forms';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';

	export let form: any;
</script>

<form use:enhance class="flex flex-col text-primary bg-background" method="POST" action="?/login">
	{#if form?.message}
		<p class="bg-accent text-secondary text-2xl py-1">{form.message}</p>
	{/if}
	<div class="p-3 flex flex-col">
		<label for="email" class="font-semibold">Email:</label>
		<input
			required
			type="text"
			autoComplete="email"
			id="email"
			name="email"
			class="p-1 border border-l-2 border-primary bg-secondary outline-none mb-3"
			value={form?.email || 'test@test.com'}
		/>

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="current-password"
			id="password"
			name="password"
			class="p-1 border border-l-2 border-primary bg-secondary outline-none mb-3"
			value="t3St"
		/>
	</div>
	<div
		class="flex flex-row cursor-pointer border-t border-primary w-full text-3xl mt-6 hover:bg-primary hover:text-white transition-colors group px-4 align-middle font-semibold h-12"
	>
		<button>Continue</button>
	</div>
</form>
