<script>
	import IconLogo from '../../Icons/Icon_Logo.svelte';
	import IconDirectionRight from '../../Icons/Icon_direction_right.svelte';
	import Container from '../../components/Container.svelte';
	import LoginForm from '../../components/LoginForm.svelte';
	import NavBar from '../../components/NavBar.svelte';

	export let form;
</script>

<div class="w-full h-full bg-radial-gradient dark:bg-radial-gradient_dark ">
	<NavBar />
	<div class="w-full h-max py-52 flex flex-col items-center gap-6 justify-center">
		<Container title="Login">
			<LoginForm {form} />
		</Container>
		<a
			href="/register"
			class="select-none text-text_primary dark:text-text_primary_dark flex bg-background dark:bg-background_dark flex-row cursor-pointer mt-6 border border-primary dark:border-primary_dark px-3 hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors group">
			Create an account <IconDirectionRight />
		</a>
	</div>
</div>
