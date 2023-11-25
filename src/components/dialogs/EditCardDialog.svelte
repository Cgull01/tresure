<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import type { ITag, ICard, IProject } from '$lib/types';
	import {
		DIALOG_MANAGER,
		SELECTED_TASK,
		SELECTED_COLUMN
	} from '../../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import IconColors from '../../Icons/Icon_colors.svelte';
	import PlusButton from '../PlusButton.svelte';
	import { invalidateAll } from '$app/navigation';
	import IconPlus from '../../Icons/Icon_plus.svelte';
	import { pad } from '$lib/functions';
	import ColorSelect from '../ColorSelect.svelte';
	import IconGroup from '../../Icons/Icon_group.svelte';

	const TAG_COLORS = [
		'red-700',
		'blue-700',
		'green-700',
		'yellow-700',
		'purple-700',
		'pink-700',
		'orange-700',
		'indigo-700'
	];

	$: card = <ICard>$SELECTED_TASK;

	let formated_dueDate: any;
	$: if (card) {
		formated_dueDate = card.dueDate
			? `${card.dueDate.getFullYear()}-${pad(card.dueDate.getMonth() + 1)}-${pad(
					card.dueDate.getDate()
			  )}`
			: ' ';

	}

	$: date_input = formated_dueDate;

	let selected_members: Array<Number> = [];
	// if($SELECTED_TASK)
	// {
	// 	console.warn(selected_members);
	// }

	SELECTED_TASK.subscribe((task)=> {
		if(task)
		selected_members = task.assignedMembers?.map(m => m.id) || [];

	})


	let tag_input: ITag = { tag: '', color: TAG_COLORS[0] };
	let dialog_ref: HTMLDialogElement;

	let select_members: boolean = false;

	let projectContext: IProject = getContext('project');

	let members = projectContext.members;

	function addTag() {
		if (tag_input.tag.length === 0) return;

		const newTag = { ...tag_input };

		card.tags = card ? [...(card.tags || []), newTag] : [newTag];

		tag_input.tag = '';
	}

	function removeTag(index: number) {
		card.tags = card.tags?.filter((t: any, i: number) => i != index);
	}

	function closeDialog() {
		$DIALOG_MANAGER.editTask_dialog = false;
		$SELECTED_TASK = null;

		tag_input = { tag: '', color: TAG_COLORS[0] };
		select_members = false;
	}

	async function onSubmitDialog({ formData }: any) {
		if (!card.title && !card.details) {
			throw new Error('no title or no details');
		}

		card.assignedMembers = selected_members.map((m: any) => ({
			id: m
		}));

		card.dueDate = new Date(date_input);

		formData.set('task', JSON.stringify(card));

		await fetch(`/api`, {
			method: 'PUT',
			body: JSON.stringify({ ...card, columnId: $SELECTED_COLUMN!.id })
		});

		closeDialog();
		invalidateAll();
	}

	$: if ($DIALOG_MANAGER.editTask_dialog && dialog_ref) {
		dialog_ref.showModal();
		// selected_members = card.assignedMembers?.map((m) => m.id) || [];
	}

	function selectTagColor(e: CustomEvent) {
		tag_input.color = e.detail;
	}
</script>

{#if $DIALOG_MANAGER.editTask_dialog == true}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max shadow-md"
		on:dblclick|self={closeDialog}
		bind:this={dialog_ref}
		on:close={closeDialog}>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div
					class="flex flex-row gap-4 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark w-full items-center">
					<h1 class="font-sans text-3xl px-4 pb-2 py-2">
						{card.id ? 'Edit Task' : 'New Task'}
					</h1>
					{#if card.id}
						<form method="POST" action="?/deleteTask" use:enhance>
							<input class="hidden" type="number" value={card.id} id="task_id" />
							<button
								name="deleteTask"
								tabindex="0"
								title="Click to remove the task"
								class="flex cursor-pointer active:scale-105 stroke-text_secondary dark:stroke-text_secondary_dark">
								<IconTrash />
							</button>
						</form>
					{/if}
				</div>
				<button
					class="bg-primary group dark:bg-primary_dark w-16 h-auto text-text_secondary dark:text-text_secondary_dark border-l select-none font-semibold border-secondary dark:border-secondary_dark transition-colors"
					on:click={closeDialog}>
					<IconPlus styles="rotate-45 m-auto" />
				</button>
			</div>
			<form class="form" method="POST" action="?/createTask" use:enhance={onSubmitDialog}>
				{#if !select_members}
					<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
						<div class="flex flex-col gap-2 w-full">
							<label
								for="tag"
								class="text-lg font-semibold select-none text-text_primary dark:text-text_primary_dark"
								>Tags</label>
							<div
								class="flex flex-row gap-2 text-secondary font-semibold overflow-hidden w-max overflow-x-auto">
								{#if card.tags}
									{#each card.tags as tag, index}
										<button
											type="button"
											on:click={() => removeTag(index)}
											class="w-max h-max px-1 bg-{tag &&
												tag.color} flex flex-row gap-2 items-center hover:shadow-md"
											title="click to remove">
											{tag.tag}
										</button>
									{/each}
								{/if}
							</div>
							<div class="flex flex-row w-full items-center gap-1">
								<div class="flex flex-row">
									<ColorSelect on:colorSelect={selectTagColor} />
								</div>
								<input
									id="tag"
									type="text"
									placeholder="tag name"
									bind:value={tag_input.tag}
									class="form_input w-1/3" />
								<button
									type="button"
									on:click={addTag}
									class="p-1 group border bg-background dark:bg-background_dark w-max h-max cursor-pointer group border-primary dark:border-primary_dark focus:border-primary dark:focus:border-primary_dark">
									<IconPlus
										styles="group group-active:scale-110 text-primary dark:text-primary_dark" />
								</button>
								<button
									type="button"
									on:click={() => (select_members = true)}
									class="ml-auto flex w-max h-max items-center p-1 border border-primary group group-active:scale-105 dark:border-primary_dark focus:border-primary dark:focus:border-primary_dark">
									<IconGroup styles="p-1 w-max h-max cursor-pointer group group-active:scale-105" />
								</button>
							</div>
						</div>
					</div>
					<div class="px-3">
						<div>
							<label
								for="title"
								class="text-lg font-semibold text-text_primary dark:text-text_primary_dark"
								>Title</label>
							<input
								type="text"
								id="title"
								bind:value={card.title}
								placeholder="Task title"
								class="form_input w-full" />
						</div>
						<div>
							<label
								for="details"
								class="text-lg font-semibold text-text_primary dark:text-text_primary_dark"
								>Details</label>
							<textarea
								id="details"
								placeholder="Task details"
								bind:value={card.details}
								class="form_input w-full min-h-[2rem]" />
						</div>
						<div class="flex justify-between">
							<input
								type="date"
								class="w-max form_input"
								name="dueDate"
								id="dueDate"
								bind:value={date_input} />
						</div>
					</div>
				{:else}
					<div class="flex flex-col px-3 py-3 justify-between">
						<fieldset class="flex flex-col gap-4 overflow-y-auto">
							<div class="flex justify-between">
								<legend class="text-2xl text-text_primary dark:text-text_primary_dark pb-5"
									>Assign Members:</legend>
								<button
									type="button"
									on:click={() => (select_members = false)}
									class="flex w-max h-max ml-auto items-center p-1 border border-primary group group-active:scale-105 dark:border-primary_dark focus:border-primary dark:focus:border-primary_dark">
									<IconGroup styles="p-1 w-max h-max cursor-pointer group group-active:scale-105" />
								</button>
							</div>
							{#each members as member, i}
								<div class="text-xl flex items-center gap-2">
									<input
										class="h-6 w-6 cursor-pointer"
										bind:group={selected_members}
										type="checkbox"
										id="member_{i}"
										value={member.id} />
									<label for="member_{i}">{member.user.username}</label>
								</div>
							{/each}
						</fieldset>
					</div>
				{/if}
				<button class="form_button"> Save changes</button>
			</form>
		</div>
	</dialog>
{/if}
