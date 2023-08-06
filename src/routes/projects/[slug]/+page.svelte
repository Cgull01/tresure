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

	let projectColumns: IColumn[] = [];

	if (!data.project) {
		throw new Error('no data fetched');
	}

	$: {
		projectColumns = [];
		if (data.project)
			data.project.columns.forEach((col) => {
				let tasks: ITask[] = [];
				col.tasks.forEach((task) => {
					tasks.push({
						id: task.id,
						title: task.title || '',
						details: task.details || '',
						dueDate: task.dueDate,
						tags: task.tags as { color: string; tag: string }[]
					});
				});

				projectColumns.push({
					id: col.id,
					title: col.title,
					projectId: col.projectId,
					tasks: tasks
				});
			});
		let project: IProject = {
			id: data.project!.id,
			title: data.project!.title,
			columns: projectColumns
		};

		$SELECTED_PROJECT = project;
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
		{#each $SELECTED_PROJECT.columns as column, i}
			<Column {column} />
		{/each}
	{/if}
</div>
