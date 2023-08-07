<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import Column from '../../../components/Column.svelte';
	import TaskDialog from '../../../components/TaskDialog.svelte';
	import type { IColumn, IProject, ITask } from '$lib/types';
	import Icon from '../../../components/Icon.svelte';
	import ProjectDialog from '../../../components/ProjectDialog.svelte';
	import ColumnDialog from '../../../components/ColumnDialog.svelte';
	import type { PageData } from './$types';
	import type { Prisma } from '@prisma/client';
	import { SELECTED_PROJECT } from './stores';
	import { json } from '@sveltejs/kit';

	export let data: PageData;

	function isIProject(obj: any): obj is IProject {
		return (
			obj &&
			typeof obj.id === 'string' &&
			typeof obj.title === 'string' &&
			Array.isArray(obj.columns)
		);
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
			<Icon name="direction-left" stroke_width="1.5" styles="w-12 h-12 p-2" />
		</a>
		<div class="text-2xl font-semibold">{$SELECTED_PROJECT && $SELECTED_PROJECT.title}</div>
		<button on:click={() => {}} class="active:scale-105">
			<Icon name={'more-horizontal'} stroke_width="2" styles="w-12 h-12 p-2" />
		</button>
	</div>
	<hr class="w-1/3 border-t-1 border-black self-center" />
</div>

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
