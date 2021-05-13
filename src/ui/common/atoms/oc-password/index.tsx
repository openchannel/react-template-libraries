import * as React from 'react';

import './styles.scss';

export interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Marks the input as required
   *
   * @default false
   */
  required?: boolean;
  /**
   * Set disabled state for input
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Placeholder text for input
   */
  placeholder?: string;
  /**
   * Input value
   */
  value: string;
  onChange: (e: React.SyntheticEvent) => void;
}

export const OcPasswordComponent: React.FC<PasswordProps> = (props) => {
  const [isPassword, toggle] = React.useReducer((is) => !is, false);

  return (
    <div className="oc-password">
      <input {...props} type={isPassword ? 'text' : 'password'} className="oc-password__input" />
      <span onClick={toggle} className={`toggle_password ${isPassword ? 'fa-eye-slash' : ''}`} />
    </div>
  );
};
