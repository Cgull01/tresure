<script lang="ts">
	import { onMount } from 'svelte';
	import Column from '../../../components/Column.svelte';
	import TaskDialog from '../../../components/TaskDialog.svelte';
	import { CURRENT_PROJECT as CURRENT_PROJECT, DIALOG_IS_OPEN } from '../../../components/store';
	import type { IColumn, IProject, ITask } from '../../../types';
	import Icon from '../../../components/Icon.svelte';
	let initialProjectData: IProject = {
		title: 'Untitled project',
		columns: [
			{
				id: 1,
				title: 'To do',
				tasks: [
					{
						id: 1456,
						title: 'asdf',
						details: 'details',
						tags: [
							{
								tag: 'important',
								color: 'red-700'
							},
							{
								tag: 'backend',
								color: 'blue-700'
							}
						],
						members: [
							{
								member: 'John Doe',
								avatar: 'https://placehold.co/50'
							}
						]
					}
				]
			},
			{
				id: 2,
				title: 'Doing',
				tasks: [
					{
						id: 98726,
						title: 'title',
						details: 'details',
						tags: [
							{
								tag: 'important',
								color: 'red-700'
							}
						],
						members: [
							{
								member: 'John Doe',
								avatar: 'https://placehold.co/50'
							}
						]
					}
				]
			},
			{
				id: 3,
				title: 'Done'
			}
		]
	};

	onMount(async () => {
		CURRENT_PROJECT.set(initialProjectData);
	});
</script>

<div class="p-4">
	<div class="flex flex-row items-center gap-4">
		<Icon name="direction-left" stroke_width="1.5" styles="w-12 h-12 p-2" />
		<div class="text-2xl font-semibold">{$CURRENT_PROJECT.title}</div>
		<Icon name={'more-horizontal'} stroke_width="2" styles="w-12 h-12 p-2" />
	</div>
	<hr class="w-1/3 border-t-1 border-black self-center" />
</div>

<TaskDialog />

<div class="flex flex-row justify-center">
	{#each $CURRENT_PROJECT.columns || [] as column, i}
		<Column {column} />
	{/each}
</div>

<button on:click={() => console.log($CURRENT_PROJECT.columns)}> aaaaaaaa</button>
