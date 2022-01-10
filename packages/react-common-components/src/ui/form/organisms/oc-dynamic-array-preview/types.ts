import { FileUploadService } from '../../../common/atoms/oc-file-upload/types';

import { FormikField } from '../../models';

export interface OcDynamicArrayPreviewProps {
	fields: FormikField[];
	hideLabel?: boolean;
	fieldProps?: FileUploadService;
}
