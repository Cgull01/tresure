<script lang="ts">
	import IconChevronDown from '../Icons/Icon_ChevronDown.svelte';
	import IconTresure from '../Icons/Icon_Tresure.svelte';
	import IconTresureLogo from '../Icons/Icon_TresureLogo.svelte';
	import IconDirectionRight from '../Icons/Icon_direction_right.svelte';
	import LogOutButton from '../components/LogOutButton.svelte';
	import NavBar from '../components/NavBar.svelte';

	export let data: any;
</script>

<div class="w-full h-screen">
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
	<div class="w-full h-max flex flex-col px-16 items-center pt-16">
		<h1
			class="text-3xl font-extrabold pt-6 sm:px-16 text-text_primary dark:text-text_primary_dark sm:text-5xl break-words">
			Project management made <span
				class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2"
				>simple</span>
		</h1>
		<h2
			class="text-2xl sm:text-3xl font-extrabold sm:px-16 py-12 text-text_primary dark:text-text_primary_dark">
			A minimal <span
				class="bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2"
				>kanban board</span> made for individual or team projects
		</h2>
		{#if data.user !== null}
			<a
				href="/projects"
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors">
				View Your Projects
			</a>
		{:else}
			<a
				href="/register"
				class="bg-secondary dark:bg-secondary_dark text-text_primary dark:text-text_primary_dark font-semibold w-max px-16 py-3 text-3xl border-spacing-5 border-primary dark:border-primary_dark border hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors">
				Start Now
			</a>
		{/if}

		<img
			src="/images/HomePageProject.png"
			alt="Example of a Tresure Project"
			class="py-8 sm:block hidden px-6 mt-6" />

		<a href="#about" class="mt-auto">
			<IconChevronDown styles="h-12 w-12 text-primary dark:text-primary_dark" />
		</a>
	</div>
</div>
<div id="about" class="h-full bg-background dark:bg-background_dark flex flex-col gap-16 sm:gap-32 py-16 text-text_primary dark:text-text_primary_dark ">
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<div class="w-3/4 sm:w-1/4">
			<h2 class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">Snappy fast UI!</h2>
			<p class="break-words text-xl">
				Lightning-fast and responsive user interface makes managing
				your tasks a breeze.
				Experience seamless navigation and quick load times, ensuring you can stay productive
				without any lag. With our minimalistic design, you can focus on your work without
				distractions, streamlining your workflow like never before.
			</p>
		</div>
		<img src="/images/gears_light.png" alt="gears with sparks" class="w-1/5 h-1/5 bg-secondary p-6 rounded-full sm:block hidden" />
	</div>
	<hr class="border-primary dark:border-primary_dark w-1/3 self-center"/>
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<IconTresureLogo styles="fill-accent h-1/5 w-1/5 sm:block hidden" />
		<div class="w-3/4 sm:w-1/4">
			<h2 class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">Perfect For Everything</h2>
			<p class="break-words text-xl">
				Whether you're working on a big project or managing personal
				chores and goals, Tresure is the ideal life management tool for you.
				Organize tasks, projects, and responsibilities with ease. Track progress,
				monitor deadlines, or simply manage your daily to-do lists and personal
				projects.
			</p>
		</div>
	</div>
	<hr class="border-primary dark:border-primary_dark w-1/3 self-center"/>
	<div class="flex flex-row text-center justify-center gap-32 items-center">
		<div class="w-3/4 sm:w-1/4">
			<h2 class="text-3xl font-bold pb-2 bg-primary dark:bg-primary_dark text-text_secondary dark:text-text_secondary_dark px-2">Effortless Collaboration</h2>
			<p class="break-words text-xl">
				Invite members to your projects and streamline teamwork like never before. Tresure
				allows you to effortlessly collaborate with colleagues, friends, or family members by
				inviting them to your projects. Assign tasks, share ideas, and work together in real-time.
				Connect with your team and achieve your goals together, all in one easy-to-use website.
			</p>
		</div>
		<img src="/images/collab_light.png" alt="collaboration" class="w-1/5 h-1/5 bg-secondary p-6 rounded-full sm:block hidden" />
	</div>
</div>

<footer
	class="w-full items-center bg-background dark:bg-background_dark text-text_primary dark:text-text_primary_dark flex border-t border-primary dark:border-primary_dark">
	<IconTresureLogo styles="fill-text_primary dark:fill-text_primary_dark" />
	<div class="flex flex-col gap-4 w-max">
		<a href="https://tresure.com">Tresure</a>
		<a href="/register">Register</a>
		<a href="/login">Login</a>
	</div>
	<p class="w-max">Contact Email: help@tresure.com</p>
</footer>
