<script lang="ts">
	import type { ICard, IColumn } from '$lib/types';
	import PlusButton from './PlusButton.svelte';
	import Card from './Card.svelte';
	import { createEventDispatcher, setContext } from 'svelte';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { page } from '$app/stores';
	import IconMoreHorizontal from '../Icons/Icon_more_horizontal.svelte';
	import { readable } from 'svelte/store';

	export let column: IColumn;

	let drag_entered = false;
	let is_dragging_card: boolean = false;

	// column.cards?.sort((cardA, cardB) => cardA.position - cardB.position);

	const dispatch = createEventDispatcher();

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
		$SELECTED_TASK = {};
		$DIALOG_MANAGER.task_dialog = true;
	}

	function handleEditCard(event: CustomEvent) {
		$SELECTED_TASK = {...event.detail.task};
		$SELECTED_COLUMN = column;
		$DIALOG_MANAGER.task_dialog = true;
	}
</script>

<div
	class="w-full h-max flex flex-col bg-none dark:bg-background_dark"
	on:drop|preventDefault={(event) => {
		handleDrop(event);
	}}
	on:dragover|preventDefault={() => (drag_entered = true)}
	on:dragenter
	on:dragleave={() => (drag_entered = false)}
	role="listbox"
	tabindex="0">
	<button
		on:click={() => {}}
		class="text-text_secondary dark:text-text_secondary_dark bg-primary dark:bg-primary_dark flex flex-row justify-between px-3 {drag_entered &&
			'opacity-80'} w-full">
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
	<div
		class="border border-primary dark:border-primary_dark bg-background dark:bg-background_dark {drag_entered &&
			'brightness-105'}">
		<section class="flex flex-col pb-6">
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
