<script lang="ts">
	import Column from '../../../components/Column.svelte';
	import { PROJECT_ID } from './stores';
	import { invalidateAll } from '$app/navigation';
	import ProjectContextMenu from '../../../components/ProjectContextMenu.svelte';
	import type { IProject } from '$lib/types';
	import { setContext } from 'svelte';
	import AddCardDialog from '../../../components/dialogs/AddCardDialog.svelte';
	import EditCardDialog from '../../../components/dialogs/EditCardDialog.svelte';

	export let data: {project: IProject};


	$PROJECT_ID = data.project.id;

	setContext('project_id', data.project.id);

	async function refreshColumns() {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<ProjectContextMenu />

<AddCardDialog/>
<EditCardDialog/>

<div
	class="w-full self-center sm:flex-row sm:items-start items-center flex-col flex h-full sm:justify-center p-6 gap-4 overflow-x-auto">
	{#each data.project.columns as column}
		<Column {column} on:taskMoved={refreshColumns} />
	{/each}
</div>
