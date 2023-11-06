<script>
	import IconMoon from '../Icons/Icon_moon.svelte';
	import IconSun from '../Icons/Icon_sun.svelte';
	import { THEME_TOGGLE } from '../routes/projects/[slug]/stores';

	function toggleTheme() {
		$THEME_TOGGLE = !$THEME_TOGGLE;
		$THEME_TOGGLE
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<button on:click={toggleTheme} class="text-text_primary dark:text-text_primary_dark">
	{#if $THEME_TOGGLE}
		<IconMoon />
	{:else}
		<IconSun />
	{/if}
</button>
