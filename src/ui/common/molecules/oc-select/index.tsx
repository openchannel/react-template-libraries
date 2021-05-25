//commit 18542372da1cf82ca1fd7d04cc8bde9e78656242 Author: Alex Tkachenko Date: 12.04.21, 12:41
import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { SelectCallback } from 'react-bootstrap/helpers';

import { Toggle } from './toggle';
import { ListItem } from './listItem';
import { ListWrapper } from './listWrapper';
import { transformToValidOptions } from './utils';
import './style.scss';

export type Option = { [T in string]: string };

export type SelectedValue = string | Option;

export interface OcSelectProps {
  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Array of the select items. Example: [{ key: 'value' }], ['value']
   * @default []
   */
  selectValArr: Option[] | string[];

  /**
   * Set object field name using as label. The value must match the key in the array object.
   */
  labelField?: string;

  /**
   * Disable select for user input
   * @default false
   */
  disabled?: boolean;

  /**
   * Selected item
   */
  value: SelectedValue;

  /**
   * A callback fired when a menu item is selected.
   */
  onSelectionChange: (eventKey: string | Option, e: React.SyntheticEvent<unknown>) => void;
}

export const OcSelect: React.FC<Partial<OcSelectProps>> = (props) => {
  const {
    selectValArr = [],
    labelField = '',
    disabled = false,
    value = '',
    placeholder = '',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onSelectionChange = () => {},
  } = props;

  const options = React.useMemo(() => transformToValidOptions(selectValArr, labelField), [
    selectValArr,
    labelField,
  ]);

  const onSelect = React.useCallback(
    (eventKey: string, event: React.SyntheticEvent) => {
      const value = labelField ? { [labelField]: eventKey } : eventKey;

      onSelectionChange(value, event);
    },
    [onSelectionChange, labelField],
  ) as SelectCallback;

  const toggleValue = value ? (typeof value === 'object' ? value[labelField] : value) : placeholder;

  return (
    <Dropdown className="select-component">
      <Dropdown.Toggle as={Toggle} disabled={disabled}>
        {toggleValue}
      </Dropdown.Toggle>

      <Dropdown.Menu as={ListWrapper}>
        {options.map((item) => {
          return (
            <Dropdown.Item
              key={item[labelField]}
              name={String(item[labelField])}
              eventKey={String(item[labelField])}
              as={ListItem}
              onSelect={onSelect}
            >
              {item[labelField]}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
