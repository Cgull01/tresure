<script lang="ts">
	function delete_cookie(name: string) {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		// goto('/')
		window.location.href = '/';
	}
</script>

<button
	class="hover:underline underline-offset-2 text-text_primary dark:text-text_primary_dark bg-none px-2 text-2xl flex items-center py-1 active:bg-primary dark:active:bg-primary_dark active:text-text_secondary dark:active:text-text_secondary_dark"
	on:click={() => delete_cookie('jwt')}
>
	Log Out
</button>
