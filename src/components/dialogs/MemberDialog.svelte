<script lang="ts">
	import { DIALOG_MANAGER } from '../../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import IconColors from '../../Icons/Icon_colors.svelte';
	import PlusButton from '../PlusButton.svelte';

	let dialog_ref: HTMLDialogElement;
	export let members: any;

	function closeDialog() {
		$DIALOG_MANAGER.member_dialog = false;
	}

	$: if ($DIALOG_MANAGER.member_dialog && dialog_ref) {
		dialog_ref.showModal();
	}
</script>

{#if $DIALOG_MANAGER.member_dialog}
	<dialog
		class="absolute flex-col justify-center items-center z-10 backdrop:backdrop-blur-sm w-1/2 h-max"
		on:dblclick|self={closeDialog}
		bind:this={dialog_ref}
		on:close={closeDialog}>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">Project members</h1>
				</div>
				<button
					class="bg-primary text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-primary transition-colors"
					on:click={closeDialog}>Cancel</button>
			</div>
			<div class="border-primary border bg-white">
				<div class="flex flex-col">
					<form class="border-primary border bg-background w-full">
						<label for="email" class="font-semibold"
							>Search for new members by entering their email</label>

						<div class="flex gap-2 items-center justify-between">
							<input
								type="text"
								id="searchMember"
								name="searchmember"
								class="p-1 border border-l-2 border-primary bg-secondary outline-none mb-3 w-full" />
							<button
								class="bg-primary text-white select-none font-semibold border-secondary px-2 hover:bg-secondary hover:text-primary transition-colors"
								>Search</button>
						</div>
					</form>
				</div>
				<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
					{#each members as member}
						<div class="flex flex-col py-1 border-b border-primary">
							<span class="font-semibold">{member.username}</span>
						</div>
					{/each}
				</div>

				<div
					class="flex flex-row cursor-pointer border-t border-primary w-full text-3xl mt-6 hover:bg-black hover:text-white transition-colors group px-4 align-middle font-semibold select-none h-12">
					<button>Save changes</button>
				</div>
			</div>
		</div>
	</dialog>
{/if}
