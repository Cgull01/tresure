<script lang="ts">
	import Task from './Task.svelte';
	import type { IColumn, ITask } from '../types';
	import PlusButton from './PlusButton.svelte';

	import { CURRENT_COLUMN, DIALOG_TASK, DIALOG_IS_OPEN } from './store';

	export let column: IColumn;
	function handleClick() {
		DIALOG_TASK.set({});
		CURRENT_COLUMN.set(column);
		DIALOG_IS_OPEN.set(true);
	}
</script>

<div class="w-96 h-max m-2 flex flex-col bg-background">
	<button class="text-white bg-accent flex flex-row justify-between px-3">
		<h1 class="font-sans py-3 text-3xl">{column.title}</h1>
		<div class="self-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="feather feather-more-horizontal"
				><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
					cx="5"
					cy="12"
					r="1"
				/></svg
			>
		</div>
	</button>
	<div class="border border-black">
		<section class="flex flex-col pb-6">
			<!--{ children } -->
			{#if column.tasks}
				{#each column.tasks as task (task.id)}
					<Task {task} {column} />
				{/each}
			{/if}
		</section>
		<div class="flex flex-row">
			<PlusButton size={28} bonusStyles="border-r border-t" on:click={handleClick} />
		</div>
	</div>
</div>
