<script lang="ts">
	import IconTresure from '../Icons/Icon_Tresure.svelte';
	import IconTresureLogo from '../Icons/Icon_TresureLogo.svelte';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';
	import LogOutButton from '../components/LogOutButton.svelte';
	import NavBar from '../components/NavBar.svelte';

	export let data: any;
</script>

<div class="flex flex-col w-screen h-screen">
	<NavBar>
		{#if data.user !== null}
			<a
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark w-max px-4 py-1 text-3xl border-spacing-5 dark:border-primary_dark border-primary border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors"
				href="/projects"
				>My Projects
			</a>
			<LogOutButton />
		{:else}
			<a
				class="hover:underline underline-offset-2 text-text_primary dark:text-text_primary_dark font-bold bg-secondary dark:bg-secondary_dark border-primary dark:border-primary_dark border px-2 text-3xl flex items-center py-1 active:bg-primary dark:active:bg-primary_dark active:text-text_secondary dark:active:text-text_secondary_dark"
				href="/login"
			>
				Login
			</a>
			<a
				class="hover:underline underline-offset-2 text-text_primary dark:text-text_primary_dark font-bold bg-secondary dark:bg-secondary_dark border-primary dark:border-primary_dark border px-2 text-3xl flex items-center py-1 active:bg-primary dark:active:bg-primary_dark active:text-text_secondary dark:active:text-text_secondary_dark"
				href="/register"
			>
				Register
			</a>
		{/if}
	</NavBar>
	<div class="background-pattern bg-background dark:bg-background_dark w-full h-full flex flex-col px-16 items-center justify-center ">
		<h1 class="text-3xl font-extrabold sm:px-16 text-text_primary dark:text-text_primary_dark sm:text-5xl break-words">
			Project management made <span class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">simple</span>
		</h1>
		<h2 class="text-2xl sm:text-3xl font-extrabold sm:px-16 py-12 text-text_primary dark:text-text_primary_dark ">
			A minimal <span class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">kanban board</span> made for individual
			or team projects
		</h2>
		{#if data.user !== null}
			<a
				href="/projects"
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors"
			>
				View Your Projects
			</a>
		{:else}
			<a
				href="/register"
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors"
			>
				Start Now
			</a>
		{/if}

		<img src="/images/HomePageProject.png" alt="Example of a Tresure Project" class="py-8 sm:block hidden px-6 mt-6 " />
	</div>
</div>
