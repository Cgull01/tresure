<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Column from '../../../components/Column.svelte';
	import TaskDialog from '../../../components/TaskDialog.svelte';
	import type { IColumn, IProject, ITask } from '$lib/types';
	import ProjectDialog from '../../../components/ProjectDialog.svelte';
	import ColumnDialog from '../../../components/ColumnDialog.svelte';
	import type { PageData } from './$types';
	import type { Prisma } from '@prisma/client';
	import { DIALOG_MANAGER, SELECTED_PROJECT } from './stores';
	import { json } from '@sveltejs/kit';
	import ProjectContextMenu from '../../../components/ProjectContextMenu.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconMoreHorizontal from '../../../Icons/Icon_more_horizontal.svelte';

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
		$DIALOG_MANAGER.projectDialog = true;
	}

	$: {
		if (data.project && isIProject(data.project)) {
			$SELECTED_PROJECT = data.project;
		} else {
			$SELECTED_PROJECT = null;
		}
	}

	async function refreshColumns() {
		const response = await fetch(`/projects/${$SELECTED_PROJECT!.id}`);

		const updatedData = await response.json();

		$SELECTED_PROJECT = updatedData;
	}
</script>

<div class="p-4">
	<div class="flex flex-row items-center gap-4">
		<a href="/" class="hover:scale-105">
			<IconDirectionLeft styles="w-12 h-12 p-2" />
		</a>
		<div class="text-2xl font-semibold">{$SELECTED_PROJECT && $SELECTED_PROJECT.title}</div>
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
	{#if $SELECTED_PROJECT}
		{#each $SELECTED_PROJECT.columns as column}
			<Column {column} on:taskMoved={refreshColumns} />
		{/each}
	{/if}
</div>
