<script context="module">
	export const prerender = true;
</script>
<script>
  import { base } from "$app/paths";
  import { urls } from "$lib/config";
  import Section from "$lib/layout/Section.svelte";
	// getData is a function in utils.js that goes to a url input and looks for a return of csv data
	import { getData } from "$lib/utils";
	// a constant with 3 string urls, options - the places.csv, places - json files for each area code (accessed via urls.places), 
	// quantiles - not sure but not used in index currently

	// create a reference to the json for the current area to be loaded - called in the load() func below
	async function loadArea(code, fetch) {
		let res = await fetch(urls.places + code + '.json');
		let json = await res.json();

		return json;
	}

	export async function load({ params, fetch }) {
		let code = params.code;

		let res = await getData(urls.options, fetch);
		
		let lookup = {};
		res.forEach(d => lookup[d.code] = d.name);
		res.forEach(d => {
		  d.typepl = types[d.type].pl;
		  d.typenm = types[d.type].name;
//		  d.typestr = lookup[d.parent] ? `${lookup[d.parent]} includes ${types[d.type].name} within ${lookup[d.parent]}` : '';
		  d.typestr = lookup[d.parent] ? `${types[d.type].name} within ${lookup[d.parent]}` : '';
		});

		let options = res.sort((a, b) => a.name.localeCompare(b.name));
		let ew = await loadArea('N92000001', fetch);
		let place = await loadArea(code, fetch);

		return {
			props: { options, place, ew }
		}
	}
</script>


<svelte:head>
  <title>Census Area Explorer</title>
  <meta name="description" content="">
  <meta property="og:title" content="Census Area Explorer" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{urls.base}/" />
	<meta property="og:description" content="Explore census data for places in Northern Ireland." />
	<meta name="description" content="Explore census data for places in Northern Ireland." />
</svelte:head>

<div>
  <div style="width: 260px; padding-top: 5px;" class:float-right={cols > 1}>
  <Select {options} group="typestr" search={true} on:select="{menuSelect}"/>
  </div>
</div>
<Section column="wide">
  <div class="block">
    <span class="text-big title">Area Explorer</span>
    <p>Select Northern Ireland or a Local Government District to start exploring</p>
    <ul>
      <li><a href="{base}/N92000001"><strong>Northern Ireland</strong></a></li>
      <ul>
          <li><a href="{base}/N09000001">Antrim and Newtownabbey</a></li>
          <li><a href="{base}/N09000002">Armagh City, Banbridge and Craigavon</a></li>
          <li><a href="{base}/N09000003">Belfast</a></li>
          <li><a href="{base}/N09000004">Causeway Coast and Glens</a></li>
          <li><a href="{base}/N09000005">Derry City and Strabane</a></li>
          <li><a href="{base}/N09000006">Fermanagh and Omagh</a></li>
          <li><a href="{base}/N09000007">Lisburn and Castlereagh</a></li>
          <li><a href="{base}/N09000008">Mid and East Antrim</a></li>
          <li><a href="{base}/N09000009">Mid Ulster</a></li>
          <li><a href="{base}/N09000010">Newry, Mourne and Down</a></li>
          <li><a href="{base}/N09000011">Ards and North Down</a></li>
       </ul>
    </ul>
  </div>
</Section>

<style>
	.block {
    margin-top: 55px;
    display: block;
	}
	.title {
		display: inline-block;
		margin-top: -3px;
	}
</style>