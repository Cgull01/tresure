<script lang="ts">
	import Column from '../../../components/Column.svelte';
	import type { IProject } from '$lib/types';
	import ColumnDialog from '../../../components/dialogs/ColumnDialog.svelte';
	import type { PageData } from './$types';
	import { DIALOG_MANAGER, SELECTED_PROJECT } from './stores';
	import ProjectContextMenu from '../../../components/ProjectContextMenu.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconMoreHorizontal from '../../../Icons/Icon_more_horizontal.svelte';
	import { invalidateAll } from '$app/navigation';
	import ProjectDialog from '../../../components/dialogs/ProjectDialog.svelte';
	import CardDialog from '../../../components/dialogs/CardDialog.svelte';
	import IconAdd from '../../../Icons/Icon_add.svelte';
	import IconSettings from '../../../Icons/Icon_settings.svelte';

	export let data: any;

	console.log(data);

	function isIProject(obj: any): obj is IProject {
		return (
			obj &&
			typeof obj.id === 'string' &&
			typeof obj.title === 'string' &&
			Array.isArray(obj.columns)
		);
	}

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

	<div class="p-4">
		<div class="flex flex-row items-center gap-4">
			<a href="/projects" class="hover:scale-105">
				<IconDirectionLeft styles="w-12 h-12 p-2" />
			</a>
			<div class="text-2xl font-semibold">{data.project.title}</div>
			<button on:click={showProjectDialog} class="active:scale-105">
				<IconMoreHorizontal styles="w-12 h-12 p-2" />
				<test />
			</button>
		</div>
		<hr class="w-1/3 border-t-1 border-black self-center" />
	</div>

	<ProjectContextMenu />

	<ColumnDialog />
	<ProjectDialog />
	<CardDialog />

	<div class="flex flex-row justify-center">
		{#each data.project.columns as column}
			<Column {column} on:taskMoved={refreshColumns} />
		{/each}
	</div>

<div
	class="w-full border border-accent
 h-max fixed bottom-0 -z-10 flex flex-row gap-3 p-3">
	<div class="flex flex-col gap-2 border-r border-accent p-2 items-center">
		<IconSettings />
		<span>John Doe</span>
	</div>
	<div class="flex flex-col gap-2 border-r border-accent p-2">
		<div class="flex flex-row gap-2">
			<IconAdd styles="border border-accent p-1" />
			add collumn
		</div>
		<div class="flex flex-row gap-2">
			<IconAdd styles="border border-accent p-1" />
			see members
		</div>
	</div>
	<div class="flex flex-col gap-2 p-2">
		<div class="flex flex-row gap-2">
			<IconAdd styles="border border-accent p-1" />
			add collumn
		</div>
		<div class="flex flex-row gap-2">
			<IconAdd styles="border border-accent p-1" />
			see members
		</div>
	</div>
</div>
