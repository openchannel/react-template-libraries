import { SocialLink } from '../../models';

interface FooterRow {
	label: string;
	location: string;
}

export interface FooterColumn {
	label: string;
	location: string;
	items: FooterRow[];
}

export interface OcFooterProps {
	cmsData?:
		| null
		| Record<string, never>
		| {
				logoImageURL: string;
				columnsDFA: FooterColumn[];
		  };
	socialLinks?: SocialLink[];
}
