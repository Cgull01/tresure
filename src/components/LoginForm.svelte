<script lang="ts">
	import { enhance } from '$app/forms';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';

	export let form: any;
</script>

<form use:enhance class="flex flex-col text-primary bg-white" method="POST" action="?/login">
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
			class="form_input"
			value={form?.email || 'test2@test.com'}
		/>

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="current-password"
			id="password"
			name="password"
			class="form_input"
			value="T3st"
		/>
	</div>

		<button class="form_button">Continue</button>
</form>
