<script lang="ts">
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import { DIALOG_MANAGER, SELECTED_COLUMN } from '../../routes/projects/[slug]/stores';

	let dialog_ref: HTMLDialogElement;
	let column_title = '';

	function closeDialog() {
		$DIALOG_MANAGER.column_dialog = false;
	}

	function submitDialog({ formData }: any) {
		formData.set('column_id', $SELECTED_COLUMN!.id);

		closeDialog();
	}

	$: if ($DIALOG_MANAGER.column_dialog && dialog_ref) {
		dialog_ref.showModal();
	}

	$: column_title = $SELECTED_COLUMN ? $SELECTED_COLUMN.title : '';
</script>

{#if $DIALOG_MANAGER.column_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max"
		bind:this={dialog_ref}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary text-secondary w-full items-center">
					<h1 class="text-secondary font-sans text-3xl px-4 pb-2 py-2">Edit Column</h1>
					<form action="?/deleteColumn" method="POST" use:enhance={submitDialog}>
						<button
							tabindex="0"
							title="Click to remove the task"
							class="cursor-pointer active:scale-105 stroke-secondary"
						>
							<IconTrash />
						</button>
					</form>
				</div>
				<button
					class="bg-primary text-secondary border-l select-none font-semibold border-secondary px-2 hover:bg-secondary hover:text-primary transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form action="?/renameColumn" method="post" class="form" use:enhance={submitDialog}>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Column title</div>
						<input
							type="text"
							value={column_title}
							name="column_title"
							placeholder="Column title"
							class="form_input"
						/>
					</div>
				</div>

				<button class="form_button">Save changes</button>
			</form>
		</div>
	</dialog>
{/if}
