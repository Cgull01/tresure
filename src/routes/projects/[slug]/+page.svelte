<script lang="ts">
	import Column from '../../../components/Column.svelte';
	import { PROJECT_ID } from './stores';
	import { invalidateAll } from '$app/navigation';
	import type { IProject, IUser } from '$lib/types';
	import { createEventDispatcher, setContext } from 'svelte';
	import AddCardDialog from '../../../components/dialogs/AddCardDialog.svelte';
	import EditCardDialog from '../../../components/dialogs/EditCardDialog.svelte';
	import ContextMenu from '../../../components/ContextMenu.svelte';
	import { enhance } from '$app/forms';
	import IconPlus from '../../../Icons/Icon_plus.svelte';

	export let data: { project: IProject; user: IUser };
	let showContext: boolean = false;

	$PROJECT_ID = data.project.id;

	setContext('project_id', data.project.id);
	setContext('project', data.project);
	setContext('user_memberId', data.user.member_id);

	async function refreshColumns() {
		invalidateAll();
	}

	function handleAddColumn({ formData }: any) {
		formData.set('project_id', data.project.id);
		showContext = false;
	}
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<ContextMenu bind:visible={showContext}>
	<ul
		class="shadow-md border border-accent dark:border-accent_dark w-full bg-background dark:bg-background_dark">
		<li
			class="py-1 hover:bg-primary dark:hover:bg-primary_dark text-text_primary dark:text-text_primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-primary dark:border-primary_dark">
			<form action="?/addColumn" method="POST" use:enhance={handleAddColumn}>
				<button class="flex gap-2"> <IconPlus /> Add column</button>
			</form>
		</li>
	</ul>
</ContextMenu>

<AddCardDialog />
<EditCardDialog />

<div
	class="w-full self-center sm:flex-row sm:items-start items-center flex-col flex h-full sm:justify-center p-6 gap-4 overflow-x-auto"
	on:contextmenu={() => (showContext = true)}>
	{#each data.project.columns as column}
		<Column {column} on:taskMoved={refreshColumns} />
	{/each}
</div>
