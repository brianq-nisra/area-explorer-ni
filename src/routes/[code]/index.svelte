<script context="module">
	export const prerender = true;
	// getData is a function in utils.js that goes to a url input and looks for a return of csv data
	import { getData } from "$lib/utils";
	// a constant with 3 string urls, options - the places.csv, places - json files for each area code (accessed via urls.places), 
	// quantiles - not sure but not used in index currently
	import { urls } from "$lib/config";
	
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
<script>
  import { base } from "$app/paths";
  import { goto } from '$app/navigation';
	import { suffixer, changeClass, changeStr, adjectify } from "$lib/utils";
	import { types, codes, mapStyle, mapSources, mapLayers, mapPaint } from "$lib/config";
	import Section from "$lib/layout/Section.svelte";
	import ColChart from "$lib/chart/ColChart.svelte";
	import StackedBarChart from "$lib/chart/StackedBarChart.svelte";
	import Em from "$lib/ui/Em.svelte";
	import Select from "$lib/ui/Select.svelte";
	import Map from "$lib/map/Map.svelte";
	import MapSource from "$lib/map/MapSource.svelte";
	import MapLayer from "$lib/map/MapLayer.svelte";
	import GroupChart from "$lib/chart/GroupChart.svelte";

	export let options, place, ew;
	
	let w, cols;
	let map = null;
	let overtime = false;

	let active = {
		selected: null,
		type: null,
		childType: null,
		highlighted: [],
		hovered:  null
	};

	let isChild = {};
	Object.keys(mapLayers).forEach(key => isChild[key] = false);

	function makeData(props) {
		const sum = (a, b) => a + b;
		let code = props[0];
		let val = props[1];
		
		let source = place.data[code][val]['2021'];
		let sourcePrev = place.data[code][val]['2011'];
		let sourceEW = ew.data[code][val]['2021'];

		let keys = codes[code].map(d => d.code);
		let labels = codes[code].map(d => d.label ? d.label : d.code);
		let data = keys.map((key, i) => {
			if (Array.isArray(key)) {
				return {x: labels[i], y: key.map(k => source[k]).reduce(sum, 0), ew: key.map(k => sourceEW[k]).reduce(sum, 0), prev: key.map(k => sourcePrev[k]).reduce(sum, 0)};
			} else {
				return {x: labels[i], y: source[key], ew: sourceEW[key], prev: sourcePrev[key]};
			} 
		});
		
		return data;
	}

	function fitMap(bounds) {
		if (map) {
			map.fitBounds(bounds, {padding: 20});
		}
	}

	function updateActive(place)  {
		let prev = JSON.parse(JSON.stringify(active));
		let code = place.code;
		let type = place.type;
		let children = place.children[0] ? place.children.map(d => d.code) : [];
		let childType = place.type == 'rgn' ? 'cty' : children[0] ? place.children[0].type : null;

		active.selected = code;
		active.type = type;
		active.childType = childType;
		active.highlighted = children;

		let keys = Object.keys(mapLayers);
		let fillProps = ['fill-color', 'fill-opacity'];
		let lineProps = ['line-color', 'line-width', 'line-opacity'];

		// Change layer visibility and paint properties if geography level changes
		if (map && (active.type != prev.type || active.childType != prev.childType)) {
			// Set map layer visibility properties
			keys.forEach(key => {
				let visibility = key == type || (childType && key == childType) ? 'visible' : 'none';
				map.setLayoutProperty(key + '-fill', 'visibility', visibility);
				map.setLayoutProperty(key + '-bounds', 'visibility', visibility);
				if (place.parents[0]) {
					map.setLayoutProperty(key + '-self', 'visibility', visibility);
				}
				isChild[key] = key == childType ? true : false;
			});

			// Set new paint properties
			if (place.parents[0]) {
				fillProps.forEach(prop => map.setPaintProperty(type + '-fill', prop, mapPaint[children[0] ? 'fill-active' : 'fill-self'][prop]));
				lineProps.forEach(prop => {
					map.setPaintProperty(type + '-bounds', prop, mapPaint['line-active'][prop]);
					map.setPaintProperty(type + '-self', prop, mapPaint['line-self'][prop]);
				});
			}
			if (childType) {
				fillProps.forEach(prop => map.setPaintProperty(childType + '-fill', prop, mapPaint['fill-child'][prop]));
				lineProps.forEach(prop => map.setPaintProperty(childType + '-bounds', prop, mapPaint['line-child'][prop]));
			}
		}
	}

	function update(place) {
		updateActive(place);
		fitMap(place.bounds);
	}

	function mapSelect(ev) {
		goto(`${base}/${ev.detail.code}/`, {noscroll: true});
	}

	function menuSelect(ev) {
		goto(`${base}/${ev.detail.value}/`, {noscroll: true});
	}

	function onResize() {
		cols = w < 575 ? 1 : window.getComputedStyle(grid).getPropertyValue("grid-template-columns").split(" ").length;
	}

	$: w && onResize();
	$: chartLabel = overtime ? '2011 comparison' : place && place.parents[0] ? 'Northern Ireland comparison' : null;
	$: place && update(place);
	$: hasChange = place && place.data.population.value.change.all != null;
</script>

<svelte:head>
  <title>{place.name} Census Data</title>
	<meta name="description" content="">
  <meta property="og:title" content="{place.name} Census Data" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{urls.base}/{place.code}/" />
	<meta property="og:description" content="Explore census data for {place.name}." />
	<meta name="description" content="Explore census data for {place.name}." />
</svelte:head>

<Section column="wide">
{#if place && ew}
<div class="grid mtl"><div>
		{#if place.parents[0]}
		<span class="text-small">
			{#each [...place.parents].reverse() as parent, i}
			<a href="{base}/{parent.code}/" sveltekit:noscroll>{parent.name}</a>{@html ' &gt; '}
			{/each}
			{place.name}
		</span><br/>
		{/if}
		<span class="text-big title">{place.name}</span>
	</div>
	<div>
		<div style="width: 260px; padding-top: 5px;" class:float-right={cols > 1}>
			<b>Search</b> for your Local Government District (enter town or area name).
			<Select {options} group="typestr" search={true} on:select="{menuSelect}"/>
			<!-- <a href="#" onclick="window.print();return false;" title="Click to print this page">Print this page</a> -->
			<button onclick="window.print();">Print</button>
			<!-- Option with an image instead of link -->
			<!-- <a href="#" onclick="window.print();return false;" title="Click to print this page"><img src="printer.png" /></a> -->
		</div>
	</div>
</div>


<div class="grid mts">
	<div class="text-bold">
		Click to:
		<button class="btn" class:btn-active={!overtime} on:click={() => overtime = false}>Compare to Northern Ireland</button>
		<button class="btn" class:btn-active={overtime} on:click={() => overtime = true}>Compare to 2011 Census</button>
	</div>
</div>

<div id="grid" class="grid mt" bind:clientWidth={w}>
	<div style="grid-column: span {cols};">
		<h2>Census 2021</h2>
	</div>
	<div class = "div-grey-box" style="line-height: 1.3;">
		<h3 style="margin: 0 0 10px 0; line-height: 1.78;">Overview</h3>
		{#if place.type == 'ew' || place.type =='ctry'}
			The population of {place.name} was {place.data.population.value['2021'].all.toLocaleString()} at the time of the 2021 Census.
			{:else}
			The population of {place.name} was {place.data.population.value['2021'].all.toLocaleString()} at the time of the 2021 Census, which made it the 
			{#if place.data.population.value_rank['2021'].all == 1}
			largest area.
			{:else if place.data.population.value_rank['2021'].all == place.count}
			smallest area.
			{:else if place.data.population.value_rank['2021'].all < place.count/2 && place.data.population.value_rank['2021'].all != 1}
			{place.data.population.value_rank['2021'].all.toLocaleString()}{suffixer(place.data.population.value_rank['2021'].all)} largest area.
			{:else}
			{place.count + 1 - place.data.population.value_rank['2021'].all.toLocaleString()}{suffixer(place.count + 1 - place.data.population.value_rank['2021'].all)} smallest area.
			{/if}
			{/if}
			{#if hasChange}
			{#if place.data.population.value.change.all == 0}
			This area saw no change in population since the 2011 Census.
			{:else if place.data.population.value.change.all >0}
			This area saw a population increase of {changeStr(place.data.population.value.change.all, '%', 1)} since the 2011 Census.
			{:else}
			This area saw a population decrease of {changeStr(place.data.population.value.change.all, '%', 1)} since the 2011 Census.
			{/if}
			{/if}
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Population</h3>
		<span class="text-big" style="font-size: 2.8em;">{place.data.population.value['2021'].all.toLocaleString()}</span><br/>
		{#if !overtime}
		{#if place.type != 'ew'}
		<span class="text-small"><Em>{place.data.population.value['2021'].all / ew.data.population.value['2021'].all >= 0.001 ? ((place.data.population.value['2021'].all / ew.data.population.value['2021'].all) * 100).toFixed(1) : '<0.1'}%</Em> of Northern Ireland population</span>
		{#if place.type != 'ctry'}
		<div class="text-small muted">
			{#if place.data.population.value_rank['2021'].all == 1}
			The largest
			{:else if place.data.population.value_rank['2021'].all == place.count}
			The smallest
			{:else if place.data.population.value_rank['2021'].all < place.count/2 && place.data.population.value_rank['2021'].all != 1}
			{place.data.population.value_rank['2021'].all.toLocaleString()}{suffixer(place.data.population.value_rank['2021'].all)} largest
			{:else}
			{place.count + 1 - place.data.population.value_rank['2021'].all.toLocaleString()}{suffixer(place.count + 1 - place.data.population.value_rank['2021'].all)} smallest
			{/if}
			 population of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}</div>
		{/if}
		{/if}
		{:else if hasChange}
		<span class="text-small"><Em><span class="{changeClass(place.data.population.value.change.all)}">{changeStr(place.data.population.value.change.all, '%', 1)}</span></Em> since 2011 Census</span>
		{#if !['ew', 'ctry'].includes(place.type)}
		<div class="text-small muted">
			{#if place.data.population.value_rank.change.all == 0}
			{:else if place.data.population.value_rank.change.all == place.count}
			The smallest of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}
			{:else if place.data.population.value_rank.change.all == 1}
			The largest of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}
			{:else if place.data.population.value_rank.change.all < place.count/2 && place.data.population.value_rank.change.all != 1}
			{place.data.population.value_rank.change.all.toLocaleString()}{suffixer(place.data.population.value_rank.change.all)} largest of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}
			{:else}
			{place.count + 1 - place.data.population.value_rank.change.all.toLocaleString()}{suffixer(place.count + 1 - place.data.population.value_rank.change.all)} smallest of {place.count.toLocaleString()} {types[place.type].pl.toLowerCase()}
			{/if}
		</div>
		{/if}
		{/if}
	</div>
	<div class = "div-grey-box">
		<div class="row" style="display: flex; cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#households-info" aria-expanded="false" aria-controls="households-info">
			<div class="blocktitle" style="margin: 0; width: 100%">Households</div>
			<div class="blockinfoicon">&#x1F6C8;</div>
		</div>
		<div class="collapse" id="households-info">
			<div class="card card-body">
			Description of households variable that crosses more than one line <!-- definition of households -->
			</div>
		</div>
		<span class="text-big" style="font-size: 2.8em;">{place.data.households.value['2021'].all_households.toLocaleString()}</span><br/>
		{#if !overtime}
		{#if place.type != 'ew'}
		<span class="text-small"><Em>{place.data.households.value['2021'].all_households / ew.data.households.value['2021'].all_households >= 0.001 ? ((place.data.households.value['2021'].all_households / ew.data.households.value['2021'].all_households) * 100).toFixed(1) : '<0.1'}%</Em> of Northern Ireland households</span>
		{/if}
		{:else if hasChange}
		<span class="text-small"><Em><span class="{changeClass(place.data.households.value.change.all_households)}">{changeStr(place.data.households.value.change.all_households, '%', 1)}</span></Em> since 2011 Census</span>
		{/if}
	</div>
	<div class = "div-grey-box">

		<div class="row" style="display: flex; cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#broadagebands-info" aria-expanded="false" aria-controls="broadagebands-info">
			<div class="blocktitle" style="margin: 0; width: 100%">Broad age bands (years)</div>
			<div class="blockinfoicon">&#x1F6C8;</div>
		</div>
		<div class="collapse" id="broadagebands-info">
			<div class="card card-body">
			Description of broadagebands-info variable that crosses more than one line <!-- definition of broadagebands-info -->
			</div>
		</div>


		
		<div class="chart" style="height: 100px; padding-top:15pt">
			<ColChart data="{place && makeData(['age', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}"/>
		</div>
		{#if chartLabel && !(overtime && !hasChange)}
		<br><div class="text-small muted"><li class="line"></li> {chartLabel}</div>
		{/if}
	</div>
	<div class = "div-grey-box">
		
		<div class="row" style="display: flex; cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#sex-info" aria-expanded="false" aria-controls="sex-info">
			<div class="blocktitle" style="margin: 0; width: 100%">Sex</div>
			<div class="blockinfoicon">&#x1F6C8;</div>
		</div>
		<div class="collapse" id="sex-info">
			<div class="card card-body">
			Description of sex-info variable that crosses more than one line <!-- definition of sex-info -->
			</div>
		</div>
		<br>



		<StackedBarChart data="{place && makeData(['population', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		
		<div class="row" style="display: flex; cursor: pointer;" data-bs-toggle="collapse" data-bs-target="#householdsize-info" aria-expanded="false" aria-controls="householdsize-info">
			<div class="blocktitle" style="margin: 0; width: 100%">Household size</div>
			<div class="blockinfoicon">&#x1F6C8;</div>
		</div>
		<div class="collapse" id="householdsize-info">
			<div class="card card-body">
			Description of householdsize-info variable that crosses more than one line <!-- definition of householdsize-info -->
			</div>
		</div>
		<br>



		<StackedBarChart data="{place && makeData(['hhsize', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div style="grid-column: span {cols};">
		<h3>Explore related areas</h3>
	</div>
	<div id="map" style="grid-column: span {cols == 2 ? 2 : cols && cols > 2 ? cols - 1 : 1};">
		<Map bind:map location={{bounds: place.bounds}} options={{fitBoundsOptions: {padding: 20}}} style={mapStyle}>
			{#each ['dea'] as key}
			<MapSource {...mapSources[key]}>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-fill"
					type="fill"
					isChild={isChild[key]}
					click={true}
					selected={active.selected}
					on:select={mapSelect}
					highlight={true}
					highlighted={active.highlighted}
					hover={true}
					hovered={active.hovered}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['fill-self'] : active.childType == key ? mapPaint['fill-child'] : mapPaint.fill}/>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-bounds"
					type="line"
					selected={active.selected}
					highlight={true}
					highlighted={active.highlighted}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-active'] : active.childType == key ? mapPaint['line-child'] : mapPaint.line}/>
				<MapLayer
					{...mapLayers[key]}
					id="{key}-self"
					type="line"
					selected={active.selected}
					layout={{visibility: active.type == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-self'] : mapPaint.line}/>
			</MapSource>
			{/each}
			<MapSource {...mapSources.crd}>
			{#each ['lgd'] as key}
				<MapLayer
					{...mapLayers[key]}
					id={key + "-fill"}
					type="fill"
					isChild={isChild[key]}
					click={true}
					selected={active.selected}
					on:select={mapSelect}
					highlight={true}
					highlighted={active.highlighted}
					hover={true}
					hovered={active.hovered}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['fill-active'] : active.childType == key ? mapPaint['fill-child'] : mapPaint.fill}/>
				<MapLayer
					{...mapLayers[key]}
					id={key + "-bounds"}
					type="line"
					selected={active.selected}
					highlight={true}
					highlighted={active.highlighted}
					layout={{visibility: active.type == key || active.childType == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-active'] : active.childType == key ? mapPaint['line-child'] : mapPaint.line}/>
				<MapLayer
					{...mapLayers[key]}
					id={key + "-self"}
					type="line"
					selected={active.selected}
					layout={{visibility: active.type == key ? 'visible' : 'none'}}
					paint={active.type == key ? mapPaint['line-self'] : mapPaint.line}/>
				{/each}
			</MapSource>
		</Map>
	</div>
	<div>
		<span>
		{#if place.parents[0]}
		<span class="text-bold">{place.name} is located in </span>
		{#each [...place.parents].reverse() as parent, i}
		<span style="display: block; margin-left: {i > 0 ? (i - 1) * 15 : 0}px">{@html i > 0 ? '↳ ' : ''}<a href="{base}/{parent.code}/" sveltekit:noscroll>{parent.name}</a></span>
		{/each}
		{/if}
		</span>
	</div>
	<div>
		<span>
		{#if ew.children[0]}
		<span class="text-bold">Districts within Northern Ireland</span><br/>
		{#each ew.children as child, i}
		<a href="{base}/{child.code}/" sveltekit:noscroll>{child.name}</a>{ i < ew.children.length - 1 ? '; ' : ''}
		{/each}
		{:else}
		<span class="muted">No areas within {place.name}</span>
		{/if}
		</span>
	</div>
	<div style="grid-column: span {cols};">
		<h2>Nationality Statistics for {place.name} <span class="title-inset muted">Census 2021</span></h2>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">National identity</h3><br/>
		<StackedBarChart data="{place && makeData(['natid', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Country of birth</h3><br/>
		<StackedBarChart data="{place && makeData(['cob', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Passport(s) held</h3><br/>
		<StackedBarChart data="{place && makeData(['passport', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div style="grid-column: span {cols};">
		<h2>Language Statistics for {place.name} <span class="title-inset muted">Census 2021</span></h2>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Main language</h3><br/>
		<StackedBarChart data="{place && makeData(['mainlang', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Knowledge of Irish</h3><br/>
		<StackedBarChart data="{place && makeData(['irish', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0; font-size: 1.35em;">Knowledge of Ulster-Scots</h3><br/>
		<StackedBarChart data="{place && makeData(['ulster', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div style="grid-column: span {cols};">
		<h2>Religion and Ethnicity Statistics for {place.name} <span class="title-inset muted">Census 2021</span></h2>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Religion</h3><br/>
		<StackedBarChart data="{place && makeData(['religion', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Religion brought up in</h3><br/>
		<StackedBarChart data="{place && makeData(['religion_or_brought_up', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div class = "div-grey-box">
		<h3 style="margin: 0;">Ethnic group</h3><br/>
		<StackedBarChart data="{place && makeData(['ethnic', 'perc', '2021'])}" zKey="{overtime && hasChange ? 'prev' : !overtime && place.type != 'ew' ? 'ew' : null}" label={chartLabel}/>
	</div>
	<div style="grid-column: span {cols};">
		<h3>Further Census Resources</h3><br/>
			<a href="https://www.nidirect.gov.uk" class="link"><u>Link1</u></a><br/>
			<a href="https://www.nidirect.gov.uk" class="link"><u>Link2</u></a><br/>
			<a href="https://www.nidirect.gov.uk" class="link"><u>Link3</u></a><br/>
	</div>
</div>
{/if}
</Section>

<style>
	a {
		color: rgb(0, 60, 87);
	}
	h3 {
		margin-top: 8px;
	}
	.div-grey-box {
    	line-height: 1.78;
    	overflow: hidden;
    	box-shadow: 0 2px #4140424d;
    	background-color: #f5f5f6;
    	padding: 16px 16px;
		
    }
	.btn {
		padding: 2px 4px;
		margin: 0;
		border: 2px solid #00205b;
		cursor: pointer;
		color: #00205b;
		background-color: lightgrey;
	}
	.btn-active {
		color: white;
		background-color: #00205b;
	}
	.increase {
		color: darkgreen;
	}
	.increase::before {
		content: '▲';
		color: darkgreen;
	}
	.decrease {
		color: darkred;
	}
	.decrease::before {
		content: '▼';
		color: darkred;
	}
	.nochange {
		font-size: 0.85em;
		color: grey;
	}
	.line {
		background-color: #CEDC20;
		width: 25px;
  	height: 4px;
  	display: inline-block;
		margin-bottom: 3px;
	}
	.title {
		display: inline-block;
		margin-top: -3px;
	}
	.text-right {
		text-align: right;
	}
	.float-right {
		float: right;
	}
	.inline {
		display: inline-block;
	}
	.condensed {
		line-height: 1.1em;
	}
	.mt {
		margin-top: 20px;
	}
	.mts {
		margin-top: 10px;
	}
	.mtl {
		margin-top: 55px;
	}
	.mbs {
		margin-bottom: 10px;
	}
	.grid {
		display: grid;
		width: 100%;
		grid-gap: 10px;
		grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
		justify-content: stretch;
	}
	.title-inset {
		font-weight: normal;
		font-size: 13.6px;
	}
	#grid {
		grid-gap: 20px !important;
	}
	.chart {
		position: relative;
		width: 100%;
	}
	#map {
		grid-row: span 2;
		min-height: 400px;
	}

	.tooltip {
		position: relative;
		display: inline-block;
	}

	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: #666666;
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 0;
		bottom: 100%;
		right: 100%;
		font-size: 12pt;

		/* Position the tooltip */
		position: absolute;
		z-index: 1;
	}

	.tooltip:hover .tooltiptext {
		visibility: visible;
	}

.collapse:not(.show){
    display:none
}
.collapsing{
    height:0;
    overflow:hidden;
    transition:height .35s ease
}

	.show{
		display:block!important;
	}

	.card{
    --bs-card-spacer-y:0.1rem;
    --bs-card-spacer-x:0.5rem;
    --bs-card-title-spacer-y:0.5rem;
    --bs-card-border-width:1px;
    --bs-card-border-color:var(--bs-border-color-translucent);
    --bs-card-border-radius:0.375rem;
    --bs-card-box-shadow: ;
    --bs-card-inner-border-radius:calc(0.375rem - 1px);
    --bs-card-cap-padding-y:0.5rem;
    --bs-card-cap-padding-x:1rem;
    --bs-card-cap-bg:rgba(0, 0, 0, 0.03);
    --bs-card-cap-color: ;
    --bs-card-height: ;
    --bs-card-color: ;
    --bs-card-bg:#fff;
    --bs-card-img-overlay-padding:1rem;
    --bs-card-group-margin:0.75rem;
    position:relative;
    display:flex;
    flex-direction:column;
    min-width:0;
    height:var(--bs-card-height);
    word-wrap:break-word;
    background-color:var(--bs-card-bg);
    background-clip:border-box;
    border:var(--bs-card-border-width) solid var(--bs-card-border-color);
    border-radius:var(--bs-card-border-radius)
}

.card-body{
    flex:1 1 auto;
    padding:var(--bs-card-spacer-y) var(--bs-card-spacer-x);
    color:var(--bs-card-color);
	font-size: 10pt;
}



	.blocktitle {
	font-size: 1.3em;
	margin: 40px 0 -10px 0;
	font-weight: bold;
}

	.blockinfoicon {
		font-size: 14pt;
	}



	@media print {
		.highlited {
			color: red !important;
			-webkit-print-color-adjust: exact;
  		}
	}
	</style>