import * as React from 'react';
import Select, { OptionTypeBase, Props as SelectProps } from 'react-select';

import './style.scss';

interface MyOption extends OptionTypeBase {
  label: string;
  value: string;
}

export interface DropboxProps extends SelectProps<MyOption> {
  /**
   * Placeholder (optional) - show text inside dropbox
   */
  placeholder: string;
  /**
   * Items (optional) - items for selecting
   */
  items: Array<MyOption>;
  /**
   * clearFormAfterSelect - clear input text form, when the user chooses an item. Default: false.
   */
  clearFormAfterSelect: boolean;
  /**
   * Inline styles to add to component
   */
  style: React.CSSProperties;
  /**
   * Selected Value
   */
  selectedValue: MyOption;
  /**
   * onChange handler
   */
}

export const OcDropboxComponent: React.FC<DropboxProps> = (props) => {
  const { placeholder, items, disabled, selectedValue } = props;
  return (
    <Select
      className="oc-dropbox"
      classNamePrefix="oc-dropbox"
      placeholder={placeholder}
      options={items}
      disabled={disabled}
      value={selectedValue}
      isSearchable
      noOptionsMessage={() => null}
    />
  );
};
