import * as React from 'react';
import { DropdownToggleProps } from 'react-bootstrap/DropdownToggle';

import { OcButtonComponent } from '../../atoms';

export const Toggle = React.forwardRef(
  (props: DropdownToggleProps, ref: React.ForwardedRef<HTMLButtonElement>) => {
    const {
      onClick,
      className,
      disabled,
      'aria-expanded': ariaExpanded,
      'aria-haspopup': ariaHasPopup,
      children,
    } = props;

    return (
      <OcButtonComponent
        ref={ref}
        aria-expanded={ariaExpanded}
        aria-haspopup={ariaHasPopup}
        type="secondary"
        customClass={`select-component__action ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        <div className="select-component__text">{children}</div>
      </OcButtonComponent>
    );
  },
);
