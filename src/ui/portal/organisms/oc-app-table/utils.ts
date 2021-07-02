import { titleCase } from '../../../../lib';

import { AppListOptions } from '../../models';

export const statusColor = (status: string): string => {
	if (!status) return '';

	switch (status) {
		case 'inDevelopment':
			return 'in-development';
		case 'inReview':
			return 'in-review';
		default:
			return status;
	}
};

export const filterOptions = (
	options: AppListOptions[], status: string, modifiedBy: string, previewTemplate?: string
) => {
	return (options || [])
	.filter((item) => {
		if (status === item.toLowerCase()) {
			return false
		}
		switch (item) {
			case 'PREVIEW':
				return !!previewTemplate;
			case 'PUBLISH':
			case 'SUBMIT':
				return status === 'inDevelopment';
			case 'UNSUSPEND':
				return status === 'suspended' && modifiedBy === 'developer';
			case 'SUSPEND':
				return status === 'approved';
			default:
				return true;
		}
	})
	.map((v) => ({ label: titleCase(v), value: v }));
};
