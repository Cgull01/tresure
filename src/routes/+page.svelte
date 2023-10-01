<script>
	import NavBar from '../components/NavBar.svelte';
</script>

<div class="flex flex-col w-screen h-screen">
	<NavBar>
		<a href="/projects">To Projects </a>
		<a href="/register">To Register </a>
		<a href="/login">To Login </a>
	</NavBar>
	<div class="pt-48 background-pattern w-full h-full">
		<h1 class="text-2xl font-extrabold">
			Project management made <span class="bg-primary text-secondary px-2">simple</span>
		</h1>
	</div>
</div>
