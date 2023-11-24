<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import { enhance } from '$app/forms';
	import IconTrash from '../Icons/Icon_trash.svelte';
	import IconEdit from '../Icons/Icon_edit.svelte';
	import type { ICard } from '$lib/types';
	import IconClock from '../Icons/Icon_clock.svelte';
	import { pad } from '$lib/functions';
	import { SELECTED_COLUMN, USER_ROLES } from '../routes/projects/[slug]/stores';
	import IconCheck from '../Icons/Icon_check.svelte';
	import IconPlus from '../Icons/Icon_plus.svelte';

	export let card: ICard;

	let show_deletion_menu = false;
	let column_id = getContext('column_id');

	console.warn(card);
	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('edit', {
			task: card
		});
	}

	async function handleCompleteTask({ formData, event }: any) {
		if (formData.get('status_approved') != null) {
			card.approvalDate = new Date();
		} else {
			card.approvalDate = undefined;
		}

		formData.set('task', JSON.stringify({ ...card, columnId: column_id }));
	}
	async function handleMarkReviewTask({ formData, event }: any) {
		if (formData.get('status_review') != null) {
			card.completionDate = new Date();
		} else {
			card.completionDate = undefined;
		}

		formData.set('task', JSON.stringify({ ...card, columnId: column_id }));
	}
</script>

<div
	draggable="true"
	on:dragstart
	on:contextmenu|preventDefault|stopPropagation={() => (show_deletion_menu = !show_deletion_menu)}
	on:mouseleave={() => {
		show_deletion_menu = false;
	}}
	role="listitem"
	class="group/card select-none hover:shadow-2xl hover:brightness-105 dark:hover:brightness-125 bg-background dark:bg-background_dark hover:cursor-grab active:cursor-grabbing transition-shadow p-3">
	{#if show_deletion_menu}
		<div
			class="absolute top-0 left-0 w-full h-full flex flex-row gap-4 backdrop-blur-md items-center justify-between px-6">
			{#if $USER_ROLES.taskMaster || $USER_ROLES.admin}
				<form
					method="POST"
					action="?/editTask"
					use:enhance={handleCompleteTask}
					class="flex items-center justify-center">
					<input class="hidden" type="number" value={card.id} name="task_id" />
					{#if card.approvalDate}
						<button
							name="status_not_approved"
							class="flex gap-2 group/incomplete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
							<IconPlus styles="group-active/incomplete:scale-95 rotate-45" />
							Incomplete
						</button>
					{:else}
						<button
							name="status_approved"
							class="flex gap-2 group/complete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
							<IconCheck styles="group-active/complete:scale-95" />
							Complete
						</button>
					{/if}
				</form>
			{:else if !card.approvalDate}
				<form
					method="POST"
					action="?/editTask"
					use:enhance={handleMarkReviewTask}
					class="flex items-center justify-center">
					<input class="hidden" type="number" value={card.id} name="task_id" />
					{#if card.completionDate}
						<button
							name="status_noreview"
							class="flex gap-2 group/incomplete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
							<IconPlus styles="group-active/incomplete:scale-95 rotate-45" />
							Not Ready for Review
						</button>
					{:else}
						<button
							name="status_review"
							class="flex gap-2 group/complete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
							<IconCheck styles="group-active/complete:scale-95" />
							Mark for Review
						</button>
					{/if}
				</form>
			{/if}
			{#if $USER_ROLES.taskMaster || $USER_ROLES.admin}
				<form
					method="POST"
					action="?/deleteTask"
					use:enhance
					class="flex items-center justify-center">
					<input class="hidden" type="number" value={card.id} name="task_id" />
					<button
						class="flex gap-2 group/delete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
						<IconTrash styles="group-active/delete:scale-95" />
						Delete
					</button>
				</form>
			{/if}
		</div>
	{/if}

	<div class="flex flex-row justify-between">
		<div class="flex flex-row text-secondary flex-wrap gap-2 font-semibold overflow-x-auto">
			{#each card.tags || [] as tag}
				<div class={`w-max h-max px-1 bg-${tag.color}`}>
					{tag.tag}
				</div>
			{/each}
		</div>

		<button
			class="w-6 h-6 cursor-pointer hover:scale-105 active:scale-100 text-text_primary dark:text-text_primary_dark"
			on:click={handleClick}>
			<IconEdit styles="group-hover/card:block hidden transition-all" />
		</button>
	</div>
	<div class="flex flex-row justify-between pb-2">
		<div class="flex flex-col items-start w-full text-text_primary dark:text-text_primary_dark">
			{#if card.title}
				<div
					class="text-2xl font-semibold text-ellipsis overflow-hidden w-full text-text_primary dark:text-text_primary_dark">
					{card.title}
				</div>
			{/if}
			{#if card.details}
				<div class="{card.title ? 'text-base' : 'text-xl'} w-full overflow-hidden text-ellipsis">
					{card.details}
				</div>
			{/if}
		</div>
	</div>
	<div class="flex gap-2 ml-auto w-max pb-2 text-text_primary dark:text-text_primary_dark">
		{#if card.approvalDate}
			<i class="text-accent font-semibold dark:text-accent_dark"
				>Completed {pad(card.approvalDate.getMonth() + 1)}/{pad(card.approvalDate.getDate())}</i>
		{:else if card.completionDate}
			<p class="text-accent font-semibold dark:text-accent_dark"
				>Waiting approval {pad(card.completionDate.getMonth() + 1)}/{pad(
					card.completionDate.getDate()
				)}</p>
		{:else if card.dueDate}
			<IconClock />
			<span>{pad(card.dueDate.getMonth() + 1)}/{pad(card.dueDate.getDate())}</span>
		{/if}
	</div>

	<hr class="w-full border-t-1 border-primary dark:border-primary_dark self-center" />
</div>
