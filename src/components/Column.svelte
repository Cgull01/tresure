<script lang="ts">
	import type { IColumn } from '$lib/types';
	import PlusButton from './PlusButton.svelte';
	import Icon from './Icon.svelte';
	import Task from './Task.svelte';
	import { createEventDispatcher } from 'svelte';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { page } from '$app/stores';

	export let column: IColumn;

	let dragEntered = false;
	let isDraggingTask: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.taskDialog = true;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		isDraggingTask = false;
		const task_ID = event.dataTransfer?.getData('text/plain') || '';

		const destinationColumn_ID = column.id;
		const task_position = column.tasks?.length;

		await fetch(`/projects/${$page.params}`, {
			method: 'PATCH',
			body: JSON.stringify({
				task_ID,
				destinationColumn_ID,
				task_position
			}),
			headers: {
				'content-type': 'application/json'
			}
		});

		dispatch('taskMoved');

		dragEntered = false;
	}

	function dragDropTask(event: DragEvent, task_ID: string) {
		event.dataTransfer?.setData('text/plain', task_ID);
		isDraggingTask = true;
		// event.dataTransfer?.setDragImage(<Element>event.target, 0, 0);
	}

	function handleEdit(event: CustomEvent) {
		$SELECTED_TASK = event.detail.task;
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.taskDialog = true;
	}
</script>

<div
	class="w-96 h-max m-2 flex flex-col bg-background"
	on:drop|preventDefault={(event) => {
		handleDrop(event);
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
				$DIALOG_MANAGER.columnDialog = true;
				$SELECTED_COLUMN = column;
			}}
		>
			<Icon name={'more-horizontal'} stroke_width="2" />
		</button>
	</button>
	<div class="border border-black {dragEntered && 'border-gray-700'}">
		<section class="flex flex-col pb-6">
			{#each column.tasks || [] as task (task.id)}
				<Task
					{task}
					on:dragstart={(event) => {
						dragDropTask(event, task.id);
					}}
					on:edit={handleEdit}
				/>
			{/each}
		</section>
		<div class="flex flex-row">
			<PlusButton size={28} bonusStyles="border-r border-t" on:click={handleClick} />
		</div>
	</div>
</div>
