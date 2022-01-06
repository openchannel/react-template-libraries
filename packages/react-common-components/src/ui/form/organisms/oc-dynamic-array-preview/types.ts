import { FileUploadService } from 'src';
import { FormikField } from '../../models';

export interface OcDynamicArrayPreviewProps {
	fields: FormikField[];
	hideLabel?: boolean;
	fieldProps?: FileUploadService;
}
