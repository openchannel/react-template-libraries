interface FooterRow {
	label: string;
	location: string;
}

interface FooterColumn {
	label: string;
	location: string;
	items: FooterRow[];
}

export interface OcFooterProps {
	cmsData?: {
		logoImageURL: string;
		columnsDFA: FooterColumn[];
	};
	social?: {
		link: string;
		iconSrc: string;
		iconAlt: string;
	}[];
}
