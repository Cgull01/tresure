<script lang="ts">
	import type { ITask } from '$lib/types';
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import IconTrash from '../Icons/Icon_trash.svelte';
	import IconEdit from '../Icons/Icon_edit.svelte';

	export let task: ITask;

	let show_context_menu = false;
	let context_position = { x: 220, y: 420 };

	const dispatch = createEventDispatcher();
	function handleContextmenu(event: MouseEvent) {
		context_position = { x: event.clientX, y: event.clientY };
		show_context_menu = !show_context_menu;
	}

	function handleClick() {
		dispatch('edit', {
			task: task
		});
	}

	function onDeleteTask({ formData }: any) {
		formData.set('task_id', task.id);
		show_context_menu = false;
	}
</script>

<div
	draggable="true"
	on:dragstart
	on:contextmenu|preventDefault|stopPropagation={handleContextmenu}
	on:mouseleave={() => {
		show_context_menu = false;
	}}
	role="listitem"
	class="select-none hover:shadow-2xl hover:bg-white hover:cursor-grab active:cursor-grabbing transition-shadow pb-2 p-3">
	{#if show_context_menu}
		<form
			method="POST"
			action="?/deleteTask"
			use:enhance={onDeleteTask}
			class="fixed z-50 border-black border bg-background px-2 py-1"
			style="top: {context_position.y}px; left: {context_position.x}px;">
			<button class="flex flex-row gap-2 hover:scale-105m">
				<IconTrash />
				Delete
			</button>
		</form>
	{/if}
	<div class="flex flex-row justify-between">
		<div class="flex flex-row text-white gap-2 font-semibold overflow-x-auto">
			{#each task.tags || [] as tag}
				<div class={`w-max h-max px-1 bg-${tag.color} opacity-80`}>
					{tag.tag}
				</div>
			{/each}
		</div>
		<button class="w-6 h-6 cursor-pointer hover:scale-105 active:scale-100" on:click={handleClick}>
			<IconEdit />
		</button>
	</div>
	<div class="flex flex-row justify-between pb-2">
		<div class="flex flex-col items-start">
			<div class="text-2xl font-semibold">{task.title ?? ''}</div>
			<div class={task.title ? 'text-base' : 'text-xl'}>{task.details || ''}</div>
		</div>
	</div>

	<hr class="w-full border-t-1 border-black self-center" />
</div>
