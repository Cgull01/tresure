<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import IconTrash from '../Icons/Icon_trash.svelte';
	import IconEdit from '../Icons/Icon_edit.svelte';

	export let card: any;

	let show_deletion_menu = false;

	const dispatch = createEventDispatcher();

	function handleClick() {
		dispatch('edit', {
			task: card
		});
	}

</script>

<div
	draggable="true"
	on:dragstart
	on:contextmenu|preventDefault|stopPropagation={() => (show_deletion_menu = !show_deletion_menu)}
	on:mouseleave={() => {
		show_deletion_menu = false;
	}}
	role="listitem"
	class="group/card select-none hover:shadow-2xl hover:brightness-105 dark:hover:brightness-150 bg-background dark:bg-background_dark hover:cursor-grab active:cursor-grabbing transition-shadow p-3">
	{#if show_deletion_menu}
		<form
			method="POST"
			action="?/deleteTask"
			use:enhance
			class="absolute top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
			<input class="hidden" type="number" value={card.id} name="task_id"/>
			<button
				class="flex gap-2 group/delete bg-accent dark:bg-accent_dark p-2 text-primary_secondary dark:text-primary_secondary_dark border-primary dark:border-primary_dark hover:border group group-active:scale-95">
				<IconTrash styles="group-active/delete:scale-95" />
				Delete
			</button>
		</form>
	{/if}

	<div class="flex flex-row justify-between">
		<div class="flex flex-row text-secondary flex-wrap gap-2 font-semibold overflow-x-auto">
			{#each card.tags || [] as tag}
				<div class={`w-max h-max px-1 bg-${tag.color}`}>
					{tag.tag}
				</div>
			{/each}
		</div>
		<button
			class="w-6 h-6 cursor-pointer hover:scale-105 active:scale-100 text-text_primary dark:text-text_primary_dark"
			on:click={handleClick}>
			<IconEdit styles="group-hover/card:block hidden" />
		</button>
	</div>
	<div class="flex flex-row justify-between pb-2">
		<div class="flex flex-col items-start w-full text-text_primary dark:text-text_primary_dark">
			<!-- TODO: add if statement here and dont render empty divs -->
			<div
				class="text-2xl font-semibold text-ellipsis overflow-hidden w-full text-text_primary dark:text-text_primary_dark">
				{card.title ?? ''}
			</div>
			<div class="{card.title ? 'text-base' : 'text-xl'} w-full overflow-hidden text-ellipsis">
				{card.details ?? ''}
			</div>
		</div>
	</div>

	<hr class="w-full border-t-1 border-primary dark:border-primary_dark self-center" />
</div>
