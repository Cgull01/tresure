<script lang="ts">
	import type { ITag } from '$lib/types';
	import { createEventDispatcher, onDestroy } from 'svelte';
	import IconColors from '../Icons/Icon_colors.svelte';
	import IconCheck from '../Icons/Icon_check.svelte';

	const TAG_COLORS = [
		'red-700',
		'blue-700',
		'green-700',
		'yellow-700',
		'purple-700',
		'pink-700',
		'orange-700',
		'indigo-700'
	];

	let icon_color: string = TAG_COLORS[0];

	let color_dropdown_visible = false;
	let dropdown_element: HTMLElement;

	const dispatch = createEventDispatcher();

	function handleClickOutsideColors(event: MouseEvent) {
		if (dropdown_element && !dropdown_element.contains(event.target as Node)) {
			color_dropdown_visible = false;
		}
	}

	window.addEventListener('click', handleClickOutsideColors);

	onDestroy(() => {
		window.removeEventListener('click', handleClickOutsideColors);
	});
</script>

<button
	type="button"
	class="p-1 group border rounded-md bg-background dark:bg-background_dark w-max h-max cursor-pointer group border-primary dark:border-primary_dark hover:border-gray-400 focus:border-primary"
	on:click|stopPropagation={() => {
		color_dropdown_visible = !color_dropdown_visible;
	}}
>
	<IconColors styles="fill-{icon_color} w-6 h-6 group group-active:scale-110" />
</button>
{#if color_dropdown_visible}
	<div class="absolute mt-8" bind:this={dropdown_element}>
		<div
			class="grid grid-cols-4 grid-rows-2 bg-background dark:bg-background_dark p-2 border border-primary dark:border-primary_dark gap-2"
		>
			{#each TAG_COLORS as color, i}
				<button
					type="button"
					class={`rounded-full w-6 h-6 bg-${color} hover:scale-95 cursor-pointer`}
					on:click={() => {
						dispatch('colorSelect', color);
						icon_color = color;
					}}
				/>
			{/each}
		</div>
	</div>
{/if}
