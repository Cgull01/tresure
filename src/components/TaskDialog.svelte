<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlusButton from './PlusButton.svelte';
	import type { ITag, ITask } from '../types';
	import { CURRENT_COLUMN, DIALOG_MANAGER, DIALOG_TASK } from './store';
	import { addTask, removeTask, updateTask } from '../functions';
	import Icon from './Icon.svelte';

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
	let dueDateInput: Date = new Date();
	let dialogRef: HTMLDialogElement;

	let isColorDropdownVisible = false;
	let dropdownElement: HTMLElement;

	function addTag() {
		if (TagInput.tag.length === 0) return;

		// Create a new object and copy newTag values
		const newTag = { ...TagInput };

		$DIALOG_TASK.tags = $DIALOG_TASK ? [...($DIALOG_TASK.tags || []), newTag] : [newTag];

		// reset input fields
		TagInput = { tag: '', color: TAG_COLORS[0] };
	}

	function removeTag(index: number) {
		$DIALOG_TASK.tags?.splice(index, 1);
		$DIALOG_TASK = $DIALOG_TASK;
	}

	function addDueDate() {
		if (dueDateInput.toString().length > 14) return;
		$DIALOG_TASK.dueDate = dueDateInput;
	}

	function removeDueDate() {
		$DIALOG_TASK.dueDate = undefined;
		dueDateInput = new Date();
	}

	function closeDialog() {
		$DIALOG_MANAGER.taskDialog = false;

		dueDateInput = new Date();
		TagInput = { tag: '', color: TAG_COLORS[0] };
	}

	function handleRemove() {
		if ($DIALOG_TASK.id) {
			removeTask($CURRENT_COLUMN, $DIALOG_TASK);
		}
		closeDialog();
	}

	function submitDialog() {
		if ($DIALOG_TASK.id) {
			updateTask($CURRENT_COLUMN, $DIALOG_TASK);
		} else {
			addTask($CURRENT_COLUMN, $DIALOG_TASK);
		}

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
						{$DIALOG_TASK.id ? 'Edit Task' : 'New Task'}
					</h1>
					{#if $DIALOG_TASK.id}
						<button
							tabindex="0"
							title="Click to remove the task"
							class=" cursor-pointer active:scale-105 stroke-formBackground"
							on:click={handleRemove}
						>
							<Icon name="trash" stroke_width="2" />
						</button>
					{/if}
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form class="border-black border bg-white">
				<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
					<div class="flex flex-col gap-2">
						<h3 class="text-lg font-semibold">Tags</h3>
						<div
							class="flex flex-row gap-2 text-white font-semibold overflow-hidden w-max overflow-x-auto"
						>
							{#if $DIALOG_TASK.tags}
								{#each $DIALOG_TASK.tags as tag, index}
									<div
										class="w-max h-max px-1 bg-{tag.color} opacity-80 flex flex-row gap-2 items-center"
									>
										{tag.tag}
										<button on:click={() => removeTag(index)}>
											<Icon
												name="x-circle"
												stroke_width="2"
												styles="feather feather-x-circle w-5 h-5 hover:scale-105 cursor-pointer"
											/>
										</button>
									</div>
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
							bind:value={$DIALOG_TASK.title}
							placeholder="Task title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto"
						/>
					</div>
					<div>
						<div class="text-lg font-semibold">Details</div>
						<textarea
							placeholder="Task details"
							bind:value={$DIALOG_TASK.details}
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full"
						/>
					</div>
				</div>
				<div class="flex flex-row justify-between px-3">
					<div>
						<div class="flex flex-col">
							<div>Due date</div>
							<div class="flex flex-row items-center gap-2">
								{#if !$DIALOG_TASK.dueDate}
									<input
										type="date"
										class="border border-black my-1 bg-formBackground focus:bg-formBackgroundFocused"
										bind:value={dueDateInput}
									/>
									<PlusButton size={18} bonusStyles="border" on:click={addDueDate} />
								{:else}
									<div
										class="flex flex-row w-max justify-between items-center px-1 h-max gap-2 my-1 font-mono border border-accent"
									>
										<div class="h-max text-lg">
											{$DIALOG_TASK.dueDate}
										</div>

										<button on:click={removeDueDate}>
											<Icon
												name="x-circle"
												stroke_width="2"
												styles="w-5 h-5 hover:scale-105 cursor-pointer"
											/>
										</button>
									</div>
								{/if}
							</div>
						</div>
						<!-- <div class="w-6 h-6">
						{#if $DIALOG_TASK.dueDate}
							<div
								class="flex flex-row w-max justify-between items-center px-1 h-max gap-2 my-1 font-mono border border-accent"
							>
								<div class="h-max text-lg">
									{formattedDate}
								</div>

								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
									class="feather feather-x-circle w-5 h-5 hover:scale-105 cursor-pointer"
									><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line
										x1="9"
										y1="9"
										x2="15"
										y2="15"
									/></svg
								>
							</div>
						{/if}
					</div> -->
					</div>
					<div>attachments</div>
				</div>
				<div
					class="flex flex-row cursor-pointer border-t border-black w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none"
				>
					<button on:click={submitDialog}>Save changes</button>

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
