//commit 97ffbca1eb0dab597b763664b1c78414ac62e6be Author: Vitaliy Samofal Date: 05.02.21, 14:38
import * as React from 'react';
// import FormCheck from 'react-bootstrap/FormCheck';

import './style.scss';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input value. Use text
   */
  labelText?: string;
  /**
   * Marks the input as required
   */
  required?: boolean;
  /**
   * Set disabled state for input
   */
  disabled?: boolean;
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  /**
   * Input value
   */
  value?: string;
  onClick?: React.MouseEventHandler;
  /**
   * Style which can be added to the title
   * Supposed to be the style object
   */
  style?: React.CSSProperties;
}

export const OcCheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const { labelText, required, ...p } = props;

  return (
    <label className="form-checkbox">
      <input
        type="checkbox"
        name="checkbox"
        className={`form-checkbox__input form-checkbox__input_hidden`}
        {...p}
        id="checkbox"
      />
      <span className="form-checkbox__checkmark"></span>
      <span className="form-checkbox__label">
        {labelText || ''}
        {required && <strong className="form-checkbox__required-glyph">*</strong>}
      </span>
    </label>
  );
};
