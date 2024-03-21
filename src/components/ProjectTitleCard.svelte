<script lang="ts">
	import { enhance } from '$app/forms';
	import type { IMember } from '$lib/types';
	import IconPlus from '../Icons/Icon_plus.svelte';
	import IconTrash from '../Icons/Icon_trash.svelte';

	export let project: { id: number; title: string; userMember: IMember };

	let isUserOwner: boolean = project.userMember.roles.some((r: any) => r.role.name === 3);
</script>

<div
	class="w-full flex justify-between items-center hover:bg-primary dark:hover:bg-primary_dark hover:text-text_secondary dark:hover:text-text_secondary_dark transition-colors px-2">
	<a
		href="/projects/{project.id}"
		class="group flex justify-between items-center text-2xl py-2 w-full cursor-pointer group select-none text-start">
		<span class="group group-active:scale-95">
			{project.title}
		</span>
	</a>
	{#if isUserOwner}
		<form action="?/deleteProject" method="POST" use:enhance class="select-none">
			<input type="hidden" name="project_id" value={project.id} />
			<button
				title="Click to delete project"
				class="cursor-pointer active:scale-90 stroke-secondary hover:scale-110 flex group/delete">
				<IconTrash styles="group/delete-active:scale-90" />
			</button>
		</form>
	{:else}
		<!-- <form action="?/removeMember" method="POST" use:enhance class="select-none">
			<input type="hidden" name="member_id" value={project.userMember.find((m)=> m.userId === )} />
			<button
				title="Click to delete project"
				class="cursor-pointer active:scale-90 stroke-secondary hover:scale-110 flex group/delete">
				<IconPlus styles="rotate-45 group/delete-active:scale-90" />
			</button>
		</form> -->
	{/if}
</div>

<hr class="w-full border-t-1 border-primary dark:border-primary_dark self-center" />
