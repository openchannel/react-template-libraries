import { nanoid } from 'nanoid';
import { OcEditUserFormConfig } from './types';

export const configConverter = (item: OcEditUserFormConfig, enablePasswordField: boolean) => {
  const fieldsSorting = (field1: { id: string }, field2: { id: string }) => {
    const index1 = item.fieldsOrder!.indexOf(field1.id);
    const index2 = item.fieldsOrder!.indexOf(field2.id);
    return (index1 > -1 ? index1 : Infinity) - (index2 > -1 ? index2 : Infinity);
  };
  let newFormConfig = {
    formId: nanoid(),
    name: item.name,
    created: new Date(),
    fields: [
      ...item.account.typeData.fields!.filter((field: any) =>
        item.account.includeFields.includes(field.id),
      ),
      ...item.organization.typeData.fields!.filter((field: any) =>
        item.organization.includeFields.includes(field.id),
      ),
    ],
  };
  if (item.fieldsOrder) {
    newFormConfig.fields.sort(fieldsSorting);
  }
  if (enablePasswordField) {
    const passwordField = {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      attributes: {},
    };
    newFormConfig.fields.push(passwordField);
  }
  newFormConfig.fields.map((field) => {
    field.description = ''
    field.name = field.id
    field.placeholder = ''
  })
  return newFormConfig;
};
