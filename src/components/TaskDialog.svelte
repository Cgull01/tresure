<script lang="ts">
	import { onDestroy } from 'svelte';
	import PlusButton from './PlusButton.svelte';
	import type { ITag, ITask } from '../types';
	import { CURRENT_COLUMN, CURRENT_PROJECT, DIALOG_TASK, DIALOG_IS_OPEN } from './store';
	import { v4 as uuidv4 } from 'uuid';

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
	let dueDateInput: Date;

	function closeDialog() {
		DIALOG_IS_OPEN.set(false);
	}

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
		$DIALOG_TASK.dueDate = dueDateInput;
	}

	function removeDueDate() {
		$DIALOG_TASK.dueDate = undefined;
		dueDateInput = new Date();
	}

	function submitDialog() {
		if ($DIALOG_TASK.title == '' && $DIALOG_TASK.details == '') return;

		if ($DIALOG_TASK.id) {
			// updates column with modified task
			console.log($DIALOG_TASK);
			let index = $CURRENT_COLUMN.tasks!.findIndex((task) => task.id === $DIALOG_TASK.id);
			$CURRENT_COLUMN.tasks![index] = $DIALOG_TASK;
		} else {
			// updates column with new task
			$DIALOG_TASK.id = uuidv4();
			$CURRENT_COLUMN.tasks = [...($CURRENT_COLUMN.tasks || []), $DIALOG_TASK];
		}

		// updates project with new column
		$CURRENT_PROJECT.columns = $CURRENT_PROJECT.columns.map((column) => {
			if (column.id === $CURRENT_COLUMN.id) {
				return $CURRENT_COLUMN;
			}
			return column;
		});

		CURRENT_PROJECT.set($CURRENT_PROJECT);

		closeDialog();
	}

	/**
	 * Formats the selected dueDate to MM-DD or YYYY-MM-DD
	 * if current year and dueDate are equal -> MM-DD
	 * else YYYY-MM-DD
	 */
	$: {
		const currentDate = new Date();
		const day = currentDate.getDate();
		const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
		const year = currentDate.getFullYear();

		if (!$DIALOG_TASK.dueDate) {
			formattedDate = '';
		} else {
			const dueDate = new Date($DIALOG_TASK.dueDate);
			if (year === dueDate.getFullYear()) {
				formattedDate = `${day}-${month}`;
			} else {
				formattedDate = `${dueDate.getFullYear()}-${day}-${month}`;
			}
		}
	}
	let formattedDate: string;

	let isColorDropdownVisible = false;
	let dropdownElement: HTMLElement;

	function handleClickOutside(event: MouseEvent) {
		if (dropdownElement && !dropdownElement.contains(event.target as Node)) {
			isColorDropdownVisible = false;
		}
	}

	window.addEventListener('click', handleClickOutside);

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutside);
	});
</script>

<dialog
	class="absolute flex-col justify-center items-center w-full h-5/6 z-10 bg-transparent backdrop-blur-sm {$DIALOG_IS_OPEN &&
		'flex'}"
	id="task-dialog"
	open={$DIALOG_IS_OPEN}
	on:dblclick|self={closeDialog}
>
	<div class="sticky w-1/2 m-auto">
		<div class="flex flex-row justify-between">
			<h1 class="text-white bg-accent font-sans text-3xl px-4 pb-2 py-2 w-full">
				{$DIALOG_TASK ? 'New Task' : 'Edit Task'}
			</h1>
			<button
				class="bg-accent text-white border-l font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
				on:click={closeDialog}>Cancel</button
			>
		</div>
		<form class="border-black border bg-white">
			<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
				<div class="flex flex-col gap-2">
					<h3 class="text-lg font-semibold">Tags</h3>
					<div
						class="flex flex-row gap-2 text-white font-semibold overflow-hidden w-64 overflow-x-auto"
					>
						{#if $DIALOG_TASK.tags}
							{#each $DIALOG_TASK.tags as tag, index}
								<div
									class="w-max h-max px-1 bg-{tag.color} opacity-80 flex flex-row gap-2 items-center"
								>
									{tag.tag}
									<button on:click={() => removeTag(index)}>
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
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
										class="feather feather-hexagon stroke-{TagInput.color}"
										><path
											d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
										/></svg
									>
								</div>
							</button>
							{#if isColorDropdownVisible}
								<div class="absolute mt-8" bind:this={dropdownElement}>
									<div class="grid grid-cols-4 grid-rows-2 bg-white p-2 border border-black gap-2">
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
										{formattedDate}
									</div>

									<button on:click={removeDueDate}>
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
				<svg
					class="group-active:translate-x-11 group-active:transition-none group-hover:translate-x-6 transition-transform group-hover:fill-white"
					xmlns="http://www.w3.org/2000/svg"
					height="48"
					viewBox="0 -960 960 960"
					width="48"
					><path
						d="m242-200 210-280-210-280h74l210 280-210 280h-74Zm252 0 210-280-210-280h74l210 280-210 280h-74Z"
					/></svg
				>
			</div>
		</form>
	</div>
</dialog>
