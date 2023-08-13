<script lang="ts">
	import NewProjectDialog from '../components/NewProjectDialog.svelte';
	import PlusButton from '../components/PlusButton.svelte';
	import type { PageData } from './$types';
	import { DIALOG_MANAGER } from './projects/[slug]/stores';

	export let data: PageData;
</script>

<NewProjectDialog />

<div class="flex flex-row h-full items-center w-full justify-center">
	<div class="w-96 h-24">
		<h1 class="text-white bg-accent font-sans py-3 text-3xl mb-1 px-3">Your Projects</h1>
		<div class="border border-black flex flex-col">
			<div class="flex flex-col p-3 pb-48">
				{#each data.projects as project}
					<a
						href="/projects/{project.id}"
						class="hover:bg-black hover:text-white transition-colors text-2xl px-2 py-2 w-full cursor-pointer active:scale-95 select-none text-start"
						>{project.title}</a>
					<hr class="w-full border-t-1 border-black self-center" />
				{/each}
			</div>
			<PlusButton
				styles="border-r border-t"
				on:click={() => {
					$DIALOG_MANAGER.new_project_dialog = true;
				}} />
		</div>
	</div>
</div>
