import * as React from 'react';

import { OcErrorProps } from './types';
import './style.scss';

export const OcError: React.FC<OcErrorProps> = (props) => {
  const { message } = props;

  if (!message) {
    return null;
  }

  return (
    <div className="error">
      <span className="error__feedback">{message}</span>
    </div>
  );
};
