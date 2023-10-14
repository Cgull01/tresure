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
	import NavBar from '../../../components/NavBar.svelte';
	import IconEdit from '../../../Icons/Icon_edit.svelte';
	import IconTresureLogo from '../../../Icons/Icon_TresureLogo.svelte';
	import IconPlus from '../../../Icons/Icon_plus.svelte';
	import IconGroup from '../../../Icons/Icon_group.svelte';
	import MemberDialog from '../../../components/dialogs/MemberDialog.svelte';

	export let data: any;

	let showMembers = false;

	$PROJECT_ID = data.project.id;

	function showProjectDialog() {
		$DIALOG_MANAGER.project_dialog = true;
	}

	async function refreshColumns() {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<div class="h-screen w-screen flex flex-col">
	<div
		class="flex flex-row py-3 items-center justify-between w-full bg-secondary border-b border-primary pr-16"
	>
		<div class="flex gap-2 items-center pl-6">
			<a href="/" class="cursor-pointer pr-12">
				<IconTresureLogo styles="fill-primary" />
			</a>
			<a href="/projects" class="hover:scale-105">
				<IconDirectionLeft styles="w-12 h-12" />
			</a>
			<h1 class="text-3xl font-semibold">
				{data.project.title}
			</h1>
			<button on:click={showProjectDialog} class="active:scale-105">
				<IconEdit styles="w-12 h-12 p-2" />
			</button>
		</div>
		<LogOutButton />
	</div>

	<!-- <ProjectContextMenu /> -->

	<ColumnDialog />
	<ProjectDialog project_title={data.project.title} />
	<CardDialog />
	<MemberDialog members={data.project.members} />

	<div class="flex flex-row gap-4 background-pattern h-full">
		<div
			class="sm:flex-row flex-1 sm:items-start items-center flex-col flex h-full pt-16 sm:justify-center overflow-y-auto"
		>
			{#each data.project.columns as column}
				<Column {column} on:taskMoved={refreshColumns} />
			{/each}
		</div>

		<div class="flex flex-row">
			{#if showMembers}
				<div
					class="w-max h-full border-l flex-2 border-primary bg-zinc-300
			flex flex-col gap-3 p-3 px-6"
				>
					<flex class="flex flex-col gap-2 p-2 items-center border-b border-primary">
						<button
							on:click={() => {
								$DIALOG_MANAGER.member_dialog = true;
							}}
							class="flex flex-row gap-4 hover:underline underline-offset-2"
						>
							<IconSettings />
							<h1>Manage members</h1>
						</button>
					</flex>
					<div class="flex flex-col gap-4">
						{#each data.project.members as member}
							<div class="flex flex-col py-1 border-b border-primary">
								<span class="font-semibold">{member.username}</span>
							</div>
						{/each}
					</div>
				</div>
			{/if}
			<div
				class="w-max h-full border-l flex-2 border-primary bg-zinc-300
			flex flex-col gap-3 p-3 px-6"
			>
				<button class="flex flex-col gap-2 border-b border-primary p-2 items-center">
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
						class="flex flex-row gap-2 group"
					>
						<IconGroup />
						<span class="group-hover:underline group-hover:underline-offset-2">see members</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
