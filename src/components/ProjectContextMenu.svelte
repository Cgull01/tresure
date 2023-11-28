<script lang="ts">
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconSettings from '../Icons/Icon_settings.svelte';
	import { DIALOG_MANAGER } from '../routes/projects/[slug]/stores';

	let showContextMenu = false;
	let contextMenu: HTMLElement;
	let contextMenuPosition = { x: 220, y: 420 };

	const project_id = getContext('project_id');

	function handleClickOutside(event: MouseEvent) {
		if (contextMenu && !contextMenu.contains(event.target as Node)) {
			showContextMenu = false;
		}
	}

	function handleContextmenu(event: MouseEvent) {
		contextMenuPosition = { x: event.clientX, y: event.clientY };
		showContextMenu = true;
	}

	function handleSubmit({ formData }: any) {
		formData.set('project_id', project_id);
		showContextMenu = false;
	}
</script>

<svelte:window
	on:contextmenu||preventDefault={handleContextmenu}
	on:click={handleClickOutside}
	on:scroll={() => (showContextMenu = false)}
/>

{#if showContextMenu}
	<div
		bind:this={contextMenu}
		class="fixed z-50"
		style="top: {contextMenuPosition.y}px; left: {contextMenuPosition.x}px;"
	>
		<ul
			class="shadow-md border border-accent dark:border-accent_dark w-full bg-background dark:bg-background_dark"
		>
			<li
				class="py-1 hover:bg-primary dark:hover:bg-primary_dark text-text_primary dark:text-text_primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-primary dark:border-primary_dark"
			>
				<form action="?/addColumn" method="POST" use:enhance={handleSubmit}>
					<button class="flex gap-2"> <IconPlus /> Add column</button>
				</form>
			</li>
		</ul>
	</div>
{/if}
