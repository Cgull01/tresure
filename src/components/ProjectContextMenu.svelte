<script lang="ts">
	import { enhance } from '$app/forms';
	import { getContext } from 'svelte';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconSettings from '../Icons/Icon_settings.svelte';
	import { DIALOG_MANAGER } from '../routes/projects/[slug]/stores';

	let show_context_menu = false;
	let context_menu: HTMLElement;
	let context_menu_position = { x: 220, y: 420 };

	const project_id = getContext('project_id');

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
		formData.set('project_id', project_id);
		show_context_menu = false;
	}
</script>

<svelte:window
	on:contextmenu||preventDefault={handleContextmenu}
	on:click={handleClickOutside}
	on:scroll={() => (show_context_menu = false)}
/>

{#if show_context_menu}
	<div
		bind:this={context_menu}
		class="fixed z-50"
		style="top: {context_menu_position.y}px; left: {context_menu_position.x}px;"
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
