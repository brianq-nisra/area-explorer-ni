<script>
	import { setContext } from "svelte";
  import "../app.css";
	import { themes, urls } from "$lib/config";
	import Warning from "$lib/ui/Warning.svelte";
	import NISRAHeader from "$lib/layout/NISRAHeader.svelte";
	import NISRAFooter from "$lib/layout/NISRAFooter.svelte";

  // STYLE CONFIG
  // Set theme globally (options are 'light' or 'dark')
  let theme = "light";
  setContext("theme", themes[theme]);
</script>

<svelte:head>
  <link rel="icon" href="{urls.base}/favicon.png" />
</svelte:head>

<Warning/>
<NISRAHeader/>

<slot/>

<NISRAFooter/>