import * as React from 'react';
import Dropzone, { IDropzoneProps } from 'react-dropzone-uploader';
import { Layout } from './layout';
import { InputContent } from './input-content';
import { PreviewContent } from './preview-content';
import { classNames, getUploadParams } from './utils';

import './style.scss';

export const OcFileUpload: React.FC<IDropzoneProps> = ({
  maxFiles,
  minSizeBytes,
  maxSizeBytes,
  accept,
}) => {
  const handleSubmit: IDropzoneProps['onSubmit'] = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      LayoutComponent={Layout}
      onSubmit={handleSubmit}
      classNames={classNames}
      inputContent={InputContent}
      PreviewComponent={PreviewContent}
      maxFiles={maxFiles}
      minSizeBytes={minSizeBytes}
      maxSizeBytes={maxSizeBytes}
      accept={accept}
      inputWithFilesContent={() => (
        <a className="file-container__placeholder-browse"> Browse File</a>
      )}
    />
  );
};
