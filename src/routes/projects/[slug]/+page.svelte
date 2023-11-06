<script lang="ts">
	import Column from '../../../components/Column.svelte';
	import ColumnDialog from '../../../components/dialogs/ColumnDialog.svelte';
	import { PROJECT_ID } from './stores';
	import { invalidateAll } from '$app/navigation';
	import CardDialog from '../../../components/dialogs/CardDialog.svelte';
	import MemberDialog from '../../../components/dialogs/MemberDialog.svelte';
	import ProjectContextMenu from '../../../components/ProjectContextMenu.svelte';

	export let data: any;

	$PROJECT_ID = data.project.id;

	async function refreshColumns() {
		invalidateAll();
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<ProjectContextMenu />

<ColumnDialog />
<CardDialog />
<MemberDialog members={data.project.members} />

<div
	class="max-w-7xl w-full self-center sm:flex-row sm:items-start items-center flex-col flex h-full sm:justify-center p-6 gap-4">
	{#each data.project.columns as column}
		<Column {column} on:taskMoved={refreshColumns} />
	{/each}
</div>
