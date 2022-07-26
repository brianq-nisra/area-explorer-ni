<script>
  import { assets } from "$app/paths";
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
	export let filled = true;
	export let center = false;
</script>

<nav style="border-bottom-color: {theme['muted']}; {filled ? 'background-color: ' +  theme['background'] + ';' : ''}">
  <div class="col-wide middle" class:center>
		<a href="https://www.nisra.gov.uk/">
			<picture>
				{#if theme.name == 'dark'}
				<img src="{assets}/img/nisra-full-name-stacked-white.svg" alt="Northern Ireland Statistics and Research Agency">
				{:else if filled == true}
				<img src="{assets}/img/nisra-full-name-stacked-colour.svg" alt="Northern Ireland Statistics and Research Agency">
				{:else}
				<img src="{assets}/img/nisra-full-name-stacked-colour.svg" alt="Northern Ireland Statistics and Research Agency">
				{/if}
			</picture>
		</a>
  </div>
</nav>

<style>
	nav {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		position: relative;
		height: 46px;
		margin-bottom: -46px;
		border-bottom: 1px solid #777;
		z-index: 1;
	}
	picture {
		position: relative;
		top: -3px;
		padding: 0 2px;
	}
	img {
		width: 120px;
	}
	a img:hover {
		cursor: pointer;
	}
</style>