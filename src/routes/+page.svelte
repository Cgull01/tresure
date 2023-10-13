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
				class="text-primary bg-secondary border-primary border px-2 text-3xl flex items-center py-1 active:bg-primary active:text-secondary"
				href="/projects"
				>My Projects
			</a>
			<LogOutButton />
		{:else}
			<a
				class="hover:underline underline-offset-2 text-primary font-bold bg-secondary border-primary border px-2 text-3xl flex items-center py-1 active:bg-primary active:text-secondary"
				href="/login">
				Login
			</a>
			<a
				class="hover:underline underline-offset-2 text-primary bg-secondary border-primary border px-2 text-3xl flex items-center py-1 active:bg-primary active:text-secondary"
				href="/register">
				Register
			</a>
		{/if}
	</NavBar>
	<div class="background-pattern w-full h-full flex flex-col px-16 items-center justify-center">
			<h1 class="text-5xl font-extrabold px-16 text-primary ">
				Project management made <span class="bg-primary text-secondary px-2">simple</span>
			</h1>
			<h2 class="text-3xl font-extrabold px-16 py-12 text-primary ">
				A minimal <span class="bg-primary text-secondary px-2">kanban board</span> made for individual
				or team projects
			</h2>
			{#if data.user !== null}

			<a href="/projects" class="bg-secondary text-primary font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary border hover:bg-primary hover:text-secondary transition-colors">
				View Your Projects
			</a>
		{:else}
			<a href="/register" class="bg-secondary text-primary font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary border hover:bg-primary hover:text-secondary transition-colors">
			Start Now
			</a>
		{/if}

			<img src="/images/HomePageProject.png" alt="Example of a Tresure Project" class="py-16"/>
	</div>
</div>
