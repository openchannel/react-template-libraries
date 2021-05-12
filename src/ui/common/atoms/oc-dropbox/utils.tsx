import { MyOption } from './index';

export const transformToValidOptions = (array: Array<string>): MyOption[] => {
  return array.map((item) => ({ label: item, value: item }));
};
