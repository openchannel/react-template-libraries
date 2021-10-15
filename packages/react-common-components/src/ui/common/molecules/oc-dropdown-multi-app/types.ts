import {FormikServiceProps} from '../../../form';
import React from 'react';
import {FullAppData} from '../../models';

export interface DropdownMultiAppProps extends FormikServiceProps {
	service: AppsService;
	defaultValue: string[];
	value: string[];
	onChange: (value: string[]) => void;
	placeholder?: string;
	customClass?: string;
	onBlur?: (event: React.FocusEvent<HTMLElement>) => void;
}

export interface AppsServiceResponse {
	data: {
		list: FullAppData[]
	}
}

export interface AppsService {
	searchInitialMultiApps: (query: string, isOwner?: boolean, pageNumber?: number, limit?: number) => Promise<AppsServiceResponse>;
	searchMultiApps: (searchText: string, query?: string, fields?: string) => Promise<AppsServiceResponse>;
}
