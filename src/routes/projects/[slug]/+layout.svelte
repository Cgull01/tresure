<script lang="ts">
	import { page } from '$app/stores';
	import IconTresureLogo from '../../../Icons/Icon_TresureLogo.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconEdit from '../../../Icons/Icon_edit.svelte';
	import LogOutButton from '../../../components/LogOutButton.svelte';
	import { DIALOG_MANAGER } from './stores';

	export let data: any;

	function showProjectDialog() {
		$DIALOG_MANAGER.project_dialog = true;
	}

	$: currentRoute = $page.url.pathname;


	console.log();
</script>

<div class="flex flex-col h-screen w-screen">
	<nav
		class="flex flex-row py-3 items-center justify-between w-full bg-background border-b border-primary pr-16">
		<div class="flex gap-2 items-center pl-6">
			<a href="/" class="cursor-pointer pr-12">
				<IconTresureLogo styles="fill-primary" />
			</a>
			<a href="/projects" class="hover:scale-105">
				<IconDirectionLeft styles="w-12 h-12" />
			</a>
			<h1 class="text-3xl font-semibold">
				{data.project.title}
			</h1>
			<button on:click={showProjectDialog} class="active:scale-105">
				<IconEdit styles="w-12 h-12 p-2" />
			</button>
		</div>

		<div class="flex gap-4 items-center self-end text-xl">
			<a
				href="/projects/{data.params.slug}"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary {currentRoute == `/projects/${data.params.slug}` && 'underline decoration-double !decoration-zinc-500 '}">
				Board
			</a>
			<a
				href="/projects/{data.params.slug}/members"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary {currentRoute == `/projects/${data.params.slug}/members` && 'underline decoration-double !decoration-zinc-500 '}">
				Members
			</a>
			<a
				href="/projects/{data.params.slug}/progress"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary {currentRoute == `/projects/${data.params.slug}/progress` && 'underline decoration-double !decoration-zinc-500 '}">
				Progress
			</a>
		</div>
		<LogOutButton />
	</nav>

	<slot />
</div>
