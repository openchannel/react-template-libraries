import { MyOption, DropboxValue } from './index';

export const transformToValidOptions = (array: Array<DropboxValue> | null): MyOption[] => {
  return array!.map((item) => ({ label: item, value: item }));
};
