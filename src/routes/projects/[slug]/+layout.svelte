<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import logout from '$lib/functions';
	import IconTresureLogo from '../../../Icons/Icon_TresureLogo.svelte';
	import IconCheck from '../../../Icons/Icon_check.svelte';
	import IconDirectionLeft from '../../../Icons/Icon_direction_left.svelte';
	import IconEdit from '../../../Icons/Icon_edit.svelte';
	import IconLogout from '../../../Icons/Icon_logout.svelte';
	import IconPlus from '../../../Icons/Icon_plus.svelte';
	import ThemeButton from '../../../components/ThemeButton.svelte';
	import { DIALOG_MANAGER } from './stores';

	export let data: any;

	let editProjectTitle = false;
	let title_input: string;

	console.log(data);

	$: currentRoute = $page.url.pathname;
</script>

<div class="flex flex-col h-screen w-full overflow-x-hidden">
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
				{#if editProjectTitle}
					<div class="flex items-center">
						<form
							method="POST"
							action="?/editProject"
							use:enhance={() => {
								editProjectTitle = false;
								data.project.title = title_input;
							}}
							class="flex items-center gap-2">
							<input
								type="text"
								class="form_input text-2xl w-full"
								required
								id="project_title"
								name="project_title"
								bind:value={title_input} />
							<button
								type="submit"
								class="active:scale-95 border-primary dark:border-primary_dark border hover:scale-105">
								<IconCheck styles="" />
							</button>
							<button
								type="button"
								on:click={() => (editProjectTitle = false)}
								class="active:scale-95 border-primary dark:border-primary_dark border hover:scale-105">
								<IconPlus styles="rotate-45" />
							</button>
						</form>
					</div>
				{:else}
					<h1
						class="text-3xl font-semibold"
						on:dblclick={() => {
							editProjectTitle = true;
							title_input = data.project.title;
						}}>
						{data.project.title}
					</h1>
				{/if}
			</div>
		</div>

		<div class="sm:hidden">
			<!-- TODO: burger menu -->
			<div>
				<a
					href="/projects/{data.project.id}"
					class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.project.id}` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Board
				</a>
				<a
					href="/projects/{data.project.id}/members"
					class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.project.id}/members` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Members
				</a>
				<a
					href="/projects/{data.project.id}/progress"
					class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
						`/projects/${data.project.id}/progress` &&
						'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
					Progress
				</a>
			</div>
		</div>
		<div class="hidden sm:flex gap-4 items-center self-end text-xl">
			<a
				href="/projects/{data.project.id}"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.project.id}` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Board
			</a>
			<a
				href="/projects/{data.project.id}/members"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.project.id}/members` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Members
			</a>
			<!-- <a
				href="/projects/{data.params.slug}/progress"
				class="cursor-pointer hover:underline underline-offset-2 decoration-primary dark:decoration-primary_dark {currentRoute ==
					`/projects/${data.params.slug}/progress` &&
					'underline decoration-double !decoration-accent dark:!decoration-accent_dark '}">
				Progress
			</a> -->
		</div>
		<div class="flex gap-8">
			<div class="text-xl text-text_primary dark:text-text_primary_dark flex gap-4 items-center ">
				<h2 class="">{data.user.username}</h2>
				<button on:click={logout} class="hover:scale-110 active:scale-95">
					<IconLogout/>
				</button>
			</div>
			<ThemeButton />
		</div>
	</nav>

	<slot />
</div>
