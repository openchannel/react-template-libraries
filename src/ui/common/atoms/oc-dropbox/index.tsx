import * as React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { GroupTypeBase, OptionsType, OptionTypeBase } from 'react-select';
import { transformToValidOptions } from './utils';

import './style.scss';

export type DropboxValue = string;

export interface DropboxProps extends SelectProps<GroupTypeBase<OptionsType<OptionTypeBase>>> {
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
  const options = transformToValidOptions(items);

  const handleSelect = React.useCallback(
    (item: OptionTypeBase | null) => {
      selectItem(item ? item.value : null);
    },
    [selectedItem],
  );

  return (
    <Select
      className="oc-dropbox"
      classNamePrefix="oc-dropbox"
      placeholder={placeholder}
      options={options}
      disabled={disabled}
      value={selectedItem === null || '' ? null : { label: selectedItem, value: selectedItem }}
      onChange={handleSelect}
      isSearchable
      noOptionsMessage={() => null}
    />
  );
};
