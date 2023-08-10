<script lang="ts">
	let showContextMenu = true;
	let contextMenu: HTMLElement;
	let position = { x: 220, y: 420 };
	function handleClickOutside(event: MouseEvent) {
		if (contextMenu && !contextMenu.contains(event.target as Node)) {
			showContextMenu = false;
		}
	}

	function handleContextmenu(event: MouseEvent) {
		console.log(event);
		position = { x: event.clientX, y: event.clientY };
		showContextMenu = true;
	}
</script>

<svelte:document on:contextmenu|preventDefault={handleContextmenu} on:click={handleClickOutside} />

{#if showContextMenu}
	<div bind:this={contextMenu} class="fixed" style="top: {position.y}px; left: {position.x}px;">
		<h4 class="text-white bg-accent font-sans py-2 mb-1 px-2">Project tools</h4>
		<ul class="border border-black w-full px-3 py-1">
			<li
				class="py-1 hover:bg-black hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black"
			>
				<button>Project settings</button>
			</li>
			<li
				class="py-1 hover:bg-black hover:text-white transition-colors px-2 cursor-pointer active:scale-95 select-none not-last:border-b border-black"
			>
				<button>Add column</button>
			</li>
		</ul>
	</div>
{/if}
