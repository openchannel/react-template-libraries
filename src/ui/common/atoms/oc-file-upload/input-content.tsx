import * as React from 'react';
import './styles.scss';

export const InputContent = () => (
  <div className="file-container__placeholder">
    <p className="file-container__placeholder-text">
      Drag & drop file or
      <a className="file-container__placeholder-browse"> Browse File</a>
    </p>
  </div>
);
