<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlusButton from './PlusButton.svelte';
	import type { ITag, ITask } from '$lib/types';
	import { DIALOG_MANAGER, SELECTED_COLUMN, SELECTED_TASK } from '../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconTrash from '../Icons/Icon_trash.svelte';
	import IconColors from '../Icons/Icon_colors.svelte';

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

	$: task = $SELECTED_TASK ?? <ITask>{};
	// $: dueDateInput = task && task.dueDate ? task.dueDate.toISOString().slice(0, 10) : '';

	function addTag() {
		if (TagInput.tag.length === 0) return;

		const newTag = { ...TagInput };

		task.tags = task ? [...(task.tags || []), newTag] : [newTag];

		TagInput = { tag: '', color: TAG_COLORS[0] };
	}

	function removeTag(index: number) {
		task.tags = task.tags?.filter((t, i) => i != index);
	}

	function closeDialog() {
		$DIALOG_MANAGER.taskDialog = false;
		$SELECTED_COLUMN = null;
		$SELECTED_TASK = null;

		TagInput = { tag: '', color: TAG_COLORS[0] };
		task = <ITask>{};
	}

	function onDeleteTask({ formData }: any) {
		formData.set('task_id', task.id);

		closeDialog();
	}
	function onSubmitDialog({ formData }: any) {
		if (!task.title && !task.details) {
			throw new Error('no title or no details');
		}

		formData.set('column_id', $SELECTED_COLUMN?.id);
		if (!task.id) task.position = $SELECTED_COLUMN?.tasks?.length || 0;
		formData.set('task', JSON.stringify(task));
		closeDialog();
	}

	function handleClickOutsideColors(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isColorDropdownVisible = false;
		}
	}

	window.addEventListener('click', handleClickOutsideColors);

	$: if ($DIALOG_MANAGER.taskDialog && dialogRef) {
		dialogRef.showModal();
	}

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutsideColors);
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
						{task.id ? 'Edit Task' : 'New Task'}
					</h1>
					{#if task.id}
						<form method="POST" action="?/deleteTask" use:enhance={onDeleteTask}>
							<button
								name="deleteTask"
								tabindex="0"
								title="Click to remove the task"
								class="cursor-pointer active:scale-105 stroke-formBackground"
							>
								<IconTrash />
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
							{#if task.tags}
								{#each task.tags as tag, index}
									<button
										type="button"
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
										<IconColors styles="fill-{TagInput.color} h-6 w-6" />
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
							<PlusButton bonusStyles="border" on:click={addTag} />
						</div>
					</div>
					<!-- <div class="text-lg font-semibold">Assigned members</div> -->
				</div>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Title</div>
						<input
							type="text"
							bind:value={task.title}
							placeholder="Task title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto"
						/>
					</div>
					<div>
						<div class="text-lg font-semibold">Details</div>
						<textarea
							placeholder="Task details"
							bind:value={task.details}
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full min-h-[2rem]"
						/>
					</div>
				</div>

				<div
					class="flex flex-row cursor-pointer border-t border-black w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none h-12"
				>
					<button>Save changes</button>
				</div>
			</form>
		</div>
	</dialog>
{/if}
