<script lang="ts">
	import logout from '$lib/functions';
	import type { IColumn } from '$lib/types';
	import IconChevronDown from '../Icons/Icon_ChevronDown.svelte';
	import IconTresure from '../Icons/Icon_Tresure.svelte';
	import IconTresureLogo from '../Icons/Icon_TresureLogo.svelte';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';
	import IconLogout from '../Icons/Icon_logout.svelte';
	import Column from '../components/Column.svelte';
	import NavBar from '../components/NavBar.svelte';

	export let data: any;
</script>

<svelte:head>
	<title>TRESURE</title>
</svelte:head>

<div class="w-full h-screen overflow-y-hidden">
	<NavBar>
		{#if data.user !== null}
			<a
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark w-max px-4 py-1 text-3xl border-spacing-5 dark:border-primary_dark border-primary border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors"
				href="/projects"
				>My Projects
			</a>
			<div class="text-xl text-text_primary dark:text-text_primary_dark flex gap-4 items-center">
				<h2 class="">{data.user.username}</h2>
				<button on:click={logout} class="hover:scale-110 active:scale-95">
					<IconLogout />
				</button>
			</div>
		{:else}
			<a
				class="hover:underline underline-offset-2 text-text_primary dark:text-text_primary_dark font-bold bg-secondary dark:bg-secondary_dark border-primary dark:border-primary_dark border px-2 text-3xl flex items-center py-1 active:bg-primary dark:active:bg-primary_dark active:text-text_secondary dark:active:text-text_secondary_dark"
				href="/login">
				Login
			</a>
			<a
				class="hover:underline underline-offset-2 text-text_primary dark:text-text_primary_dark font-bold bg-secondary dark:bg-secondary_dark border-primary dark:border-primary_dark border px-2 text-3xl flex items-center py-1 active:bg-primary dark:active:bg-primary_dark active:text-text_secondary dark:active:text-text_secondary_dark"
				href="/register">
				Register
			</a>
		{/if}
	</NavBar>
	<div class="w-full h-full flex flex-col px-16 items-center pt-16">
		<div class="text-center">
			<IconTresure styles="w-80 m-auto fill-primary dark:fill-primary_dark"/>
			<h1
				class="text-3xl font-extrabold pt-6 sm:px-16 text-text_primary dark:text-text_primary_dark sm:text-5xl break-words">
				Project management made <span
					class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2"
					>simple</span>
			</h1>
			<h2
				class="text-2xl sm:text-3xl font-extrabold sm:px-16 py-12 text-text_primary dark:text-text_primary_dark">
				A minimal
				<span
					class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">
					kanban board
				</span>
				made for individual or team projects
			</h2>
		</div>
		{#if data.user !== null}
			<a
				href="/projects"
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors">
				Go To Your Projects
			</a>
			{:else}
			<a
			href="/register"
			class="bg-secondary italic dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors">
			Start Now
		</a>
		{/if}
		<a
			href="/guide"
			class="bg-secondary text-xl mt-6 dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-12 py-1 border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors">
			Read a guide
		</a>

		<img
			src="/images/projectExample.png"
			alt="Example of a Tresure Project"
			class="pt-16 sm:block hidden px-6 sm:w-2/3" />

		<a href="#about" class="">
			<IconChevronDown styles="h-12 w-12 text-primary dark:text-primary_dark" />
		</a>
	</div>
</div>
<div
	id="about"
	class="h-full flex flex-col gap-16 sm:gap-32 py-16 text-text_primary dark:text-text_primary_dark bg-secondary dark:bg-secondary_dark">
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<div class="w-3/4 sm:w-1/4">
			<h2
				class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">
				Snappy fast UI!
			</h2>
			<p class="break-words text-xl pt-6 bg-secondary dark:bg-secondary_dark">
				Lightning-fast and responsive user interface makes managing your tasks a breeze. With our
				minimalistic design, you can focus on your work without distractions, streamlining your
				kanban workflow like never before.
			</p>
		</div>
		<img
			src="/images/gears_light.png"
			alt="gears with sparks"
			class="w-1/5 h-1/5 bg-secondary p-6 rounded-full sm:block hidden" />
	</div>
	<hr class="border-primary dark:border-primary_dark w-1/3 self-center" />
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<IconTresureLogo styles="fill-primary dark:fill-primary_dark h-1/5 w-1/5 sm:block hidden" />
		<div class="w-3/4 sm:w-1/4">
			<h2
				class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">
				Perfect For Everything
			</h2>
			<p class="break-words text-xl pt-6 bg-secondary dark:bg-secondary_dark">
				Whether you're working on a big project or managing personal chores and goals, Tresure is
				the ideal life management tool for you. Organize tasks, projects, and responsibilities with
				ease. Track progress, monitor deadlines, or simply manage your daily to-do lists and
				personal projects.
			</p>
		</div>
	</div>
	<hr class="border-primary dark:border-primary_dark w-1/3 self-center" />
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<div class="w-3/4 sm:w-1/4">
			<h2
				class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">
				Effortless Collaboration
			</h2>
			<p class="break-words text-xl pt-6 bg-secondary dark:bg-secondary_dark">
				Tresure allows you to effortlessly collaborate with colleagues, friends, or family members
				by inviting them to your projects. Assign tasks, share ideas, and work together in
				real-time.
			</p>
		</div>
		<img
			src="/images/collab_light.png"
			alt="collaboration"
			class="w-1/5 h-1/5 bg-secondary p-6 rounded-full sm:block hidden" />
	</div>
</div>

<footer
	class="w-full items-center justify-between bg-background dark:bg-background_dark text-text_primary dark:text-text_primary_dark flex border-t border-primary dark:border-primary_dark py-6 px-3 gap-16">
	<IconTresure styles="fill-text_primary dark:fill-text_primary_dark" />
	<div class="flex flex-row gap-6 items-center">
		{#if data.user !== null}
			<a class="hover:underline underline-offset-2 text-xl" href="/projects">Your Projects</a>
			<button on:click={logout} class="hover:underline underline-offset-2 text-xl">
				Log Out
			</button>
		{:else}
			<a class="hover:underline underline-offset-2 text-xl" href="/register">Register</a>
			<a class="hover:underline underline-offset-2 text-xl" href="/login">Login</a>
		{/if}
		<p class="pl-12 w-max">Contact Email: help@tresure.com</p>
	</div>
</footer>
