<script>
	import IconTresure from '../Icons/Icon_Tresure.svelte';
	import ThemeButton from './ThemeButton.svelte';
</script>

<div
	class="p-2 pr-6 sticky top-0 bg-background dark:bg-background_dark h-max flex flex-row text-text_primary dark:text-text_primary_dark border-primary dark:border-primary_dark border-b">
	<a href="/">
		<IconTresure styles="fill-text_primary dark:fill-text_primary_dark" />
	</a>
	<nav class="flex flex-row justify-end w-full items-center px-16 gap-5">
		<slot />
	</nav>
	<ThemeButton />
</div>
