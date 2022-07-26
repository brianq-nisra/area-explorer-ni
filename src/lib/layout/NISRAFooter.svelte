<script>
  import { assets } from "$app/paths";
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
</script>

<footer style="color: {theme['text']}; background-color: #00205b;">
	<div class="col-wide" data-analytics="footer">
		<a href="https://www.nisra.gov.uk/">
			{#if theme == 'dark'}
			<img
				class="logo-img"
				src="{assets}/img/nisra-logo-white-transparent-bkgrd.png"
				alt="Northern Ireland Statistics and Research Agency" />
			{:else}
			<img
				class="logo-img"
				src="{assets}/img/nisra-logo-colour-transparent-bkgrd.png"
				alt="Northern Ireland Statistics and Research Agency" />
			{/if}
		</a>
		<ul>
			<li><a href="https://www.nisra.gov.uk/contact" class="link" style="color: {theme['text']}">Contact us</a></li>
			<li><a href="https://www.nisra.gov.uk/nisra-privacy-notice" class="link" style="color: {theme['text']}">Cookies and privacy</a></li>
			<li><a href="https://www.nisra.gov.uk/terms-and-conditions" class="link" style="color: {theme['text']}">Terms and conditions</a></li>
			<li><a href="https://www.nisra.gov.uk//cookies" class="link" style="color: {theme['text']}">Cookies</a></li>
			<li><a href="https://www.nisra.gov.uk/nisra-privacy-notice" class="link" style="color: {theme['text']}">Privacy</a></li>
			<li><a href="https://www.nisra.gov.uk/accessibility-statement-nisra" class="link" style="color: {theme['text']}">Accessibility Statement</a></li>
		</ul>
		<hr style="border-top-color: {theme['muted']}" />
	</div>
</footer>

<style>
	footer {
		padding-bottom: 72px;
		padding-top: 36px;
		font-size: 18px;
	}
	footer a.link {
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		text-decoration: underline;
		display: inline-block;
	}
	footer a.link:hover {
		text-decoration: none;
	}
	footer a.link:active {
		outline: 3px solid transparent;
		background-color: #fd0;
		-webkit-box-shadow: 0 -2px #fd0, 0 4px #222;
		box-shadow: 0 -2px #fd0, 0 4px #222;
		color: #222;
		text-decoration: none;
	}
	footer hr {
		margin-bottom: 27px;
		margin-top: 36px;
		border: none;
		border-top: 1px solid #777;
	}
	ul {
		padding: 0;
		margin: 0;
	}
	li {
		margin-right: 18px;
		display: inline-block;
	}
	.logo-img {
		margin-bottom: 2px;
		width: 120px;
	}
	.ogl-img {
		margin: 0 0.5rem 0.2rem 0;
		width: 59px;
		height: 24px;
		vertical-align: middle;
	}
	.license {
		vertical-align: top;
	}
	a img:hover {
		cursor: pointer;
	}
</style>