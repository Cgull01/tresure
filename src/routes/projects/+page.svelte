<script lang="ts">
	import IconPlus from '../../Icons/Icon_plus.svelte';
	import NavBar from '../../components/NavBar.svelte';
	import PlusButton from '../../components/PlusButton.svelte';
	import NewProjectDialog from '../../components/dialogs/NewProjectDialog.svelte';
	import type { PageData } from './$types';
	import { DIALOG_MANAGER } from './[slug]/stores';

	export let data: PageData;
</script>

<svelte:head>
	<title>TRESURE - projects</title>
</svelte:head>

<NewProjectDialog />
<div class="flex flex-col h-screen m-auto background-pattern">
	<NavBar />
	<div class="sm:w-96 w-full mt-0 sm:mt-32 bg-background sm:self-center self-start">
		<div class="flex flex-row items-center justify-between text-secondary bg-primary">
			<h1 class="font-sans py-3 text-3xl mb-1 px-3">Your Projects</h1>
			<button
				class="px-8"
				on:click={() => {
					$DIALOG_MANAGER.new_project_dialog = true;
				}}
			>
				<IconPlus styles="w-8 h-8 hover:scale-105 active:scale-95" />
			</button>
		</div>
		<div class="sm:border sm:border-black flex flex-col">
			<div class="flex flex-col p-3 pb-48">
				{#each data.projects as project}
					<a
						href="/projects/{project.id}"
						class="hover:bg-black hover:text-white transition-colors text-2xl px-2 py-2 w-full cursor-pointer active:scale-95 select-none text-start"
						>{project.title}</a
					>
					<hr class="w-full border-t-1 border-black self-center" />
				{/each}
			</div>
		</div>
	</div>
</div>
