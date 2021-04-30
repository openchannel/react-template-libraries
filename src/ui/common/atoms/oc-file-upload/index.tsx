import * as React from 'react';
import UploadIcon from '../../../../assets/img/upload_icon.svg';
import CloseIcon from '../../../../assets/img/close-icon.svg';
import DefaultFileIcon from '../../../../assets/img/file_icon.svg';
import StandardAppIcon from '../../../../assets/img/standard-app-icon.svg';
import './styles.scss';
import Dropzone, { IDropzoneProps, ILayoutProps } from 'react-dropzone-uploader';

// add type defs to custom LayoutComponent prop to easily inspect props passed to injected components
const Layout = ({ input, previews, dropzoneProps, files, extra: { maxFiles } }: ILayoutProps) => {
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

export const OcFileUpload: React.FC<any> = () => {
  // add type defs to function props to get TS support inside function bodies,
  // and not just where functions are passed as props into Dropzone
  const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
    url: 'https://httpbin.org/post',
  });
  const classNames = {
    dropzone: 'file-container file-container_without-files',
    dropzoneActive: '',
    dropzoneReject: '',
    dropzoneDisabled: '',
    input: 'file-container__input',
    inputLabel: 'file-container__placeholder',
    inputLabelWithFiles: '',
    preview: 'file-container__upload-item',
    previewImage: 'file-container__upload-item-type',
    submitButtonContainer: '',
    submitButton: '',
  };
  const InputContent = () => (
    <div className="file-container__placeholder">
      <p className="file-container__placeholder-text">
        Drag & drop file or
        <a className="file-container__placeholder-browse"> Browse File</a>
      </p>
    </div>
  );
  const PreviewContent = (props: any) => (
    <div className="file-container__upload-item">
      {props.fileWithMeta.meta.previewUrl &&
        (props.fileWithMeta.meta.status === 'done' ? <StandardAppIcon /> : <DefaultFileIcon />)}
      {props.fileWithMeta.meta.previewUrl && (
        <div className="file-container__upload-item-type">
          <a className="file-container__upload-item-name">{props.fileWithMeta.meta.name}</a>
          <div className="file-container__upload-item-status">{props.fileWithMeta.meta.status}</div>
        </div>
      )}

      <div className="dzu-previewStatusContainer">
        {Boolean(getUploadParams) && (
          <progress
            max={100}
            value={
              props.fileWithMeta.meta.status === 'done' ||
              props.fileWithMeta.meta.status === 'headers_received'
                ? 100
                : props.fileWithMeta.meta.percent
            }
          />
        )}

        {props.fileWithMeta.meta.status === 'uploading' && props.canCancel && (
          <CloseIcon className="dzu-previewButton" onClick={props.fileWithMeta.cancel} />
        )}
        {props.meta.status !== 'preparing' &&
          props.meta.status !== 'getting_upload_params' &&
          props.meta.status !== 'uploading' &&
          props.canRemove && (
            <CloseIcon className="dzu-previewButton" onClick={props.fileWithMeta.remove} />
          )}
        {['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(
          props.meta.status,
        ) &&
          props.canRestart && (
            <CloseIcon className="dzu-previewButton" onClick={props.fileWithMeta.restart} />
          )}
      </div>
    </div>
  );

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
      inputWithFilesContent={() => (
        <a className="file-container__placeholder-browse"> Browse File</a>
      )}
    />
  );
};
