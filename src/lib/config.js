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
		options: 'https://raw.githubusercontent.com/MaireBrolly/test_jsons/main/v9/places_test.csv',
		places: 'https://raw.githubusercontent.com/MaireBrolly/test_jsons/main/v13/',
		base: 'https://kham1508.github.io/area-explorer-ni/'
};
	
export const types = {
//	ew: {name: '', pl: ''},
//	oa: {name: 'Output area', pl: 'Output areas'},
//	lsoa: {name: 'Super Output Area', pl: 'Super Output Areas'},
	dea: {name: 'District Electoral Area', pl: 'District Electoral Areas'},
	lgd: {name: 'Local Government District', pl: 'Districts'},
//	cty: {name: 'County', pl: 'Counties'},
//	rgn: {name: 'Region', pl: 'Regions'},
	ctry: {name: 'Country', pl: 'Countries'}
};

export const codes = {
	age10yr: [
		{code: '0-9'},
		{code: '10-19'},
		{code: '20-29'},
		{code: '30-39'},
		{code: '40-49'},
		{code: '50-59'},
		{code: '60-69'},
		{code: ['70-79', '80plus'], label: '70+'}
	],
	economic: [
		{code: 'employee'},
		{code: 'self-employed'},
		{code: 'student', label: 'student (employed)'},
		{code: 'unemployed'},
		{code: 'inactive'}
	],
	health: [
		{code: 'good'},
		{code: 'fair'},
		{code: 'bad'}
	],
	topic_new: [
		{code: 'bread'},
		{code: 'milk'},
		{code: 'ham'},
		{code: 'cheese'},
		{code: 'eggs'}
	],
	ethnicity: [
		{code: 'white', label: 'White'},
		{code: 'asian', label: 'Asian'},
		{code: 'black', label: 'Black'},
		{code: 'mixed', label: 'Mixed'},
		{code: 'other', label: 'Other'}
	],
	population: [
		{code: 'female'},
		{code: 'male'}
	],
	tenure: [
		{code: 'owned', label: 'owner occupied'},
		{code: 'shared_ownership', label: 'shared ownership'},
		{code: 'rented_private', label: 'rented (private)'},
		{code: 'rented_social', label: 'rented (social)'},
		{code: 'rent_free', label: 'rent (free)'}
	],
	travel: [
		{code: "car_van", label: "car and van"},
		{code: "bus"},
		{code: "bicycle"},
		{code: "foot", label: "on foot"},
		{code: "home", label: "home worker"},
		{code: "other"}
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