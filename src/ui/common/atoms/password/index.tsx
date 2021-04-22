import * as React from 'react';
import PasswordHide from '../../../../assets/img/password-hide.svg';
import PasswordShow from '../../../../assets/img/password-show.svg';
import './styles.scss';

export interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input value. Use text
   */
  text?: string;
  /**
   * Marks the input as required
   */
  required?: boolean;
  /**
   * Type of the input. Can be 'text', 'email', 'password'
   */
  inputType?: 'text' | 'password';
  /**
   * Autocomplete
   */
  autocomplete?: boolean;
  /**
   * Set auto focus to true or false
   */
  autoFocus?: boolean;
  /**
   * List of classes which can be attached to the current list
   */
  customClass?: string;
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
  customStyle?: any;
}

export const Password: React.FC<PasswordProps> = (props) => {
  const { text, customClass, inputType, placeholder, ...p } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="oc-password">
      <input
        type={showPassword === true ? 'text' : 'password'}
        className={`oc-password__input ${customClass}`}
        {...p}
        placeholder={placeholder}
      />
      {showPassword === true && (
        <span className="toggle_password" onClick={togglePassword}>
          <PasswordHide />
        </span>
      )}
      {showPassword === false && (
        <span className="toggle_password" onClick={togglePassword}>
          <PasswordShow />
        </span>
      )}
    </div>
  );
};
