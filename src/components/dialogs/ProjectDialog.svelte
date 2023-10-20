<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import IconPlus from '../../Icons/Icon_plus.svelte';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import {
		DIALOG_MANAGER,
		PROJECT_ID,
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
				<div class="flex flex-row gap-4 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark w-full items-center">
					<h1 class="font-sans text-3xl px-4 pb-2 py-2">Edit Project</h1>
					<form method="POST" action="?/deleteProject" use:enhance={submitDialog}>
						<button
							tabindex="0"
							title="Click To Delete The Project"
							class="flex cursor-pointer active:scale-105 stroke-secondary dark:stroke-secondary_dark"
						>
							<IconTrash/>
						</button>
					</form>
				</div>
				<button
					class="bg-primary group dark:bg-primary_dark w-16 h-auto text-text_secondary dark:text-text_secondary_dark border-l select-none font-semibold border-secondary dark:border-secondary_dark transition-colors"
					on:click={closeDialog}>
					<IconPlus styles="rotate-45 m-auto" />
				</button>
			</div>
			<form class="form" method="POST" action="?/editProject" use:enhance={submitDialog}>
				<div class="px-3">
					<div>
						<label for="project_title" class="text-lg font-semibold {title_input.length <= 0 && 'text-red-600'}">
							Project title
						</label>
						<input
							id="project_title"
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
