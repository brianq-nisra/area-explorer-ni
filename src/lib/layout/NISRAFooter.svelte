<script>
  import { assets } from "$app/paths";
	import { getContext } from 'svelte';

	export let theme = getContext('theme');
</script>

<footer style="color: #ffffff; background-color: #00205b;">
	<div class="col-wide" data-analytics="footer">
		<div style="width: 20%; float:left">
				<h3>Links</h3><br>
				<ul>
					<li><a href="https://www.nidirect.gov.uk" class="link" style="color: #ffffff">NIDirect</a></li>
					<li><a href="https://www.gov.uk/" class="link" style="color: #ffffff">GOV.UK</a></li>
					<li><a href="http://www.ninis.nisra.gov.uk/" class="link" style="color: #ffffff">NINIS</a></li>
				</ul>	
		</div>
		<div style="width: 80%; float:right">
				<h3>Follow NISRA</h3><br>
				<ul> 
					<li><a href="https://www.facebook.com/nisra.gov.uk" class="link" style="color: #ffffff">Facebook</a></li>
					<li><a href="https://twitter.com/NISRA" class="link" style="color: #ffffff">Twitter</a></li>
					<li><a href="https://www.youtube.com/user/nisrastats" class="link" style="color: #ffffff">YouTube</a></li>
				</ul>
		</div>
		<div style="width: 20%; float:left">
			<ul>
				<li><a href="https://www.nisra.gov.uk/contact" class="link" style="color: #ffffff">Contact us</a></li>
				<li><a href="https://www.nisra.gov.uk/nisra-privacy-notice" class="link" style="color: #ffffff">Cookies and privacy</a></li>
				<li><a href="https://www.nisra.gov.uk/terms-and-conditions" class="link" style="color: #ffffff">Terms and conditions</a></li>
				<li><a href="https://www.nisra.gov.uk//cookies" class="link" style="color: #ffffff">Cookies</a></li>
				<li><a href="https://www.nisra.gov.uk/nisra-privacy-notice" class="link" style="color: #ffffff">Privacy</a></li>
				<li><a href="https://www.nisra.gov.uk/accessibility-statement-nisra" class="link" style="color: #ffffff">Accessibility Statement</a></li>
			</ul>
		</div>
	</div>
</footer>

<style>
	footer {
		padding-bottom: 20px;
		padding-top: 20px;
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
		margin-bottom: 10px;
		margin-top: 10px;
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