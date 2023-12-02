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
	import ColorSelect from '../ColorSelect.svelte';
	import IconGroup from '../../Icons/Icon_group.svelte';

	const projectContext: IProject = getContext('project');
	const projectMembers = projectContext.members;

	let tagInput: ITag = { tag: '', color: 'primary' };
	let dialogRef: HTMLDialogElement;

	let selectedMembers: Array<number> = [];

	let isSelectingMembers: boolean = false;

	$: card = <ICard>{};

	$: if ($DIALOG_MANAGER.createTask_dialog && dialogRef) {
		dialogRef.showModal();
	}

	function addTag() {
		if (tagInput.tag.length === 0) return;

		const newTag = { ...tagInput };

		card.tags = card ? [...(card.tags || []), newTag] : [newTag];

		tagInput.tag = '';
	}

	function removeTag(index: number) {
		card.tags = card.tags?.filter((t: any, i: number) => i != index);
	}

	function closeDialog() {
		$DIALOG_MANAGER.createTask_dialog = false;
		$SELECTED_TASK = null;

		tagInput = { tag: '', color: 'primary' };
		card.tags = [];
		selectedMembers = [];
		isSelectingMembers = false;
		card = <ICard>{};
	}

	async function onSubmitDialog({ formData }: any) {
		if (!card.title && !card.details) {
			throw new Error('no title or no details');
		}

		card.assignedMembers = selectedMembers.map((m) => ({ id: m }));

		formData.set('task', JSON.stringify({ ...card, columnId: $SELECTED_COLUMN?.id }));

		closeDialog();
		invalidateAll();
	}

	function selectTagColor(e: CustomEvent) {
		tagInput.color = e.detail;
	}
</script>

{#if $DIALOG_MANAGER.createTask_dialog == true}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max shadow-md"
		on:dblclick|self={closeDialog}
		bind:this={dialogRef}
		on:close={closeDialog}>
		<div class="m-auto w-full h-full">
			<div class="flex flex-row justify-between">
				<div
					class="flex flex-row gap-4 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark w-full items-center">
					<h1 class="font-sans text-3xl px-4 pb-2 py-2">New Task</h1>
				</div>
				<button
					class="bg-primary group dark:bg-primary_dark w-16 h-auto text-text_secondary dark:text-text_secondary_dark border-l select-none font-semibold border-secondary dark:border-secondary_dark transition-colors"
					on:click={closeDialog}>
					<IconPlus styles="rotate-45 m-auto" />
				</button>
			</div>
			<form class="form" method="POST" action="?/createTask" use:enhance={onSubmitDialog}>
				{#if !isSelectingMembers}
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
									bind:value={tagInput.tag}
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
									on:click={() => (isSelectingMembers = true)}
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
								bind:value={card.dueDate} />
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
									on:click={() => (isSelectingMembers = false)}
									class="flex w-max h-max ml-auto items-center p-1 border border-primary group group-active:scale-105 dark:border-primary_dark focus:border-primary dark:focus:border-primary_dark">
									<IconGroup styles="p-1 w-max h-max cursor-pointer group group-active:scale-105" />
								</button>
							</div>
							{#each projectMembers as member, i}
								<div class="text-xl flex items-center gap-2">
									<input
										class="h-6 w-6 cursor-pointer"
										bind:group={selectedMembers}
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
