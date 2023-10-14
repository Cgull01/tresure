<script>
	import IconLogo from '../../Icons/Icon_Logo.svelte';
	import IconDirectionRight from '../../Icons/Icon_direction_right.svelte';
	import Container from '../../components/Container.svelte';
	import LoginForm from '../../components/LoginForm.svelte';
	import NavBar from '../../components/NavBar.svelte';

	export let form;
</script>

<NavBar />
<div class="w-full h-full py-52 flex flex-col items-center gap-6 justify-center background-pattern">
	<Container title="Login">
		<LoginForm {form} />
	</Container>
	<a
		href="/register"
		class="select-none flex flex-row cursor-pointer mt-6 bg-white border border-primary px-3 hover:bg-primary hover:text-secondary transition-colors group"
	>
		Create an account <IconDirectionRight />
	</a>
</div>
