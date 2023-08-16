<script>
	import IconDirectionRight from '../../Icons/Icon_direction_right.svelte';
	import Container from '../../components/Container.svelte';
	import LoginForm from '../../components/LoginForm.svelte';
</script>

<div class="w-screen h-screen flex flex-col items-center gap-6 justify-center">
	<div class="text-2xl font-semibold">TRESURE</div>
	<Container title="Login">
		<LoginForm />
	</Container>
	<a
		href="/register"
		class="select-none flex flex-row cursor-pointer mt-6 border border-black px-3 hover:bg-black hover:text-white transition-colors group">
		Register <IconDirectionRight />
	</a>
</div>
