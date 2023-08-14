<script lang="ts">
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import { DIALOG_MANAGER, SELECTED_PROJECT } from '../../routes/projects/[slug]/stores';

	let dialog_ref: HTMLDialogElement;
	let project_title_input: string = $SELECTED_PROJECT ? $SELECTED_PROJECT.title : '';

	function closeDialog() {
		$DIALOG_MANAGER.project_dialog = false;

		project_title_input = $SELECTED_PROJECT!.title;
	}

	function submitDialog({ formData }: any) {
		formData.set('project_id', $SELECTED_PROJECT?.id);

		closeDialog();
	}

	$: if ($DIALOG_MANAGER.project_dialog && dialog_ref) {
		dialog_ref.showModal();
	}
</script>

{#if $DIALOG_MANAGER.project_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		bind:this={dialog_ref}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-accent text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">Edit Project</h1>
					<form method="POST" action="?/deleteProject" use:enhance={submitDialog}>
						<button
							tabindex="0"
							title="Click to remove the task"
							class=" cursor-pointer active:scale-105 stroke-formBackground">
							<IconTrash />
						</button>
					</form>
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button>
			</div>
			<form
				class="border-black border bg-white"
				method="POST"
				action="?/editProject"
				use:enhance={submitDialog}>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold {project_title_input.length <= 0 && 'text-red-600'}">
							Project title
						</div>
						<input
							type="text"
							name="project_title"
							bind:value={project_title_input}
							placeholder="Project title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto {project_title_input.length <=
								0 && 'border-red-600'}" />
					</div>
				</div>
				{#if project_title_input.length > 0}
					<div
						class="flex flex-row cursor-pointer border-t border-black w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none h-12">
						<button>Save changes</button>
					</div>
				{/if}
			</form>
		</div>
	</dialog>
{/if}
