<script lang="ts">
	import type { IColumn } from '$lib/types';
	import PlusButton from './PlusButton.svelte';
	import Card from './Card.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconCheck from '../Icons/Icon_check.svelte';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconTrash from '../Icons/Icon_trash.svelte';

	export let column: IColumn;

	let drag_entered = false;
	let is_dragging_card: boolean = false;

	let editColumn: boolean = false;
	let column_input: string;

	// column.cards?.sort((cardA, cardB) => cardA.position - cardB.position);

	const dispatch = createEventDispatcher();

	function submitDialog({ formData }: any) {
		formData.set('column_id', column.id);
		formData.set('column_position', column.position);
		formData.set('column_title', column_input);

		editColumn = false;
		column.title = column_input;
	}

	async function handleDrop(event: DragEvent) {
		event.preventDefault();

		is_dragging_card = false;
		const task = event.dataTransfer?.getData('application/json') || '';

		const parsedTask = JSON.parse(task);

		if (parsedTask.columnId == column.id) {
			drag_entered = false;
			return;
		}

		parsedTask.columnId = column.id;

		await fetch(`/api`, {
			method: 'PUT',
			body: JSON.stringify(parsedTask)
		});

		dispatch('taskMoved');

		drag_entered = false;
	}

	function dragDropCard(event: DragEvent, card: any) {
		const jsonCard = JSON.stringify(card);
		event.dataTransfer?.setData('application/json', jsonCard);
		is_dragging_card = true;
	}

	function handleAddCard() {
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.createTask_dialog = true;
	}

	function handleEditCard(event: CustomEvent) {
		$SELECTED_TASK = { ...event.detail.task };
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.editTask_dialog = true;
	}
</script>

<div
	class="w-96 h-max flex flex-col bg-none dark:bg-background_dark order-{column.position}"
	on:drop|preventDefault={(event) => {
		handleDrop(event);
	}}
	on:dragover|preventDefault={() => (drag_entered = true)}
	on:dragenter
	on:contextmenu|stopPropagation|preventDefault
	on:dragleave={() => (drag_entered = false)}
	role="listbox"
	tabindex="0">
	<div
		class="text-text_secondary dark:text-text_secondary_dark bg-primary dark:bg-primary_dark px-3 h-full {drag_entered &&
			'opacity-80'} w-full">
		{#if editColumn}
			<div class="flex flex-col p-2 h-full">
				<form
					method="POST"
					action="?/editColumn"
					use:enhance={submitDialog}
					class="flex flex-col items-center italic gap-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark">
					<input
						type="text"
						class="text-xl select-auto bg-primary dark:bg-primary_dark w-full border border-secondary dark:border-secondary_dark py-2 px-1 text-secondary dark:text-secondary_dark"
						required
						id="project_title"
						name="project_title"
						bind:value={column_input} />
					<div class="flex justify-between w-full">
						<button
							type="submit"
							class="active:scale-95 px-3 border-secondary dark:border-secondary_dark border hover:scale-105">
							<IconCheck styles="m-auto" />
						</button>
						<button
							type="button"
							on:click={() => (editColumn = false)}
							class="active:scale-95 px-3 border-secondary dark:border-secondary_dark border hover:scale-105">
							<IconPlus styles="rotate-45 m-auto" />
						</button>
					</div>
				</form>
				<form
					action="?/deleteColumn"
					method="POST"
					use:enhance={submitDialog}
					class="pt-16 m-auto select-none">
					<button
						tabindex="0"
						title="Click to remove the task"
						class="cursor-pointer active:scale-90 stroke-secondary flex hover:scale-105 group">
						Delete Column
						<IconTrash styles="group-hover:scale-105 group-active:scale-90" />
					</button>
				</form>
			</div>
		{:else}
			<h1
				on:dblclick={() => {
					editColumn = true;
					column_input = column.title;
				}}
				class="font-sans py-3 w-full text-3xl overflow-hidden text-ellipsis whitespace-nowrap">
				{column.title}
			</h1>
		{/if}
		<!-- <button
			class="self-center active:scale-110"
			on:click={() => {
				$DIALOG_MANAGER.column_dialog = true;
				$SELECTED_COLUMN = column;
			}}>
			<IconMoreHorizontal />
		</button> -->
	</div>
	<div
		class="border border-primary dark:border-primary_dark bg-background dark:bg-background_dark {drag_entered &&
			'brightness-105'}">
		<section class="flex flex-col pb-6 {editColumn && 'blur-sm'}">
			{#each column.cards || [] as card (card.id)}
				<Card
					{card}
					on:dragstart={(event) => {
						dragDropCard(event, card);
					}}
					on:edit={handleEditCard} />
			{/each}
		</section>
		<div class="flex flex-row">
			<PlusButton
				styles="text-text_primary dark:text-text_primary_dark border-primary dark:border-primary_dark border-r border-t bg-background dark:bg-background_dark"
				on:click={handleAddCard} />
		</div>
	</div>
</div>
