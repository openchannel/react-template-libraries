import { titleCase } from '../../../../lib';
import { AppListOptions } from '../../models';

export enum appStatus {
	inDevelopment = 'inDevelopment',
	inReview = 'inReview',
	pending = 'pending',
	approved = 'approved',
	suspended = 'suspended',
	rejected = 'rejected',
};

export const statusColor = (status: string): string => {
	if (!status) return '';

	switch (status) {
		case appStatus.inDevelopment:
			return 'in-development';
		case appStatus.inReview:
			return 'in-review';
		default:
			return status;
	}
};

export const filterOptions = (
	options: AppListOptions[],
	status: string,
	modifiedBy: string,
	previewTemplate?: string,
) => {
	return (options || [])
		.filter((item) => {
			if (status === item.toLowerCase()) {
				return false;
			}
			switch (item) {
				case 'PREVIEW':
					return !!previewTemplate || (status === appStatus.pending || status === appStatus.inDevelopment || status === appStatus.approved || status === appStatus.suspended);
				case 'PUBLISH':
				case 'SUBMIT':
					return status === appStatus.inDevelopment;
				case 'UNSUSPEND':
					return status === appStatus.suspended && modifiedBy === 'developer';
				case 'SUSPEND':
					return status === appStatus.approved;
				default:
					return true;
			}
		})
		.map((v) => ({ label: titleCase(v), value: v }));
};
