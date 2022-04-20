import { FormikField } from '../../models';

export interface OcDynamicFieldArrayProps {
	field: FormikField;
	showAddButton: boolean;
	groupFieldIndex: number;
	fieldProps?:any;
}
