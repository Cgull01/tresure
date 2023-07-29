<script lang="ts">
	import { showDialog } from '../functions';
	import type { IColumn, ITask } from '../types';

	export let task: ITask;
	export let column: IColumn;

	import { CURRENT_COLUMN, DIALOG_IS_OPEN, DIALOG_TASK } from './store';

	function handleClick() {
		showDialog(task, column);
	}

	const currentDate = new Date();
	const day = currentDate.getDate();
	const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
	const year = currentDate.getFullYear();
	let formattedDate = '';

	if (task.dueDate) {
		const dueDate = new Date(task.dueDate);
		if (year === dueDate.getFullYear()) {
			formattedDate = `${day}-${month}`;
		} else {
			formattedDate = `${dueDate.getFullYear()}-${day}-${month}`;
		}
	}
</script>

<div
	draggable="true"
	on:dragstart
	on:contextmenu|preventDefault={() => console.log('asdf')}
	role="listitem"
	class="select-none hover:shadow-2xl hover:bg-white hover:cursor-grab active:cursor-grabbing transition-shadow pb-2 p-3"
>
	<div class="flex flex-row justify-between">
		<div class="flex flex-row text-white gap-2 font-semibold overflow-x-auto">
			{#each task.tags || [] as tag}
				<div class={`w-max h-max px-1 bg-${tag.color} opacity-80`}>
					{tag.tag}
				</div>
			{/each}
		</div>
		<button class="w-6 h-6 cursor-pointer hover:scale-105 active:scale-100" on:click={handleClick}>
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
				class="feather feather-edit"
				><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
					d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
				/></svg
			>
		</button>
	</div>
	<div class="flex flex-row justify-between pb-2">
		<div class="flex flex-col items-start">
			<div class="text-2xl font-semibold">{task.title ?? ''}</div>
			<div class={task.title ? 'text-base' : 'text-xl'}>{task.details || ''}</div>
		</div>
	</div>
	<div class="flex flex-row justify-between mb-3">
		{#if task.dueDate}
			<div class="flex flex-row w-max justify-between px-1 h-max place-self-end font-mono">
				<div class="w-4 pr-8">
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
						class="feather feather-clock"
						><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
					>
				</div>

				<div class="h-max">
					{formattedDate}
				</div>
			</div>
		{/if}
		<!-- <div class="flex flex-row gap-1 justify-center items-center">
			{#if task.members}
				{#each task.members.slice(0, 3) as member, i}
					<div>
						<img
							src={member.avatar}
							alt={member.member}
							class="border border-black rounded-full w-10 h-auto"
						/>
					</div>
				{/each}
				{#if task.members.length > 3}
					<div class="place-self-end">
						+{task.members.length - 3} more
					</div>
				{/if}
			{/if}
		</div> -->
	</div>
	<hr class="w-full border-t-1 border-black self-center" />
</div>
