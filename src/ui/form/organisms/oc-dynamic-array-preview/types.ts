import { AppTypeFieldModel, FieldValueModel } from '../../models';

export interface OcDynamicArrayPreviewProps {
	fieldValues: FieldValueModel[];
	fieldDefinition: AppTypeFieldModel;
	dfaForm: any;
}
