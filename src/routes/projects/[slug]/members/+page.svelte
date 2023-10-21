<script lang="ts">
	import { enhance } from "$app/forms";
	import IconSearch from "../../../../Icons/Icon_search.svelte";
	import IconTrash from "../../../../Icons/Icon_trash.svelte";

	export let data: any;
</script>

<svelte:head>
	<title>Members - TRESURE</title>
</svelte:head>

<div class="flex flex-row gap-4 w-full h-full justify-center">

	<div class="flex gap-6 w-4/5 text-text_primary dark:text-text_primary_dark m-6">
		<div class="border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full text-text_primary dark:text-text_primary_dark">
			<h1 class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">Existing members:</h1>
			<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
				{#each data.project.members as member}
					<div
						class="flex gap-4 py-1 border-b border-primary group w-full items-center justify-between"
					>
						<button class="group flex-2 pr-6 group-hover:block hidden"
							><IconTrash styles="group-hover:scale-105" /></button
						>
						<div class="flex gap-4 flex-1">
							<span class="font-semibold">{member.username}</span>
							<span class="font-semibold">{member.email}</span>
						</div>
						<div class="flex gap-3 flex-2">
							<button class="w-5 h-5 rounded-full bg-gray-400" />
							<button class="w-5 h-5 rounded-full bg-gray-400" />
							<button class="w-5 h-5 rounded-full bg-gray-400" />
						</div>
					</div>
				{/each}
			</div>
		</div>
		<div class="border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full">
			<h1 class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">Invite members</h1>
			<form class="form px-3 py-2 border-none" method="POST" use:enhance>
				<div class="flex gap-2 items-center justify-between">
					<input
						placeholder="Member email"
						type="text"
						id="searchMember"
						name="searchmember"
						class="form_input"
					/>
					<button type="button"
						class="bg-background group dark:bg-background_dark text-text_primary dark:text-text_primary_dark border p-1 select-none font-semibold border-primary dark:border-primary_dark transition-colors"
					>
						<IconSearch styles="h-6 w-6 group group-active:scale-110" />
					</button>
				</div>
			</form>
		</div>
	</div>


	<!-- <div class="border-primary border bg-white">
		<div class="flex flex-col">
			<form class="form px-3 py-2 border-none" method="POST" use:enhance>
				<div class="flex gap-2 items-center justify-between">
					<input
						placeholder="Search for new members by entering their email"
						type="text"
						id="searchMember"
						name="searchmember"
						class="form_input"
					/>
					<button type="button"
						class="p-1 group border bg-background w-max h-max cursor-pointer group border-background hover:border-gray-400 focus:border-primary"
					>
						<IconSearch styles="h-6 w-6 group group-active:scale-110" />
					</button>
				</div>
			</form>
			<div class="flex flex-col gap-4 px-3 bg-secondary">
				<h1>Search results:</h1>
				<div class="flex flex-col gap-3">
					<div class="flex gap-4 flex-1">
						<span class="font-semibold">member.username</span>
						<span class="font-semibold">member.email</span>
						<button class="hover:underline underline-offset-2">Add</button>
					</div>
				</div>
			</div>
		</div>
		<div class="flex flex-col grap-4 pt-6 px-3">
			<span>Existing members:</span>
			<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
				{#each data.project.members as member}
					<div
						class="flex gap-4 py-1 border-b border-primary w-full text-primary items-center justify-between"
					>
						<button class="group flex-2 pr-6"
							><IconTrash styles="group-hover:scale-105" /></button
						>
						<div class="flex gap-4 flex-1">
							<span class="font-semibold">{member.username}</span>
							<span class="font-semibold">{member.email}</span>
						</div>
						<div class="flex gap-3 flex-2">
							<button class="w-5 h-5 rounded-full bg-gray-400" />
							<button class="w-5 h-5 rounded-full bg-gray-400" />
							<button class="w-5 h-5 rounded-full bg-gray-400" />
						</div>
					</div>
				{/each}
			</div>
		</div>
		<button class="form_button">Save changes</button>
	</div> -->


</div>
