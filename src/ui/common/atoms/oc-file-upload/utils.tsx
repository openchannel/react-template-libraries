import { IDropzoneProps } from 'react-dropzone-uploader';

export const getUploadParams: IDropzoneProps['getUploadParams'] = () => ({
  url: 'https://httpbin.org/post',
});

export const classNames = {
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
