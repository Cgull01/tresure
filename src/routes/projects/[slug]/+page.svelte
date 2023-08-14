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
	import TaskDialog from '../../../components/dialogs/TaskDialog.svelte';

	export let data: PageData;

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

	$: {
		if (data.project && isIProject(data.project)) {
			$SELECTED_PROJECT = data.project;
		} else {
			$SELECTED_PROJECT = null;
		}
	}

	async function refreshColumns() {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

{#if $SELECTED_PROJECT}
	<div class="p-4">
		<div class="flex flex-row items-center gap-4">
			<a href="/projects" class="hover:scale-105">
				<IconDirectionLeft styles="w-12 h-12 p-2" />
			</a>
			<div class="text-2xl font-semibold">{$SELECTED_PROJECT.title}</div>
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
	<TaskDialog />

	<div class="flex flex-row justify-center">
		{#each $SELECTED_PROJECT.columns as column}
			<Column {column} on:taskMoved={refreshColumns} />
		{/each}
	</div>
{/if}
