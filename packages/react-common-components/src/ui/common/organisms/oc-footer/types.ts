import { SocialLink } from '../../models';

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
	socialLinks?: SocialLink[];
}
