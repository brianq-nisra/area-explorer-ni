<script>
	import { changeClass, changeStr } from "../utils";

	export let data;
	export let xKey = "x";
	export let yKey = "y";
	export let zKey = "ew";
	export let colors = ['#00205B','#6C63AC', '#781C87',   '#C11B71', '#FB7979', '#F66068', '#801650', '#0D9AA2', 'lightgrey'];
	export let textColor = '#555';
	export let mutedColor = '#999';
	export let decimals = null;
	export let round = false;
	
	$: sum = data.map(d => d[yKey]).reduce((a, b) => a + b, 0);
	$: psum = data.map(d => d[zKey]).reduce((a, b) => a + b, 0);

	function toPerc(val) {
		let str;
		if (decimals) {
			str = ((val / sum) * 100).toFixed(decimals) + '%';
		} else if ((val / sum) * 100 < 0.1) {
			str = '<0.1%';
		} else if ((val / sum) * 100 < 1) {
			str = '<1%';
		} else {
			str = ((val / sum) * 100).toFixed(0) + '%';
		}
		return str;
	}
</script>

<ul>
	{#each data as item, i}
	<li style="color: {textColor}">
		<div class="bullet" class:round style="background-color: {colors[i]}"/>
		{item[xKey]} {toPerc(item[yKey])}
		{#if zKey == "prev"}
		<span class="" style="color: #3878C5; font-weight: bold">(2011 {changeStr(Math.round(item[zKey]), '%)')}</span>
		{:else if zKey}
		<span class="" style="color: #3878C5; font-weight: bold">(NI {toPerc(item[zKey])})</span>
		{/if}
	</li>
	{/each}
</ul>

<style>
	ul {
		margin: 0;
		padding: 0;
		font-size: 0.85em;
		text-transform: none;
	}
	li {
		display: inline-block;
		margin-right: 10px;
	}
	.bullet {
  	height: 15px;
  	width: 15px;
		display: inline-block;
		transform: translate(0, 2px);
	}
	.round {
		border-radius: 50%;
		transform: scale(0.9);
		transform: translate(0, 3px);
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
		color: grey;
		text-transform: none;
	}
</style>