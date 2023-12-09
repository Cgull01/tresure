<script lang="ts">
	import { enhance } from '$app/forms';

	export let form: any;
</script>

<form
	class="flex flex-col text-text_primary dark:text-text_primary_dark bg-background dark:bg-background_dark form"
	method="POST"
	action="?/register"
	use:enhance>
	{#if form?.message}
		<p
			class="bg-accent dark:bg-accent_dark text-center text-text_secondary dark:text-text_secondary_dark text-2xl py-1">
			• {form.message} •
		</p>
	{/if}

	<div class="p-3 flex flex-col">
		<label for="username" class="font-semibold">Username:</label>
		<input
			required
			type="text"
			autoComplete="username"
			id="username"
			name="username"
			class="form_input w-full" />
		<label for="email" class="font-semibold">Email:</label>

		<input
			required
			type="email"
			autoComplete="email"
			id="email"
			name="email"
			class="form_input w-full" />

		<label for="password" class="font-semibold">Password:</label>
		<input
			required
			type="password"
			autoComplete="new-password"
			id="password"
			name="password"
			class="form_input w-full" />

		<label for="RepeatPassword" class="font-semibold">Repeat Password:</label>
		<input
			required
			type="password"
			autoComplete="new-password"
			id="RepeatPassword"
			name="RepeatPassword"
			class="form_input w-full" />
	</div>
	<button class="form_button">Continue</button>
</form>
