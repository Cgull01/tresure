<script lang="ts">
	import { CURRENT_COLUMN, CURRENT_PROJECT, DIALOG_MANAGER, DIALOG_TASK } from './store';
	import { addTask, removeColumn, removeTask, updateProject, updateTask } from '../functions';
	import Icon from './Icon.svelte';

	let dialogRef: HTMLDialogElement;
	let columnTitleInput: string;
	let originalColumnTitle: string;

	function closeDialog() {
		$DIALOG_MANAGER.columnDialog = false;
	}

	function handleDeleteColumn() {
		removeColumn($CURRENT_COLUMN.id);
		closeDialog();
	}

	function submitDialog() {
		$CURRENT_COLUMN.title = columnTitleInput;
		updateProject($CURRENT_COLUMN);
		closeDialog();
	}

	$: if ($DIALOG_MANAGER.columnDialog && dialogRef) {
		dialogRef.showModal();
		originalColumnTitle = $CURRENT_COLUMN.title;
	}

	$: columnTitleInput = originalColumnTitle;
</script>

{#if $DIALOG_MANAGER.columnDialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		bind:this={dialogRef}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-accent text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">Edit Column</h1>
					<button
						tabindex="0"
						title="Click to remove the task"
						class=" cursor-pointer active:scale-105 stroke-formBackground"
						on:click={handleDeleteColumn}
					>
						<Icon name="trash" stroke_width="2" />
					</button>
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form class="border-black border bg-white">
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Column title</div>
						<input
							type="text"
							bind:value={columnTitleInput}
							placeholder="Task title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto"
						/>
					</div>
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
