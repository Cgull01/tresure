<script lang="ts">
	import Task from './Task.svelte';
	import type { IColumn, ITag, ITask } from '../types';
	import PlusButton from './PlusButton.svelte';
	import { CURRENT_COLUMN, CURRENT_PROJECT, DIALOG_IS_OPEN } from './store';
	import { showDialog, moveTask } from '../functions';
	import Icon from './Icon.svelte';
	export let column: IColumn;
	function handleClick() {
		showDialog({}, column);
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		const json = event.dataTransfer?.getData('text/plain') || '';

		const data: {
			task: ITask;
			origin_column_ID: Number;
		} = JSON.parse(json);

		const originalColumn = $CURRENT_PROJECT.columns.find(
			(col) => col.id === data.origin_column_ID
		)!;

		const taskIndex = originalColumn.tasks?.findIndex((t) => t.id === data.task.id);
		const movedTask = originalColumn.tasks?.splice(taskIndex!, 1)[0] || {};

		const destinationColumn =
			$CURRENT_PROJECT.columns.find((col) => col.id == column.id) || originalColumn!;

		moveTask(movedTask, originalColumn, destinationColumn);
	}

	function dragDropTask(event: DragEvent, task: ITask, origin_column_ID: Number) {
		const data = { task, origin_column_ID };
		event.dataTransfer?.setData('text/plain', JSON.stringify(data));

		// event.dataTransfer?.setDragImage(<Element>event.target, 0, 0);
	}
</script>

<div
	class="w-96 h-max m-2 flex flex-col bg-background"
	on:drop|preventDefault={handleDrop}
	on:dragover|preventDefault
	on:dragenter
	on:dragleave
	role="listbox"
	tabindex="0"
>
	<button class="text-white bg-accent flex flex-row justify-between px-3">
		<h1 class="font-sans py-3 text-3xl">{column.title}</h1>
		<div class="self-center">
			<Icon name={'more-horizontal'} stroke_width="2" />
		</div>
	</button>
	<div class="border border-black">
		<section class="flex flex-col pb-6">
			<!--{ children } -->
			{#each column.tasks || [] as task (task.id)}
				<Task {task} {column} on:dragstart={(event) => dragDropTask(event, task, column.id)} />
			{/each}
		</section>
		<div class="flex flex-row">
			<PlusButton size={28} bonusStyles="border-r border-t" on:click={handleClick} />
		</div>
	</div>
</div>
