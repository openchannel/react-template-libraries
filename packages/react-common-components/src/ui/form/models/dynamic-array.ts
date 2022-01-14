import { FileUploadService } from '../../common/atoms/oc-file-upload/types';
import { FormikField } from './app-form';

export interface FieldValueModel {
	fieldId: string;
	fieldValue: any;
}

export interface PreviewFieldModel extends FormikField {
	isValidField: boolean;
	fieldValue: any;
	formArrayDFA: any;
	groupFieldIndex: number;
	fieldProps?: FileUploadService;
}
