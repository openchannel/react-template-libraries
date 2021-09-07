/**
 * Represents the attributes of an HTML `<meta>` element. The element itself is
 * represented by the internal `HTMLMetaElement`.
 *
 * @see [HTML meta tag](https://developer.mozilla.org/docs/Web/HTML/Element/meta)
 * @see `Meta`
 *
 * @publicApi
 */
type MetaDefinition = {
	charset?: string;
	content?: string;
	httpEquiv?: string;
	id?: string;
	itemprop?: string;
	name?: string;
	property?: string;
	scheme?: string;
	url?: string;
} & {
	[prop: string]: string;
};

export interface SiteConfig {
	title: string;
	tagline?: string;
	metaTags?: MetaDefinition[];
	favicon?: {
		href: string;
		type?: string;
	};
}

export interface OCReviewDetailsResponse {
	reviewOwnerName: string;
	rating: number;
	review: string;
}

export interface ChartStatisticDataModelResponse {
	labelsY: number[];
	labelsX: string[] | number[];
	tabularLabels?: string[];
}

export interface ChartStatisticPeriodModelResponse {
	id: string;
	label: string;
	active?: boolean;
	tabularLabel?: string;
}

export interface FilterValueResponse {
	id: string;
	label: string;
	sort: string;
	query: string;
	description: string;
	checked: boolean;
	values: FilterValueResponse[];
}

export interface FilterResponse {
	id: string;
	name: string;
	description: string;
	values: FilterValueResponse[];
}

export interface SortValueResponse {
	id: string;
	label: string;
	sort: string;
	customData?: any;
	description: string;
	checked: boolean;
}

export interface SortResponse {
	id: string;
	name: string;
	description: string;
	values: SortValueResponse[];
}
