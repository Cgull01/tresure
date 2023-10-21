<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ITag, ICard } from '$lib/types';
	import {
		DIALOG_MANAGER,
		SELECTED_COLUMN,
		SELECTED_TASK
	} from '../../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import IconColors from '../../Icons/Icon_colors.svelte';
	import PlusButton from '../PlusButton.svelte';
	import { invalidateAll } from '$app/navigation';
	import IconPlus from '../../Icons/Icon_plus.svelte';

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

	let tag_input: ITag = { tag: '', color: TAG_COLORS[0] };
	let dialog_ref: HTMLDialogElement;

	let color_dropdown_visible = false;
	let dropdown_element: HTMLElement;

	$: task = $SELECTED_TASK ? { ...$SELECTED_TASK } : <ICard>{};

	function addTag() {
		if (tag_input.tag.length === 0) return;

		const newTag = { ...tag_input };

		task.tags = task ? [...(task.tags || []), newTag] : [newTag];
	}

	function removeTag(index: number) {
		task.tags = task.tags?.filter((t, i) => i != index);
	}

	function closeDialog() {
		$DIALOG_MANAGER.task_dialog = false;
		$SELECTED_COLUMN = null;
		$SELECTED_TASK = null;

		tag_input = { tag: '', color: TAG_COLORS[0] };
		task.tags = [];
		task = <ICard>{};
	}

	function onDeleteTask({ formData }: any) {
		formData.set('task_id', task.id);

		closeDialog();
	}
	async function onSubmitDialog({ formData, cancel }: any) {
		if (!task.title && !task.details) {
			throw new Error('no title or no details');
		}

		formData.set('column_id', $SELECTED_COLUMN?.id);
		formData.set('task', JSON.stringify(task));

		if ($SELECTED_TASK) {
			await fetch(`/api`, {
				method: 'PUT',
				body: JSON.stringify(task)
			});
			cancel();
		}

		closeDialog();
		invalidateAll();
	}

	function handleClickOutsideColors(event: MouseEvent) {
		if (dropdown_element && !dropdown_element.contains(event.target as Node)) {
			color_dropdown_visible = false;
		}
	}

	window.addEventListener('click', handleClickOutsideColors);

	$: if ($DIALOG_MANAGER.task_dialog && dialog_ref) {
		dialog_ref.showModal();
	}

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutsideColors);
	});
</script>

{#if $DIALOG_MANAGER.task_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max shadow-md"
		on:dblclick|self={closeDialog}
		bind:this={dialog_ref}
		on:close={closeDialog}>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark w-full items-center">
					<h1 class="font-sans text-3xl px-4 pb-2 py-2">
						{task.id ? 'Edit Task' : 'New Task'}
					</h1>
					{#if task.id}
						<form method="POST" action="?/deleteTask" use:enhance={onDeleteTask}>
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
				<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
					<div class="flex flex-col gap-2">
						<label for="tag" class="text-lg font-semibold select-none text-text_primary dark:text-text_primary_dark">Tags</label>
						<div
							class="flex flex-row gap-2 text-secondary font-semibold overflow-hidden w-max overflow-x-auto">
							{#if task.tags}
								{#each task.tags as tag, index}
									<button
										type="button"
										on:click={() => removeTag(index)}
										class="w-max h-max px-1 bg-{tag &&
											tag.color} flex flex-row gap-2 items-center hover:shadow-md "
										title="click to remove">
										{tag.tag}
									</button>
								{/each}
							{/if}
						</div>
						<div class="flex flex-row items-center gap-1">
							<div class="flex flex-row">
								<button
									type="button"
									class="p-1 group border rounded-md bg-background dark:bg-background_dark w-max h-max cursor-pointer group border-primary dark:border-primary_dark hover:border-gray-400 focus:border-primary"
									on:click|stopPropagation={() => {
										color_dropdown_visible = !color_dropdown_visible;
									}}>
									<IconColors styles="fill-{tag_input.color} w-6 h-6 group group-active:scale-110" />
								</button>
								{#if color_dropdown_visible}
									<div class="absolute mt-8" bind:this={dropdown_element}>
										<div
											class="grid grid-cols-4 grid-rows-2 bg-background dark:bg-background_dark p-2 border border-primary dark:border-primary_dark gap-2">
											{#each TAG_COLORS as color, i}
												<button
													type="button"
													class={`rounded-full w-6 h-6 bg-${color} hover:scale-95 cursor-pointer`}
													on:click={() => {
														tag_input.color = TAG_COLORS[i];
													}} />
											{/each}
										</div>
									</div>
								{/if}
							</div>
							<input
								id="tag"
								type="text"
								placeholder="tag name"
								bind:value={tag_input.tag}
								class="form_input" />
							<button
								type="button"
								on:click={addTag}
								class="p-1 group border bg-background dark:bg-background_dark w-max h-max cursor-pointer group border-primary dark:border-primary_dark focus:border-primary dark:focus:border-primary_dark">
								<IconPlus styles="group group-active:scale-110 text-primary dark:text-primary_dark" />
							</button>
						</div>
					</div>
				</div>
				<div class="px-3">
					<div>
						<label for="title" class="text-lg font-semibold text-text_primary dark:text-text_primary_dark">Title</label>
						<input
							type="text"
							id="title"
							bind:value={task.title}
							placeholder="Task title"
							class="form_input" />
					</div>
					<div>
						<label for="details" class="text-lg font-semibold text-text_primary dark:text-text_primary_dark">Details</label>
						<textarea
							id="details"
							placeholder="Task details"
							bind:value={task.details}
							class="form_input min-h-[2rem]" />
					</div>
				</div>
				<button class="form_button"> Save changes</button>
			</form>
		</div>
	</dialog>
{/if}
