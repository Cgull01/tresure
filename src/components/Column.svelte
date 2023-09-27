<script lang="ts">
	import type { IColumn } from '$lib/types';
	import PlusButton from './PlusButton.svelte';
	import Card from './Card.svelte';
	import { createEventDispatcher } from 'svelte';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { page } from '$app/stores';
	import IconMoreHorizontal from '../Icons/Icon_more_horizontal.svelte';


	export let column: IColumn;

	let drag_entered = false;
	let is_dragging_task: boolean = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.task_dialog = true;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();
		is_dragging_task = false;
		const task_ID = event.dataTransfer?.getData('text/plain') || '';

		const destinationColumn_ID = column.id;
		const task_position = column.cards?.length;

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

		drag_entered = false;
	}

	function dragDropTask(event: DragEvent, task_ID: string) {
		event.dataTransfer?.setData('text/plain', task_ID);
		is_dragging_task = true;
		// event.dataTransfer?.setDragImage(<Element>event.target, 0, 0);
	}

	function handleEdit(event: CustomEvent) {
		$SELECTED_TASK = event.detail.task;
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.task_dialog = true;
	}
	
</script>

<div
	class="w-96 h-max m-2 flex flex-col bg-background"
	on:drop|preventDefault={(event) => {
		handleDrop(event);
	}}
	on:dragover|preventDefault={() => (drag_entered = true)}
	on:dragenter
	on:dragleave={() => (drag_entered = false)}
	role="listbox"
	tabindex="0">
	<button
		class="text-white bg-accent flex flex-row justify-between px-3 {drag_entered && 'opacity-80'} w-full">
		<h1 class="font-sans py-3 text-3xl text-ellipsis overflow-hidden">{column.title}</h1>
		<button
			class="self-center active:scale-110"
			on:click={() => {
				$DIALOG_MANAGER.column_dialog = true;
				$SELECTED_COLUMN = column;
			}}>
			<IconMoreHorizontal />
		</button>
	</button>
	<div class="border border-black {drag_entered && 'border-gray-700'}">
		<section class="flex flex-col pb-6">
			{#each column.cards || [] as card (card.id)}
				<Card
					card={card}
					on:dragstart={(event) => {
						dragDropTask(event, card.id);
					}}
					on:edit={handleEdit} />
			{/each}
		</section>
		<div class="flex flex-row">
			<PlusButton styles="border-r border-t" on:click={handleClick} />
		</div>
	</div>
</div>
