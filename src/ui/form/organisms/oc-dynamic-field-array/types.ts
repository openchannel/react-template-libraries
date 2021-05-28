import { AppTypeFieldModel } from '../../models';

export interface OcDynamicFieldArrayProps {
	/** Fields definition config necessary for the DFA generation */
	fieldDefinitionData: AppTypeFieldModel;
	/** Generated Form Array for the DFA */
	dfaFormArray: any[];
}
