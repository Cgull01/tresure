<script lang="ts">
	import { DIALOG_MANAGER } from '../../routes/projects/[slug]/stores';
	import { enhance } from '$app/forms';
	import IconTrash from '../../Icons/Icon_trash.svelte';
	import IconColors from '../../Icons/Icon_colors.svelte';
	import PlusButton from '../PlusButton.svelte';
	import IconSearch from '../../Icons/Icon_search.svelte';

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
		on:close={closeDialog}
	>
		<div class="sticky m-auto">
			<div class="flex flex-row justify-between">
				<div class="flex flex-row gap-4 bg-primary text-white w-full items-center">
					<h1 class="text-white font-sans text-3xl px-4 pb-2 py-2">Project members</h1>
				</div>
				<button
					class="bg-primary text-white border-l select-none font-semibold border-white px-2 hover:bg-white hover:text-primary transition-colors"
					on:click={closeDialog}>Cancel</button
				>
			</div>
			<div class="border-primary border bg-white">
				<div class="flex flex-col">
					<form class="form px-3 py-2 border-none" method="POST" use:enhance>
						<div class="flex gap-2 items-center justify-between">
							<input
								placeholder="Search for new members by entering their email"
								type="text"
								id="searchMember"
								name="searchmember"
								class="form_input"
							/>
							<button
								class="flex items-center justify-center text-primary p-1 border-[1px] border-primary group"
							>
								<IconSearch styles="h-6 w-6 group-hover:scale-105" />
							</button>
						</div>
					</form>
					<div class="flex flex-col gap-4 px-3 bg-secondary">
						<h1>Search results:</h1>
						<div class="flex flex-col gap-3">
							<div class="flex gap-4 flex-1">
								<span class="font-semibold">member.username</span>
								<span class="font-semibold">member.email</span>
								<button class="hover:underline underline-offset-2">Add</button>
							</div>
						</div>
					</div>
				</div>
				<div class="flex flex-col grap-4 pt-6 px-3">
					<span>Existing members:</span>
					<div class="flex flex-col sm:flex-row px-3 py-3 justify-between">
						{#each members as member}
							<div
								class="flex gap-4 py-1 border-b border-primary w-full text-primary items-center justify-between"
							>
								<button class="group flex-2 pr-6"
									><IconTrash styles="group-hover:scale-105" /></button
								>
								<div class="flex gap-4 flex-1">
									<span class="font-semibold">{member.username}</span>
									<span class="font-semibold">{member.email}</span>
								</div>
								<div class="flex gap-3 flex-2">
									<button class="w-5 h-5 rounded-full bg-gray-400" />
									<button class="w-5 h-5 rounded-full bg-gray-400" />
									<button class="w-5 h-5 rounded-full bg-gray-400" />
								</div>
							</div>
						{/each}
					</div>
				</div>
				<button class="form_button">Save changes</button>
			</div>
		</div>
	</dialog>
{/if}
