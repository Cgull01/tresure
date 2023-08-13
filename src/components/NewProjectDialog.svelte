<script lang="ts">
	import { enhance } from '$app/forms';
	import { DIALOG_MANAGER } from '../routes/projects/[slug]/stores';

	let dialog_ref: HTMLDialogElement;
	let project_title_input: string;

	function closeDialog() {
		$DIALOG_MANAGER.new_project_dialog = false;
		project_title_input = '';
	}

	function submitDialog() {
		closeDialog();
	}

	$: if ($DIALOG_MANAGER.new_project_dialog && dialog_ref) {
		dialog_ref.showModal();
	}
</script>

{#if $DIALOG_MANAGER.new_project_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		bind:this={dialog_ref}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-accent text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">New Project</h1>
				</div>
				<button
					class="bg-accent text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button>
			</div>
			<form
				class="border-black border bg-white"
				method="POST"
				action="?/createProject"
				use:enhance
				on:submit={submitDialog}>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Project title</div>
						<input
							type="text"
							name="project_title"
							bind:value={project_title_input}
							placeholder="Project title"
							class="p-1 border-l-2 border-black bg-formBackground focus:bg-formBackgroundFocused outline-none mb-3 w-full resize-y row-auto" />
					</div>
				</div>
				<div
					class="flex flex-row cursor-pointer border-t border-black w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none h-12">
					<button>Create New Project</button>
				</div>
			</form>
		</div>
	</dialog>
{/if}
