<script>
	import IconLogo from '../../Icons/Icon_Logo.svelte';
	import IconDirectionRight from '../../Icons/Icon_direction_right.svelte';
	import Container from '../../components/Container.svelte';
	import NavBar from '../../components/NavBar.svelte';

	import RegisterForm from '../../components/RegisterForm.svelte';

	export let form;
</script>
<svelte:head>
	<title>TRESURE - sign up</title>
</svelte:head>
<div class="h-full w-full bg-light dark:bg-dark">
	<NavBar />

	<div class="w-full h-max absolute top-1/4 flex flex-col items-center gap-6 justify-center">
		<Container title="Create New Account">
			<RegisterForm {form} />
		</Container>
		<a
			href="/login"
			class="select-none text-text_primary dark:text-text_primary_dark flex bg-background dark:bg-background_dark flex-row cursor-pointer mt-6 border border-primary dark:border-primary_dark px-3 hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors group">
			Already have an account? <IconDirectionRight />
		</a>
	</div>
</div>
