<script>
	import IconLogo from '../../Icons/Icon_Logo.svelte';
	import IconDirectionRight from '../../Icons/Icon_direction_right.svelte';
	import Container from '../../components/Container.svelte';
	import NavBar from '../../components/NavBar.svelte';

	import RegisterForm from '../../components/RegisterForm.svelte';

	export let form;
</script>

<NavBar />

<div class="w-full background-pattern h-full py-52 flex flex-col items-center gap-6 justify-center">
	<Container title="Create New Account">
		<RegisterForm {form} />
	</Container>
	<a
		href="/login"
		class="select-none flex bg-background flex-row cursor-pointer mt-6 border border-primary px-3 hover:bg-primary hover:text-secondary transition-colors group"
	>
		Already have an account? <IconDirectionRight />
	</a>
</div>
