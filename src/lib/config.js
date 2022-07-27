// CORE CONFIG
export const themes = {
  'light': {
		'name': 'light',
    'text': '#222',
    'muted': '#777',
    'pale': '#f0f0f0',
    'background': '#fff'
  },
  'dark': {
		'name': 'dark',
    'text': '#fff',
    'muted': '#bbb',
    'pale': '#333',
    'background': '#222'
  }
};

export const urls = {
	options: 'https://raw.githubusercontent.com/MaireBrolly/test_jsons/main/2021/places_test_expanded_named.csv',
	places: 'https://raw.githubusercontent.com/MaireBrolly/test_jsons/main/2021/',
	base: 'https://MaireBrolly.github.io/area-explorer-ni/'
};

export const types = {
//	ew: {name: '', pl: ''},
//	oa: {name: 'Output area', pl: 'Output areas'},
//	lsoa: {name: 'Super Output Area', pl: 'Super Output Areas'},
dea: {name: 'District Electoral Area', pl: 'District Electoral Areas'},
town: {name: 'settlement', pl: 'Town'},
lgd: {name: 'Local Government District', pl: 'Districts'},
//	cty: {name: 'County', pl: 'Counties'},
//	rgn: {name: 'Region', pl: 'Regions'},
ctry: {name: 'Country', pl: 'Countries'}
};

export const codes = {
age: [
	{code: '0-14 years'},
	{code: '15-39 years'},
	{code: '40-64 years'},
	{code: '65+ years'}	
],
cob: [
	{code: 'ni', label: 'Northern Ireland'},
	{code: 'england', label: 'England'},
	{code: 'scotland', label: 'Scotland'},
	{code: 'wales', label: 'Wales'},
	{code: 'roi', label: 'Republic of Ireland'},
	{code: 'other', label: 'Other country'}			
],
mainlang: [
	{code: 'english', label: 'English'},
	{code: 'other', label: 'Other languages'}
],
irish: [
	{code: 'some', label: 'Some ability in Irish'},
	{code: 'none', label: 'No ability in Irish'}
],
ulster: [
	{code: 'some', label: 'Some ability in Ulster-Scots'},
	{code: 'none', label: 'No ability in Ulster-Scots'}
],	
ethnic: [
	{code: 'white', label: 'White'},
	{code: 'asian', label: 'Asian'},
	{code: 'black', label: 'Black'},
	{code: 'mixed', label: 'Mixed'},
	{code: 'other', label: 'Other'}
],	
natid: [
	{code: 'british', label: 'British only'},
	{code: 'irish', label: 'Irish only'},
	{code: 'nirish', label: 'Northern Irish only'},
	{code: 'british_irish', label: 'British and Irish only'},
	{code: 'british_nirish', label: 'British and Northern Irish only'},
	{code: 'irish_nirish', label: 'Irish and Northern Irish only'},
	{code: 'british_irish_nirish', label: 'British, Irish and Northern Irish only'},
	{code: 'other', label: 'Other'}
],	
religion: [
	{code: 'catholic', label: 'Catholic'},
	{code: 'protestant', label: 'Protestant and Other Christian (including Christian related)'},
	{code: 'other', label: 'Other religions'},
	{code: 'none', label: 'None'}
],	
passport: [
	{code: 'uk', label: 'UK only'},
	{code: 'ireland', label: 'Ireland only'},
	{code: 'uk_ireland', label: 'UK and Ireland'},
	{code: 'other', label: 'Other passport(s)'},
	{code: 'none', label: 'No passport'}
],	
hhsize: [
	{code: 'one', label: '1 person'},
	{code: 'two', label: '2 people'},
	{code: 'three', label: '3 people'},
	{code: 'four', label: '4 people'},
	{code: 'fiveplus', label: '5 or more people'}
],	
population: [
	{code: 'females'},
	{code: 'males'}
]
};

//export const mapStyle = 'https://bothness.github.io/ons-basemaps/data/style-omt.json';
export const mapStyle = 'https://raw.githubusercontent.com/kham1508/map_tiles/main/basemap_styles/style-omt.json';

export const mapSources = {
	crd: {
		id: 'crd',
		promoteId: 'areacd',
		type: 'vector',
		url: 'https://raw.githubusercontent.com/kham1508/map_tiles/main/lgd2012/{z}/{x}/{y}.pbf',
		maxzoom: 12
	},
	dea: {
		id: 'dea',
		promoteId: 'areacd',
		type: 'vector',
		url: 'https://raw.githubusercontent.com/kham1508/map_tiles/main/dea/{z}/{x}/{y}.pbf',
		minzoom: 6,
		maxzoom: 12
	}
//	lsoa: {
//		id: 'lsoa',
//		promoteId: 'areacd',
//		type: 'vector',
//		url: 'https://cdn.ons.gov.uk/maptiles/administrative/lsoa/v2/boundaries/{z}/{x}/{y}.pbf',
//		minzoom: 6,
//		maxzoom: 12
//	},
//	oa: {
//		id: 'oa',
//		promoteId: 'areacd',
//		type: 'vector',
//		url: 'https://cdn.ons.gov.uk/maptiles/administrative/oa/v1/boundaries/{z}/{x}/{y}.pbf',
//		minzoom: 6,
//		maxzoom: 12
//	}
};

export const mapLayers = {
//	ctry: {
//		source: 'crd',
//		sourceLayer: 'region',
//		code: 'areacd',
//		name: 'areanm',
//		filter: [
//			"all",
//			["==", "nation", "true"],
//			["in", "country", "E", "W"]
//		]
//	},
//	rgn: {
//		source: 'crd',
//		sourceLayer: 'region',
//		code: 'areacd',
//		name: 'areanm',
//		filter: [
//			"all",
//			["==", "region", "true"],
//			["==", "country", "E"]
//		]
//	},
//	cty: {
//		source: 'crd',
//		sourceLayer: 'authority',
//		code: 'areacd',
//		name: 'areanm',
//		filter: [
//			"all",
//			["==", "upper", "true"],
//			["in", "country", "E", "W"]
//		]
//	},
	lgd: {
		source: 'crd',
		sourceLayer: 'lgd2012',
		code: 'areacd',
		name: 'areanm'
// removing filter for lgd2012
//		filter: [
//			"all",
//			["==", "lower", "true"],
//			["in", "country", "E", "W", "N"]
//		]
	},
	dea: {
		source: 'dea',
		sourceLayer: 'dea',
		code: 'areacd',
		name: 'areanm'
	}
//	lsoa: {
//		source: 'lsoa',
//		sourceLayer: 'lsoa',
//		code: 'areacd',
//		name: 'areanm'
//	},
//	oa: {
//		source: 'oa',
//		sourceLayer: 'oa',
//		code: 'areacd',
//		name: 'areanm'
//	}
};

export const mapPaint = {
	fill: {
		'fill-color': 'rgba(255,255,255,0)',
		'fill-opacity': 0
	},
	line: {
		'line-color': 'rgba(255,255,255,0)',
		'line-width': 1,
		'line-opacity': 0
	},
	'fill-active': {
		'fill-color': [
			'case',
			['==', ['feature-state', 'selected'], true], 'rgba(255,255,255,0)',
			'grey'
		],
		'fill-opacity': [
			'case',
			['==', ['feature-state', 'hovered'], true], 0.3,
			['!=', ['feature-state', 'selected'], true], 0.1,
			0
		]
	},
	'fill-self': {
		'fill-color': [
			'case',
			['==', ['feature-state', 'selected'], true], 'rgb(17,140,123)',
			'grey'
		],
		'fill-opacity': [
			'case',
			['==', ['feature-state', 'hovered'], true], 0.3,
			0.1
		]
	},
	'fill-child': {
		'fill-color': [
			'case',
			['==', ['feature-state', 'highlighted'], true], 'rgb(17,140,123)',
			'rgba(255,255,255,0)'
		],
		'fill-opacity': [
			'case',
			['==', ['feature-state', 'hovered'], true], 0.3,
			['==', ['feature-state', 'highlighted'], true], 0.1,
			0
		]
	},
	'line-active': {
		'line-color': [
			'case',
			['==', ['feature-state', 'selected'], true], 'rgb(17,140,123)',
			'grey'
		],
		'line-width': 2,
		'line-opacity': 1
	},
	'line-self': {
		'line-color': 'rgb(17,140,123)',
		'line-width': 2,
		'line-opacity': [
			'case',
			['==', ['feature-state', 'selected'], true], 1,
			0
		]
	},
	'line-child': {
		'line-color': 'rgb(17,140,123)',
		'line-width': 1,
		'line-opacity': [
			'case',
			['==', ['feature-state', 'highlighted'], true], 1,
			0
		]
	}
};