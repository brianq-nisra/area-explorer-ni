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
	places: 'https://raw.githubusercontent.com/MaireBrolly/test_jsons/main/loop_jsons_no_dea/',
	base: 'https://MaireBrolly.github.io/area-explorer-ni/'
};

export const types = {
//	ew: {name: '', pl: ''},
//	oa: {name: 'Output area', pl: 'Output areas'},
//	lsoa: {name: 'Super Output Area', pl: 'Super Output Areas'},
dea: {name: 'District Electoral Area', pl: 'District Electoral Areas'},
town: {name: 'settlement', pl: 'Settlement'},
lgd: {name: 'Local Government District', pl: 'Districts'},
postcode: {name: 'postcode', pl: 'postcode'},
//	cty: {name: 'County', pl: 'Counties'},
//	rgn: {name: 'Region', pl: 'Regions'},
ctry: {name: 'Country', pl: 'Countries'}
};

export const codes = {
age: [
	{code: 'a0to14', label: '0-14'},
	{code: 'a15to39', label: '15-39'},
	{code: 'a40to64', label: '40-64'},
	{code: 'a65plus', label: '65+'}	
],
cob: [
	{code: 'northern_ireland', label: 'Northern Ireland'},
	{code: 'england', label: 'England'},
	{code: 'scotland', label: 'Scotland'},
	{code: 'wales', label: 'Wales'},
	{code: 'republic_of_ireland', label: 'Republic of Ireland'},
	{code: 'other_cob', label: 'Other country'}			
],
mainlang: [
	{code: 'english', label: 'English'},
	{code: 'other_languages', label: 'Other languages'}
],
irish: [
	{code: 'some_ability_in_irish', label: 'Some ability in Irish'},
	{code: 'no_ability_in_irish', label: 'No ability in Irish'}
],
ulster: [
	{code: 'some_ability_in_ulsterscots', label: 'Some ability in Ulster-Scots'},
	{code: 'no_ability_in_ulsterscots', label: 'No ability in Ulster-Scots'}
],	
ethnic: [
	{code: 'white', label: 'White'},
	{code: 'asian', label: 'Asian'},
	{code: 'black', label: 'Black'},
	{code: 'mixed', label: 'Mixed'},
	{code: 'other_ethnic', label: 'Other'}
],	
natid: [
	{code: 'british_only', label: 'British only'},
	{code: 'irish_only', label: 'Irish only'},
	{code: 'northern_irish_only', label: 'Northern Irish only'},
	{code: 'british_and_irish_only', label: 'British & Irish only'},
	{code: 'british_and_northern_irish_only', label: 'British & Northern Irish only'},
	{code: 'irish_and_northern_irish_only', label: 'Irish & Northern Irish only'},
	{code: 'british_irish_and_northern_irish_only', label: 'British, Irish & Northern Irish only'},
	{code: 'other_natid', label: 'Other'}
],	
religion: [
	{code: 'catholic', label: 'Catholic'},
	{code: 'protestant', label: 'Protestant & Other Christian'},
	{code: 'other_religions', label: 'Other religions'},
	{code: 'none', label: 'None'}
],	
religion_or_brought_up: [
	{code: 'catholic', label: 'Catholic'},
	{code: 'protestant', label: 'Protestant & Other Christian'},
	{code: 'other_religions', label: 'Other religions'},
	{code: 'none', label: 'None'}
],	
passport: [
	{code: 'united_kingdom_only', label: 'UK only'},
	{code: 'ireland_only', label: 'Ireland only'},
	{code: 'united_kingdom_and_ireland_only', label: 'UK & Ireland'},
	{code: 'other_passports', label: 'Other passport(s)'},
	{code: 'no_passport', label: 'No passport'}
],	
hhsize: [
	{code: 'one_person', label: '1 person'},
	{code: 'two_people', label: '2 people'},
	{code: 'three_people', label: '3 people'},
	{code: 'four_people', label: '4 people'},
	{code: 'five_people', label: '5 or more people'}
],	
households: [
	{code: 'all_households'}
],
population: [
	{code: 'females', label: 'Females'},
	{code: 'males', label: 'Males'}
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