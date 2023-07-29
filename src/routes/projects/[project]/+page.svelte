<script lang="ts">
	import { onMount } from 'svelte';
	import Column from '../../../components/Column.svelte';
	import TaskDialog from '../../../components/TaskDialog.svelte';
	import { CURRENT_PROJECT as CURRENT_PROJECT, DIALOG_IS_OPEN } from '../../../components/store';
	import type { IColumn, IProject, ITask } from '../../../types';
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
	<div class="flex flex-row items-center">
		<div class="w-12 h-12 p-2">
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
			</svg>
		</div>
		<div class="text-2xl font-semibold">{$CURRENT_PROJECT.title}</div>
		<div class="w-12 h-12 p-2">
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
				/>
			</svg>
		</div>
	</div>
	<hr class="w-1/3 border-t-1 border-black self-center" />
</div>

<TaskDialog />

<div class="flex flex-row justify-center">
	{#each $CURRENT_PROJECT.columns || [] as column, i}
		<Column {column} />
	{/each}
</div>
