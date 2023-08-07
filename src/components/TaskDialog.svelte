<script lang="ts">
	import { getContext, onDestroy } from 'svelte';
	import PlusButton from './PlusButton.svelte';
	import type { IColumn, ITag, ITask } from '$lib/types';
	import Icon from './Icon.svelte';
	import type { Writable } from 'svelte/store';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { addTask } from '../functions';
	import { enhance } from '$app/forms';
	import { error, type SubmitFunction } from '@sveltejs/kit';

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

	let TagInput: ITag = { tag: '', color: TAG_COLORS[0] };
	let dialogRef: HTMLDialogElement;

	let isColorDropdownVisible = false;
	let dropdownElement: HTMLElement;

	$: Task = $SELECTED_TASK ?? <ITask>{};
	$: dueDateInput = $SELECTED_TASK?.dueDate
		? new Date($SELECTED_TASK?.dueDate).toISOString().slice(0, 10)
		: null;

	function addTag() {
		if (TagInput.tag.length === 0) return;

		// Create a new object and copy newTag values
		const newTag = { ...TagInput };

		Task.tags = Task ? [...(Task.tags || []), newTag] : [newTag];

		// reset input fields
		TagInput = { tag: '', color: TAG_COLORS[0] };
	}

	function removeTag(index: number) {
		Task.tags?.splice(index, 1);
	}

	function closeDialog() {
		$DIALOG_MANAGER.taskDialog = false;
		$SELECTED_COLUMN = null;
		$SELECTED_TASK = null;

		dueDateInput = null;
		TagInput = { tag: '', color: TAG_COLORS[0] };
	}

	function onDeleteTask({ formData }: any) {
		formData.set('task_id', Task.id);

		closeDialog();
	}
	function onSubmitDialog({ formData }: any) {
		if ($SELECTED_TASK) {
			formData.set('task_id', Task.id);
		} else {
			if (!Task.title && !Task.details) {
				throw new Error('no title or no details');
			}
		}
		if (Task.tags) formData.set('tags', JSON.stringify(Task.tags));
		formData.set('columnID', $SELECTED_COLUMN?.id);
		closeDialog();
	}

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isColorDropdownVisible = false;
		}
	}

	$: window.addEventListener('click', handleClickOutside);
	$: if ($DIALOG_MANAGER.taskDialog && dialogRef) {
		dialogRef.showModal();
	}

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutside);
	});
</script>

{#if $DIALOG_MANAGER.taskDialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		on:dblclick|self={closeDialog}
		bind:this={dialogRef}
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-accent text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">
						{Task.id ? 'Edit Task' : 'New Task'}
					</h1>
					{#if Task.id}
						<form method="POST" action="?/deleteTask" use:enhance={onDeleteTask}>
							<button
								name="deleteTask"
								tabindex="0"
								title="Click to remove the task"
								class=" cursor-pointer active:scale-105 stroke-formBackground"
							>
								<Icon name="trash" stroke_width="2" />
							</button>
						</form>
					{/if}
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form
				class="border-black border bg-white"
				method="POST"
				action="?/{$SELECTED_TASK ? 'editTask' : 'createTask'}"
				use:enhance={onSubmitDialog}
			>
				<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-semibold">Tags</h3>
						<div
							class="flex flex-row gap-2 text-white font-semibold overflow-hidden w-max overflow-x-auto"
						>
							{#if Task.tags}
								{#each Task.tags as tag, index}
									<button
										on:click={() => removeTag(index)}
										class="w-max h-max px-1 bg-{tag &&
											tag.color} opacity-80 flex flex-row gap-2 items-center hover: shadow-md"
										title="click to remove"
									>
										{tag.tag}
									</button>
								{/each}
							{/if}
						</div>
						<div class="flex flex-row items-center gap-1">
							<div class="flex flex-row">
								<button
									type="button"
									on:click|stopPropagation={() => {
										isColorDropdownVisible = !isColorDropdownVisible;
									}}
								>
									<div class="h-6 w-6 cursor-pointer active:scale-100 hover:scale-105">
										<Icon
											name="colors"
											stroke_width="0"
											styles="fill-{TagInput.color}"
											width={24}
											height={24}
										/>
									</div>
								</button>
								{#if isColorDropdownVisible}
									<div class="absolute mt-8" bind:this={dropdownElement}>
										<div
											class="grid grid-cols-4 grid-rows-2 bg-white p-2 border border-black gap-2"
										>
											{#each TAG_COLORS as color, i}
												<button
													type="button"
													class={`rounded-full w-6 h-6 bg-${color} hover:scale-95 cursor-pointer`}
													on:click={() => {
														TagInput.color = TAG_COLORS[i];
													}}
												/>
											{/each}
										</div>
									</div>
								{/if}
							</div>
							<input
								type="text"
								placeholder="tag name"
								bind:value={TagInput.tag}
								class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none"
							/>
							<PlusButton size={22} bonusStyles="border" on:click={addTag} />
						</div>
					</div>
					<!-- <div class="text-lg font-semibold">Assigned members</div> -->
				</div>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Title</div>
						<input
							type="text"
							name="task_title"
							bind:value={Task.title}
							placeholder="Task title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto"
						/>
					</div>
					<div>
						<div class="text-lg font-semibold">Details</div>
						<textarea
							name="task_details"
							placeholder="Task details"
							bind:value={Task.details}
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full"
						/>
					</div>
				</div>
				<div class="flex flex-row justify-between px-3">
					<div>
						<div class="flex flex-col">
							<div>Due date</div>
							<div class="flex flex-row items-center gap-2">
								<input
									type="date"
									class="border border-black my-1 bg-formBackground focus:bg-formBackgroundFocused"
									bind:value={dueDateInput}
									name="due_date"
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					class="flex flex-row cursor-pointer border-t border-black w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none"
				>
					<button>Save changes</button>

					<Icon
						height={48}
						width={48}
						name="directions-right"
						styles="fill-black group-active:translate-x-11 group-active:transition-none group-hover:translate-x-6 transition-transform group-hover:fill-white"
					/>
				</div>
			</form>
		</div>
	</dialog>
{/if}
