import { AppFormModel } from '../../../form/models';
import { OcFormFormikHelpers, OcFormValues } from '../../../form/organisms/oc-single-form';
import { ExtendedModalSizeVariants } from '../modal';

export interface OcInviteModalProps {
	/**
	 * When true The modal will show itself.
	 * @default false
	 */
	isOpened: boolean;
	/**
	 * A callback fired when the header closeButton or non-static backdrop is clicked.
	 */
	onClose(): void;
	/**
	 * A callback fired when the confirmButton is clicked.
	 * */
	onSubmit(values: OcFormValues, formikHelpers: OcFormFormikHelpers): void;
	/**
	 * The content of the modal title.
	 * */
	modalTitle: string;
	/**
	 * 	Config for custom form generation.
	 */
	formConfig: AppFormModel;
	/**
	 * A callback fired when the rejectButton is clicked.
	 * */
	onCancel?(): void;
	/**
	 * Render a large, extra large or small modal. When not provided, the modal is rendered with medium (default) size.
	 * @default 'md'
	 */
	size?: ExtendedModalSizeVariants;
	/**
	 * Set position of the field label.
	 * @default left
	 */
	buttonPosition?: 'top' | 'left' | 'right' | 'between';
	/**
	 * Label of the submit button.
	 * @default Save
	 */
	successButtonText?: string;
}
