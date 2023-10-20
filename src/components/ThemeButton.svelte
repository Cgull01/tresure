<script>
	let darkMode = false;
	function toggleTheme() {
		darkMode = !darkMode;

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}
</script>

<button on:click={toggleTheme}>Toggle theme</button>
