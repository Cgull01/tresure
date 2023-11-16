<script lang="ts">
	import { enhance } from '$app/forms';
	import { navigating } from '$app/stores';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';

	export let form: any;
</script>

<form
	use:enhance
	class="flex flex-col text-text_primary dark:text-text_primary_dark bg-background dark:bg-background_dark form"
	method="POST"
	action="?/login">
	{#if form?.message}
		<p
			class="bg-accent dark:bg-accent_dark text-center text-text_secondary dark:text-text_secondary_dark text-2xl py-1">
			• {form.message} •
		</p>
	{/if}
	<div class="p-3 flex flex-col">
		<label for="email" class="font-semibold">Email:</label>
		<input
			required
			type="text"
			autoComplete="email"
			id="email"
			name="email"
			class="form_input w-full"
			value={form?.email || 'test@test.com'} />

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="current-password"
			id="password"
			name="password"
			class="form_input w-full"
			value="T3st" />
	</div>

	{#if $navigating}
		<button class="form_button">Loading</button>
	{:else}
		<button class="form_button">Continue</button>
	{/if}
</form>
