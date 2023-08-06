<script lang="ts">
	import type { IColumn, ITag, ITask } from '$lib/types';
	import PlusButton from './PlusButton.svelte';
	import Icon from './Icon.svelte';
	import Task from './Task.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { DIALOG_MANAGER, SELECTED_COLUMN } from '../routes/projects/[slug]/stores';

	export let column: IColumn;

	let dragEntered = false;
	let isDraggingTask: boolean = false;

	function handleClick() {
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.taskDialog = true;
	}

	// function handleDrop(event: DragEvent) {
	// 	event.preventDefault();
	// 	isDraggingTask = false;
	// 	const json = event.dataTransfer?.getData('text/plain') || '';

	// 	const data: {
	// 		task: ITask;
	// 		origin_column_ID: String;
	// 	} = JSON.parse(json);

	// 	const originalColumn = $CURRENT_PROJECT.columns.find(
	// 		(col) => col.id === data.origin_column_ID
	// 	)!;

	// 	const taskIndex = originalColumn.tasks?.findIndex((t) => t.id === data.task.id);
	// 	const movedTask = originalColumn.tasks?.splice(taskIndex!, 1)[0] || {};

	// 	const destinationColumn =
	// 		$CURRENT_PROJECT.columns.find((col) => col.id == column.id) || originalColumn!;

	// 	// moveTask(movedTask, originalColumn, destinationColumn);
	// 	dragEntered = false;
	// }

	function dragDropTask(event: DragEvent, task: ITask, origin_column_ID: String) {
		const data = { task, origin_column_ID };
		event.dataTransfer?.setData('text/plain', JSON.stringify(data));
		isDraggingTask = true;
		event.dataTransfer?.setDragImage(<Element>event.target, 0, 0);
	}
</script>

<div
	class="w-96 h-max m-2 flex flex-col bg-background"
	on:drop|preventDefault={() => {
		/*handleDrop*/
	}}
	on:dragover|preventDefault={() => (dragEntered = true)}
	on:dragenter
	on:dragleave={() => (dragEntered = false)}
	role="listbox"
	tabindex="0"
>
	<button
		class="text-white bg-accent flex flex-row justify-between px-3 {dragEntered && 'opacity-80'}"
	>
		<h1 class="font-sans py-3 text-3xl">{column.title}</h1>
		<button
			class="self-center active:scale-110"
			on:click={() => {
				//TODO: show column edit dialog
			}}
		>
			<Icon name={'more-horizontal'} stroke_width="2" />
		</button>
	</button>
	<div class="border border-black {dragEntered && 'border-gray-700'}">
		<section class="flex flex-col pb-6">
			<!--{ children } -->
			{#each column.tasks || [] as task (task.id)}
				<Task
					{task}
					{column}
					on:dragstart={(event) => {
						dragDropTask(event, task, column.id);
					}}
				/>
			{/each}
		</section>
		<div class="flex flex-row">
			<PlusButton size={28} bonusStyles="border-r border-t" on:click={handleClick} />
		</div>
	</div>
</div>
