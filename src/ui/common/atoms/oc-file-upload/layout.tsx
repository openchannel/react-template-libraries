import * as React from 'react';
import UploadIcon from '../../../../assets/img/upload_icon.svg';
import './styles.scss';
import { ILayoutProps } from 'react-dropzone-uploader';

export const Layout = ({
  input,
  previews,
  dropzoneProps,
  files,
  extra: { maxFiles },
}: ILayoutProps) => {
  return (
    <div>
      <div {...dropzoneProps}>
        <UploadIcon className="file-container__upload-images" />
        {files.length < maxFiles && input}
        {previews}
      </div>
      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};
