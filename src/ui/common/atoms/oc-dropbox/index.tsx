import * as React from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';
import { transformToValidOptions } from './utils';

import './style.scss';

export interface MyOption extends OptionTypeBase {
  label: string;
  value: string;
}

export type DropboxValue = string;

export interface DropboxProps extends SelectProps<MyOption> {
  /**
   * Placeholder (optional) - show text inside dropbox
   */
  placeholder: string;
  /**
   * Items (optional) - items for selecting
   */
  items: Array<string>;
  /**
   * clearFormAfterSelect - clear input text form, when the user chooses an item. Default: false.
   */
  clearFormAfterSelect: boolean;
  /**
   * Inline styles to add to component
   */
  style: React.CSSProperties;
  /**
   * Set disabled state for input
   */
  disabled: boolean;
  /**
   * Selected item
   */
  value: MyOption;
  /**
   * onChange handler
   */
  onDropboxChange: (item: DropboxValue) => void;
}

export const OcDropboxComponent: React.FC<DropboxProps> = (props) => {
  const { placeholder, items, disabled, selectedItem, onDropboxChange } = props;
  const options = React.useMemo(() => transformToValidOptions(items), [items]);
  return (
    <Select
      className="oc-dropbox"
      classNamePrefix="oc-dropbox"
      placeholder={placeholder}
      options={options}
      disabled={disabled}
      value={selectedItem}
      onChange={(item) => onDropboxChange(item)}
      isSearchable
      noOptionsMessage={() => null}
    />
  );
};
