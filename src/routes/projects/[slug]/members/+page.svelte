<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ResolvedServerUrls } from 'vite';
	import IconSearch from '../../../../Icons/Icon_search.svelte';
	import IconTrash from '../../../../Icons/Icon_trash.svelte';
	import type { ActionData } from './$types';
	import { Roles } from '$lib/types';

	export let data: any;
	export let form: ActionData;

	const isAdmin = (role: any) => role.role.name == Roles.Admin;
	const isTaskMaster = (role: any) => role.role.name == Roles.TaskMaster;
	console.log(data.project.members);
</script>

<svelte:head>
	<title>Members - TRESURE</title>
</svelte:head>

<div class="flex flex-row gap-4 w-full h-full justify-center">
	<div class="grid grid-cols-3 gap-6 w-4/5 text-text_primary dark:text-text_primary_dark m-6">
		<div
			class="col-span-2 border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full text-text_primary dark:text-text_primary_dark">
			<h1
				class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">
				Existing members:
			</h1>
			<div class="flex flex-col gap-4 px-3 py-3 justify-between">
				{#each data.project.members as member}
					<div
						class="flex gap-4 py-1 border-b border-primary dark:border-primary_dark w-full items-center justify-between">
						{#if member.user.email != data.user.email}
							<form method="POST" use:enhance action="?/removeMember">
								<input type="hidden" name="member_id" value={member.id} />
								<button class="group flex-2"><IconTrash styles="group-hover:scale-105" /></button>
							</form>
						{:else}
							<span class="text-text_primary dark:text-text_primary_dark">(you)</span>
						{/if}

						<div class="flex gap-4 flex-1">
							<span class="font-semibold">{member.user.username}</span>
							<span class="font-semibold">{member.user.email}</span>
						</div>
						<form class="flex gap-3 flex-2" method="POST" use:enhance action="?/editMember">
							<input type="hidden" name="member_id" value={member.id} />
							<button
								name="role_admin"
								title="task editing privileges"
								value="0"
								class="w-full px-2 border border-primary dark:border-primary_dark text-text_primary {member.roles.some(
									isAdmin
								)
									? 'bg-accent dark:bg-accent_dark dark:text-text_secondary_dark'
									: 'bg-background dark:bg-background_dark dark:text-text_primary_dark'}">
								Admin
							</button>
							<button
								name="role_taskMaster"
								title="task editing privileges"
								value="2"
								class="w-full px-2 border border-primary dark:border-primary_dark text-text_primary {member.roles.some(
									isTaskMaster
								)
									? 'bg-accent dark:bg-accent_dark dark:text-text_secondary_dark'
									: 'bg-background dark:bg-background_dark dark:text-text_primary_dark'}">
								TaskMaster
							</button>
						</form>
					</div>
				{/each}
			</div>
		</div>
		<div
			class="col-span-1 border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full">
			<h1
				class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">
				Invite members
			</h1>
			<form class="form px-3 py-2 border-none pb-6" method="POST" use:enhance action="?/findUser">
				<div class="flex gap-2 items-center justify-between">
					<input
						placeholder="Member's email"
						type="text"
						name="user_email"
						class="form_input w-full" />
					<button
						type="submit"
						class="bg-background group dark:bg-background_dark text-text_primary dark:text-text_primary_dark border p-1 select-none font-semibold border-primary dark:border-primary_dark transition-colors">
						<IconSearch styles="h-6 w-6 group group-active:scale-110" />
					</button>
				</div>
			</form>
			{#if form?.error}
				<p>Error: {form.error}</p>
			{:else if form?.user}
				<form
					class="flex gap-4 w-4/5 m-auto px-6 py-1 border-y border-primary dark:border-primary_dark items-center"
					method="POST"
					use:enhance
					action="?/addMember">
					<input type="hidden" name="user_id" class="form_input w-full" value={form.user.id} />
					<p>{form.user.email}</p>
					<p>{form.user.username}</p>
					<button
						class="ml-auto bg-secondary hover:bg-primary dark:hover:bg-primary_dark hover:text-secondary dark:hover:text-secondary_dark dark:bg-secondary_dark p-1 active:scale-95"
						>ADD</button>
				</form>
			{/if}
		</div>
	</div>
</div>
