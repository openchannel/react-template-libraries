interface FooterRow {
	label: string;
	location: string;
}

export interface FooterColumn {
	label: string;
	location: string;
	items: FooterRow[];
}
