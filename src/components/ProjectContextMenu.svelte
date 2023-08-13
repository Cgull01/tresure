<script lang="ts">
	import { enhance } from '$app/forms';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconSettings from '../Icons/Icon_settings.svelte';
	import { DIALOG_MANAGER, SELECTED_PROJECT } from '../routes/projects/[slug]/stores';

	let show_context_menu = false;
	let context_menu: HTMLElement;
	let context_menu_position = { x: 220, y: 420 };

	function handleClickOutside(event: MouseEvent) {
		if (context_menu && !context_menu.contains(event.target as Node)) {
			show_context_menu = false;
		}
	}

	function handleContextmenu(event: MouseEvent) {
		context_menu_position = { x: event.clientX, y: event.clientY };
		show_context_menu = true;
	}

	function handleSubmit({ formData }: any) {
		formData.set('project_id', $SELECTED_PROJECT!.id);
		formData.set('column_position', $SELECTED_PROJECT?.columns.length);
		show_context_menu = false;
	}
</script>

<svelte:document
	on:contextmenu||preventDefault={handleContextmenu}
	on:click={handleClickOutside}
	on:scroll={() => (show_context_menu = false)} />

{#if show_context_menu}
	<div
		bind:this={context_menu}
		class="fixed z-50"
		style="top: {context_menu_position.y}px; left: {context_menu_position.x}px;">
		<ul class="shadow-md border border-black w-full bg-background">
			<li
				class="py-1 hover:bg-accent hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black">
				<button
					class="flex gap-2"
					on:click={() => {
						$DIALOG_MANAGER.project_dialog = true;
						show_context_menu = false;
					}}>
					<IconSettings />
					Project settings</button>
			</li>
			<li
				class="py-1 hover:bg-accent hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black">
				<form action="?/addColumn" method="POST" use:enhance={handleSubmit}>
					<button class="flex gap-2"> <IconPlus /> Add column</button>
				</form>
			</li>
		</ul>
	</div>
{/if}
