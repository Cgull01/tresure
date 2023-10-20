<script lang="ts">
	import Column from '../../../components/Column.svelte';
	import type { IProject } from '$lib/types';
	import ColumnDialog from '../../../components/dialogs/ColumnDialog.svelte';
	import type { PageData } from './$types';
	import { DIALOG_MANAGER, PROJECT_ID } from './stores';
	import ProjectContextMenu from '../../../components/ProjectContextMenu.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconMoreHorizontal from '../../../Icons/Icon_more_horizontal.svelte';
	import { invalidateAll } from '$app/navigation';
	import ProjectDialog from '../../../components/dialogs/ProjectDialog.svelte';
	import CardDialog from '../../../components/dialogs/CardDialog.svelte';
	import IconAdd from '../../../Icons/Icon_add.svelte';
	import IconSettings from '../../../Icons/Icon_settings.svelte';
	import IconProfile from '../../../Icons/Icon_profile.svelte';
	import LogOutButton from '../../../components/LogOutButton.svelte';
	import IconEdit from '../../../Icons/Icon_edit.svelte';
	import IconTresureLogo from '../../../Icons/Icon_TresureLogo.svelte';
	import IconPlus from '../../../Icons/Icon_plus.svelte';
	import IconGroup from '../../../Icons/Icon_group.svelte';
	import MemberDialog from '../../../components/dialogs/MemberDialog.svelte';

	export let data: any;

	let showMembers = false;

	console.log(data);

	$PROJECT_ID = data.project.id;

	async function refreshColumns() {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<!-- <ProjectContextMenu /> -->

<ColumnDialog />
<ProjectDialog project_title={data.project.title} />
<CardDialog />
<MemberDialog members={data.project.members} />

<div class="flex flex-row gap-4 dark:bg-background_dark w-full h-full bg-radial-gradient dark:bg-radial-gradient_dark">
	<div
		class="sm:flex-row flex-1 sm:items-start items-center flex-col flex h-full pt-16 sm:justify-center overflow-y-auto">
		{#each data.project.columns as column}
			<Column {column} on:taskMoved={refreshColumns} />
		{/each}
	</div>

<!--	<div class="flex flex-row">
		{#if showMembers}
			<div
				class="w-max h-full border-l flex-2 border-primary dark:border-primary_dark bg-secondary dark:bg-secondary_dark
			flex flex-col gap-3 p-3 px-6">
				<flex class="flex flex-col gap-2 p-2 items-center border-b border-primary dark:border-primary_dark">
					<button
						on:click={() => {
							$DIALOG_MANAGER.member_dialog = true;
						}}
						class="flex flex-row gap-4 hover:underline underline-offset-2">
						<IconSettings />
						<h1>Manage members</h1>
					</button>
				</flex>
				<div class="flex flex-col gap-4">
					{#each data.project.members as member}
						<div class="flex flex-col py-1 border-b border-primary dark:border-primary_dark">
							<span class="font-semibold">{member.username}</span>
						</div>
					{/each}
				</div>
			</div>
		{/if}
		<div
			class="w-max h-full border-l flex-2 border-primary dark:border-primary_dark bg-secondary dark:bg-secondary_dark
			flex flex-col gap-3 p-3 px-6">
			<button class="flex flex-col gap-2 border-b border-primary dark:border-primary_dark p-2 items-center">
				<IconProfile />
				<span class="font-semibold">{data.user.username}</span>
			</button>
			<div class="flex flex-col gap-2 p-2">
				<div class="flex flex-row gap-2">
					<IconPlus styles="hover:scale-105 active:scale-95" />
					add collumn
				</div>
				<button
					on:click={() => {
						showMembers = !showMembers;
					}}
					class="flex flex-row gap-2 group">
					<IconGroup />
					<span class="group-hover:underline group-hover:underline-offset-2">see members</span>
				</button>
			</div>
		</div>
	</div> -->
</div>
