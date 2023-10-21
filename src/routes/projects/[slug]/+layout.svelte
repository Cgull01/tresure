<script lang="ts">
	import { page } from '$app/stores';
	import IconTresureLogo from '../../../Icons/Icon_TresureLogo.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconEdit from '../../../Icons/Icon_edit.svelte';
	import LogOutButton from '../../../components/LogOutButton.svelte';
	import ThemeButton from '../../../components/ThemeButton.svelte';
	import { DIALOG_MANAGER } from './stores';

	export let data: any;

	function showProjectDialog() {
		$DIALOG_MANAGER.project_dialog = true;
	}

	$: currentRoute = $page.url.pathname;

	console.log();
</script>

<div class="flex flex-col h-full w-full">
	<nav
		class="px-6 text-text_primary dark:text-text_primary_dark flex flex-row py-3 items-center justify-between w-full bg-background dark:bg-background_dark border-b border-primary dark:border-primary_dark">
		<div class="flex gap-2 items-center">
			<a href="/" class="cursor-pointer sm:block hidden">
				<IconTresureLogo styles="fill-text_primary dark:fill-text_primary_dark" />
			</a>
			<div class="flex items-center">
				<a href="/projects" class="hover:scale-105">
					<IconDirectionLeft styles="w-12 h-12" />
				</a>
				<h1 class="text-3xl font-semibold">
					{data.project.title}
				</h1>
			</div>
			<button on:click={showProjectDialog} class="active:scale-105">
				<IconEdit styles="w-12 h-12 p-2" />
			</button>
		</div>

		<div class="sm:hidden">
			<!-- TODO: burger -->
			<div>
				<a
				href="/projects/{data.params.slug}"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.params.slug}` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Board
				</a>
				<a
					href="/projects/{data.params.slug}/members"
					class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.params.slug}/members` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Members
				</a>
				<a
				href="/projects/{data.params.slug}/progress"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.params.slug}/progress` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Progress
				</a>
			</div>
		</div>
		<div class="hidden sm:flex gap-4 items-center self-end text-xl">
			<a
				href="/projects/{data.params.slug}"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.params.slug}` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Board
			</a>
			<a
				href="/projects/{data.params.slug}/members"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.params.slug}/members` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Members
			</a>
			<a
				href="/projects/{data.params.slug}/progress"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.params.slug}/progress` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Progress
			</a>
		</div>
		<ThemeButton />
		<LogOutButton />
	</nav>

	<slot />
</div>
