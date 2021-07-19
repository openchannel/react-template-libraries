import type { Option } from '../../../common/index';

export interface TypeModel<T extends TypeFieldModel> {
  fields?: T[];
}

export interface TypeFieldModel {
  id: string;
  type: string;
  label?: string;
  defaultValue?: any;
  attributes?: any;
  options?: OptionValue[] | string[];
  fields?: TypeFieldModel[];
}

export interface OptionValue {
  value: any;
}
//---------------------------------------------------------------------------------------------------------
export interface OcCheckboxData {
  termsUrl: string;
  policyUrl: string;
}

export interface OcEditUserFormConfig {
  name: string;
  account: OcEditUserTypeConfig;
  organization: OcEditUserTypeConfig;
  fieldsOrder?: string[];
}

export interface OcEditUserTypeConfig {
  type: string;
  includeFields: string[];
  typeData: TypeModel<TypeFieldModel>;
}

export interface OcEditUserResult {
  account?: OCOrganization;
  organization?: OCOrganization;
  password?: string;
}

export interface OCOrganization {
  name?: string;
  username?: string;
  type?: string;
  email: string;
  customData?: any;
}

export interface EditUserComponentProps {
  formConfigs: OcEditUserFormConfig[];
  enableTypesDropdown?: false;
  enablePasswordField?: false;
  enableTermsCheckbox?: OcCheckboxData;
  defaultTypeLabelText?:  string;
  // defaultAccountData: OCOrganization;
  // defaultOrganizationData: OCOrganization;
  // defaultEmptyConfigsErrorTemplate: any;
  defaultEmptyConfigsErrorMessage: string;
  customTermsDescription: any;
  termsChecked?: boolean;
  setTermsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
  selectedConfig?: Option,
  setSelectedConfig?: ((eventKey: string | Option, e: React.SyntheticEvent<unknown, Event>) => void) | undefined;
  onCancel: () => void;
  onSubmit: () => void;
}