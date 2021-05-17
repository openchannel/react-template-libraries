import * as React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { transformToValidOptions } from './utils';

import './style.scss';

export interface MyOption {
  label: string | null;
  value: string | null;
}

export type DropboxValue = string | null;

export interface DropboxProps extends SelectProps<MyOption> {
  /**
   * Placeholder (optional) - show text inside dropbox
   */
  placeholder?: string;
  /**
   * Items - items for selecting
   */
  items: Array<DropboxValue>;
  /**
   * Set disabled state for input (optional)
   */
  disabled?: boolean;
  /**
   * Selected item
   */
  selectedItem: DropboxValue;
  /**
   * onChange function
   */
  selectItem: (item: DropboxValue) => DropboxValue;
}

export const OcDropboxComponent: React.FC<DropboxProps> = (props) => {
  const { placeholder, items, disabled, selectedItem, selectItem } = props;
  const options = React.useMemo(() => transformToValidOptions(items), [items]);

  const handleSelect = React.useCallback((item: MyOption | null) => {
    selectItem(item ? item.value : null);
  }, []);

  return (
    <Select
      className="oc-dropbox"
      classNamePrefix="oc-dropbox"
      placeholder={placeholder}
      options={options}
      disabled={disabled}
      value={selectItem !== null ? { label: selectedItem, value: selectedItem } : null}
      onChange={handleSelect}
      isSearchable
      noOptionsMessage={() => null}
    />
  );
};
