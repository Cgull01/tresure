<script lang="ts">
	import logout from '$lib/functions';
	import IconLogout from '../../Icons/Icon_logout.svelte';
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
<div class="flex flex-col h-screen m-auto background-pattern bg-radial-gradient dark:bg-radial-gradient_dark  ">
	<NavBar>
		<div class="text-xl text-text_primary dark:text-text_primary_dark flex gap-4 items-center ">
			<h2 class="">{data.user.username}</h2>
			<button on:click={logout} class="hover:scale-110 active:scale-95">
				<IconLogout/>
			</button>
		</div>
	</NavBar>
	<div class="sm:w-1/3 w-full mt-0 sm:mt-32  sm:self-center self-start">
		<div class="flex flex-row items-center justify-between text-text_secondary dark:text-text_secondary_dark bg-primary dark:bg-primary_dark">
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
		<div class="sm:border sm:border-primary border-primary dark:border-primary_dark flex flex-col">
			<div class="flex flex-col p-3 pb-48 bg-background dark:bg-background_dark text-text_primary dark:text-text_primary_dark">
				{#each data.projects as project}
					<a
						href="/projects/{project.id}"
						class="hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors text-2xl px-2 py-2 w-full cursor-pointer active:scale-95 select-none text-start"
						>{project.title}</a
					>
					<hr class="w-full border-t-1 border-primary dark:border-primary_dark self-center" />
				{/each}
			</div>
		</div>
	</div>
</div>
