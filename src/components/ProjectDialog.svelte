<script lang="ts">
	import { CURRENT_COLUMN, DIALOG_MANAGER, DIALOG_TASK } from './store';
	import { addTask, removeTask, updateTask } from '../functions';
	import Icon from './Icon.svelte';

	let dialogRef: HTMLDialogElement;

	function closeDialog() {
		$DIALOG_MANAGER.projectDialog = false;
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

	$: if ($DIALOG_MANAGER.projectDialog && dialogRef) dialogRef.showModal();
</script>

{#if $DIALOG_MANAGER.projectDialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		id="task-dialog"
		bind:this={dialogRef}
		on:dblclick|self={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-accent text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">
						{'Edit Project'}
					</h1>
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
		</div>
	</dialog>
{/if}
