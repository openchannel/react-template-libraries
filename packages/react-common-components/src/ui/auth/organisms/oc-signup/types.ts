import type { OcEditUserFormConfig } from '../oc-edit-user-form/types';
import type { Option } from '../../../common/index';

export interface SignupProps {    
  companyLogoUrl: string;
		loginUrl: string;
		showSignupFeedbackPage: boolean;
		setFeedbackPageVisible: any;
		forgotPasswordDoneUrl: string;
		goToActivationPage: () => void;
		formConfigs: OcEditUserFormConfig[];
		enableTypesDropdown: boolean;
		enableCustomTerms: boolean;
		enableTermsCheckbox: boolean;
		defaultTypeLabelText: string;
		ordinaryTermsDescription: React.ReactNode;
		customTermsDescription: React.ReactNode;
		selectConfigOptions: Option[];
		selectValue: Option;
		setSelectValue: any;
		defaultEmptyConfigsErrorMessage: string;
		onSubmit: () => void;
		enablePasswordField: boolean;
}