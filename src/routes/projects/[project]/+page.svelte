<script lang="ts">
	import { onMount } from 'svelte';
	import Column from '../../../components/Column.svelte';
	import TaskDialog from '../../../components/TaskDialog.svelte';
	import { CURRENT_PROJECT as CURRENT_PROJECT, DIALOG_MANAGER } from '../../../components/store';
	import type { IColumn, IProject, ITask } from '../../../types';
	import Icon from '../../../components/Icon.svelte';
	import { showColumnDialog, showProjectDialog } from '../../../functions';
	import ProjectDialog from '../../../components/ProjectDialog.svelte';
	import ColumnDialog from '../../../components/ColumnDialog.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	CURRENT_PROJECT.set(data.project);
</script>

<div class="p-4">
	<div class="flex flex-row items-center gap-4">
		<a href="/" class="hover:scale-105">
			<Icon name="direction-left" stroke_width="1.5" styles="w-12 h-12 p-2" />
		</a>
		<div class="text-2xl font-semibold">{$CURRENT_PROJECT.title}</div>
		<button on:click={showProjectDialog} class="active:scale-105">
			<Icon name={'more-horizontal'} stroke_width="2" styles="w-12 h-12 p-2" />
		</button>
	</div>
	<hr class="w-1/3 border-t-1 border-black self-center" />
</div>

<ColumnDialog />
<ProjectDialog />
<TaskDialog />

<div class="flex flex-row justify-center">
	{#each $CURRENT_PROJECT.columns || [] as column, i}
		<Column {column} />
	{/each}
</div>

<button
	class="bg-orange-200 font-bold text-gray-600 border border-gray-600"
	on:click={() => console.log($CURRENT_PROJECT.columns)}
>
	debug current project</button
>
