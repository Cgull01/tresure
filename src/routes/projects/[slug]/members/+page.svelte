<script lang="ts">
	import { enhance } from '$app/forms';
	import IconSearch from '../../../../Icons/Icon_search.svelte';
	import IconTrash from '../../../../Icons/Icon_trash.svelte';
	import type { ActionData } from './$types';
	import type { IProject, IUser } from '$lib/types';
	import { USER_ROLES } from '../stores';

	export let data: { project: IProject; user: IUser; user_roles: any };
	export let form: ActionData;

</script>

<svelte:head>
	<title>Members - TRESURE</title>
</svelte:head>

<div class="flex flex-row gap-4 w-full h-full justify-center">
	<div class="grid grid-cols-3 gap-6 w-4/5 text-text_primary dark:text-text_primary_dark m-6">
		<div
			class="{$USER_ROLES.admin
				? 'col-span-2'
				: 'col-span-3'} border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full text-text_primary dark:text-text_primary_dark">
			<h1
				class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">
				Existing members:
			</h1>
			<div class="flex flex-col gap-4 px-3 py-3 justify-between">
				{#each data.project.members as member (member.id)}
					<div
						class="flex gap-4 py-1 border-b border-primary dark:border-primary_dark w-full items-center justify-between">
						{#if $USER_ROLES.admin}
							{#if member.user.email != data.user.email}
								<form method="POST" use:enhance action="?/removeMember">
									<input type="hidden" name="member_id" value={member.id} />
									<button class="group flex-2"><IconTrash styles="group-hover:scale-105" /></button>
								</form>
							{:else}
								<span class="text-text_primary dark:text-text_primary_dark">(you)</span>
							{/if}
						{:else if member.user.email === data.user.email}
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
								class="w-full px-2 border {$USER_ROLES.admin
									? 'border-primary dark:border-primary_dark'
									: 'border-none'} text-text_primary {member.roles.admin === true
									? 'bg-accent dark:bg-accent_dark dark:text-text_secondary_dark'
									: 'bg-background dark:bg-background_dark dark:text-text_primary_dark'}">
								Admin
							</button>
							<button
								name="role_taskMaster"
								title="task editing privileges"
								value="2"
								class="w-full px-2 border {$USER_ROLES.admin
									? 'border-primary dark:border-primary_dark'
									: 'border-none'} text-text_primary {member.roles.taskMaster === true
									? 'bg-accent dark:bg-accent_dark dark:text-text_secondary_dark'
									: 'bg-background dark:bg-background_dark dark:text-text_primary_dark'}">
								TaskMaster
							</button>
						</form>
					</div>
				{/each}
			</div>
		</div>
		{#if $USER_ROLES.admin}
			<div
				class="col-span-1 border bg-background dark:bg-background_dark border-primary dark:border-primary_dark w-full h-full">
				<h1
					class="border-b border-primary dark:border-primary_dark w-full py-3 px-2 text-text_secondary dark:text-text_secondary_dark text-2xl bg-primary dark:bg-primary_dark">
					Invite members
				</h1>
				<form class="form px-3 py-2 border-none pb-6" method="POST" use:enhance action="?/findUser">
					<div class="flex gap-2 items-center justify-between">
						<input
							required
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
					<p class="px-3 text-accent dark:text-accent_dark font-bold text-xl">
						• Error: {form.error} •
					</p>
				{:else if form?.user}
					<form
						class="flex gap-4 w-4/5 m-auto px-6 py-1 border-y border-primary dark:border-primary_dark items-center"
						method="POST"
						use:enhance
						action="?/addMember">
						<input type="hidden" name="user_id" class="form_input w-full" value={form.user.id} />
						<p>{form.user.email}</p>
						<p>{form.user.username}</p>
						{#if data.project.members.some((m) => m.user.email === form?.user.email)}
							<div
								class="ml-auto p-1">
								( Already Invited )
							</div>
						{:else}
							<button
								class="ml-auto bg-secondary hover:bg-primary dark:hover:bg-primary_dark hover:text-secondary dark:hover:text-secondary_dark dark:bg-secondary_dark p-1 active:scale-95"
								>ADD</button>
						{/if}
					</form>
				{/if}
			</div>
		{/if}
	</div>
</div>
