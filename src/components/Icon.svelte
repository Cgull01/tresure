<script lang="ts">
	export let name: string;
	export let styles: string = 'w-6 h-6';
	export let stroke: string = 'currentColor';
	export let stroke_width: string = '1';
	export let fill: string = 'none';
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;

	let icons = [
		{
			box: '0 0 24 24',
			name: 'more-horizontal',
			svg: `<circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle
					cx="5"
					cy="12"
					r="1"
				/>`
		},
		{
			box: '0 0 49 49',
			name: 'plus',
			svg: `<rect y="16.5375" width="49" height="15.925" class="group-hover:fill-black" fill="#071525" />
		    <rect
			x="32.4625"
			width="49"
			height="15.925"
			class="group-hover:fill-black"
			transform="rotate(90 32.4625 0)"
			fill="#071525"
		    />`
		},
		{
			box: '0 0 24 24',
			name: 'edit',
			svg: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path
					d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
				/>`
		},
		{
			box: '0 0 24 24',
			name: 'clock',
			svg: `<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />`
		},
		{
			box: '0 0 24 24',
			name: 'trash',
			svg: `<polyline points="3 6 5 6 21 6" /><path
									d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
								/><line x1="10" y1="11" x2="10" y2="17" /><line
									x1="14"
									y1="11"
									x2="14"
									y2="17"
								/>`
		},
		{
			box: '0 0 24 24',
			name: 'x-circle',
			svg: `<circle cx="12" cy="12" r="10" /><line
													x1="15"
													y1="9"
													x2="9"
													y2="15"
												/><line x1="9" y1="9" x2="15" y2="15" /></svg
											>`
		},
		{
			box: '0 0 24 24',
			name: 'colors',
			svg: `<path d="M8.997 13.985c.01 1.104-.88 2.008-1.986 2.015-1.105.009-2.005-.88-2.011-1.984-.01-1.105.879-2.005 1.982-2.016 1.106-.007 2.009.883 2.015 1.985zm-.978-3.986c-1.104.008-2.008-.88-2.015-1.987-.009-1.103.877-2.004 1.984-2.011 1.102-.01 2.008.877 2.012 1.982.012 1.107-.88 2.006-1.981 2.016zm7.981-4.014c.004 1.102-.881 2.008-1.985 2.015-1.106.01-2.008-.879-2.015-1.983-.011-1.106.878-2.006 1.985-2.015 1.101-.006 2.005.881 2.015 1.983zm-12 15.847c4.587.38 2.944-4.492 7.188-4.537l1.838 1.534c.458 5.537-6.315 6.772-9.026 3.003zm14.065-7.115c1.427-2.239 5.846-9.748 5.846-9.748.353-.623-.429-1.273-.975-.813 0 0-6.572 5.714-8.511 7.525-1.532 1.432-1.539 2.086-2.035 4.447l1.68 1.4c2.227-.915 2.868-1.04 3.995-2.811zm-12.622 4.806c-2.084-1.82-3.42-4.479-3.443-7.447-.044-5.51 4.406-10.03 9.92-10.075 3.838-.021 6.479 1.905 6.496 3.447l1.663-1.456c-1.01-2.223-4.182-4.045-8.176-3.992-6.623.055-11.955 5.466-11.903 12.092.023 2.912 1.083 5.57 2.823 7.635.958.492 2.123.329 2.62-.204zm12.797-1.906c1.059 1.97-1.351 3.37-3.545 3.992-.304.912-.803 1.721-1.374 2.311 5.255-.591 9.061-4.304 6.266-7.889-.459.685-.897 1.197-1.347 1.586z"/>`
		},
		{
			box: '0 -960 960 960',
			name: 'directions-right',
			svg: `<path
							d="m242-200 210-280-210-280h74l210 280-210 280h-74Zm252 0 210-280-210-280h74l210 280-210 280h-74Z"
						/>`
		},
		{
			box: '0 0 24 24',
			name: 'direction-left',
			svg: `<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />`
		}
	];
	let displayIcon = icons.find((e) => e.name === name) || icons[0];
</script>

<svg
	{width}
	{height}
	class={styles}
	{stroke}
	{fill}
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={stroke_width}
	viewBox={displayIcon.box}>{@html displayIcon.svg}</svg
>
