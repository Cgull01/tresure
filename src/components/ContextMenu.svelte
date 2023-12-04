<script lang="ts">

	export let visible = false;

	let contextMenu: HTMLElement;
	let contextMenuPosition = { x: 220, y: 420 };

	function handleClickOutside(event: MouseEvent) {
		if (contextMenu && !contextMenu.contains(event.target as Node)) {
			visible = false;
		}
	}

	function handleContextmenu(event: MouseEvent) {
		contextMenuPosition = { x: event.clientX, y: event.clientY };
	}

</script>

<svelte:window
	on:contextmenu||preventDefault={handleContextmenu}
	on:click={handleClickOutside}
	on:scroll={() => (visible = false)}
/>

{#if visible}
	<div
		bind:this={contextMenu}
		class="fixed z-50"
		style="top: {contextMenuPosition.y}px; left: {contextMenuPosition.x}px;"
	>
		<slot/>
	</div>
{/if}
