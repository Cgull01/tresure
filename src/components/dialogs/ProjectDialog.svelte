<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import {
		DIALOG_MANAGER,
		PROJECT_ID,
		SELECTED_PROJECT
	} from '../../routes/projects/[slug]/stores';

	let dialog_ref: HTMLDialogElement;

	export let project_title: string;

	$: title_input = project_title;

	function closeDialog() {
		$DIALOG_MANAGER.project_dialog = false;
		title_input = project_title;
		//project_title_input = $SELECTED_PROJECT!.title;
	}

	function submitDialog({ formData }: any) {
		formData.set('project_id', $PROJECT_ID);

		closeDialog();
	}

	$: if ($DIALOG_MANAGER.project_dialog && dialog_ref) {
		dialog_ref.showModal();
	}
</script>

{#if $DIALOG_MANAGER.project_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max"
		bind:this={dialog_ref}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">Edit Project</h1>
					<form method="POST" action="?/deleteProject" use:enhance={submitDialog}>
						<button
							tabindex="0"
							title="Click to remove the task"
							class="flex items-center cursor-pointer active:scale-105 stroke-secondary"
						>
							<IconTrash />
						</button>
					</form>
				</div>
				<button
					class="bg-primary text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form class="form" method="POST" action="?/editProject" use:enhance={submitDialog}>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold {title_input.length <= 0 && 'text-red-600'}">
							Project title
						</div>
						<input
							type="text"
							name="project_title"
							bind:value={title_input}
							placeholder="Project title"
							class="form_input {title_input.length <= 0 && 'border-red-600'}"
						/>
					</div>
				</div>
				<button disabled={title_input.length <= 0} class="form_button">Save changes</button>
			</form>
		</div>
	</dialog>
{/if}
