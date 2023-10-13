<script lang="ts">
	import { enhance } from '$app/forms';
	import { DIALOG_MANAGER } from '../../routes/projects/[slug]/stores';

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
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/3 h-max"
		bind:this={dialog_ref}
		on:dblclick|self={closeDialog}
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary text-secondary w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">New Project</h1>
				</div>
				<button
					class="bg-primary text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-black transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<form
				class="border-black border bg-background"
				method="POST"
				action="?/createProject"
				use:enhance
				on:submit={submitDialog}
			>
				<div class="px-3">
					<div>
						<div class="text-lg font-semibold">Project title</div>
						<input
							type="text"
							name="project_title"
							bind:value={project_title_input}
							placeholder="Project title"
							class="p-1 border border-l-2 border-primary bg-secondary outline-none mb-3 w-full"
						/>
					</div>
				</div>
				<div
					class="flex flex-row cursor-pointer border-t font-semibold border-primary w-full text-3xl mt-6 hover:underline underline-offset-2 active:bg-primary active:text-white transition-colors group px-4 align-middle h-12"
				>
					<button>Create New Project</button>
				</div>
			</form>
		</div>
	</dialog>
{/if}
