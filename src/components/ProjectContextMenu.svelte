<script lang="ts">
	import { enhance } from '$app/forms';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconSettings from '../Icons/Icon_settings.svelte';
	import { DIALOG_MANAGER, SELECTED_PROJECT } from '../routes/projects/[slug]/stores';

	let showContextMenu = false;
	let contextMenu: HTMLElement;
	let position = { x: 220, y: 420 };
	function handleClickOutside(event: MouseEvent) {
		if (contextMenu && !contextMenu.contains(event.target as Node)) {
			showContextMenu = false;
		}
	}

	function handleContextmenu(event: MouseEvent) {
		position = { x: event.clientX, y: event.clientY };
		showContextMenu = true;
	}

	function handleSubmit({ formData }: any) {
		formData.set('project_id', $SELECTED_PROJECT!.id);
		formData.set('column_position', $SELECTED_PROJECT?.columns.length);
		showContextMenu = false;
	}
</script>

<svelte:document
	on:contextmenu||preventDefault={handleContextmenu}
	on:click={handleClickOutside}
	on:scroll={() => (showContextMenu = false)}
/>

{#if showContextMenu}
	<div
		bind:this={contextMenu}
		class="fixed z-50"
		style="top: {position.y}px; left: {position.x}px;"
	>
		<ul class="shadow-md border border-black w-full bg-background">
			<li
				class="py-1 hover:bg-accent hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black"
			>
				<button
					class="flex gap-2"
					on:click={() => {
						$DIALOG_MANAGER.projectDialog = true;
						showContextMenu = false;
					}}
				>
					<IconSettings />
					Project settings</button
				>
			</li>
			<li
				class="py-1 hover:bg-accent hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black"
			>
				<form action="?/addColumn" method="POST" use:enhance={handleSubmit}>
					<button class="flex gap-2"> <IconPlus /> Add column</button>
				</form>
			</li>
		</ul>
	</div>
{/if}
