import * as React from 'react';
import Dropzone from 'react-dropzone';
import UploadIcon from '../../../../assets/img/upload_icon.svg';
import './styles.scss';

export declare class FileDetails {
  fileId: string;
  fileUrl: string;
  name: string;
  size: number;
  uploadDate: number;
  fileUploadProgress: number;
  fileIconUrl: string;
  contentType: string;
  isPrivate: boolean;
  mimeCheck: string;
  virusScan: any;
  isError: boolean;
}

export const OcFileUpload: React.FC<any> = () => {
  // const baseURL = 'https://dev1-client-api-proxy.openchannel.io/v2/';
  // const uploadFile = async (file: any) => {
  //   const uploadToken = await fetch(`${baseURL}files/uploadToken`, {
  //     method: 'POST',
  //     mode: 'no-cors',
  //   });
  //   return fetch(`${baseURL}files/`, {
  //     method: 'POST',
  //     mode: 'no-cors',
  //     headers: { 'Upload-Token': uploadToken.json() },
  //     body: file,
  //   });
  // };

  return (
    <div className="file-container file-container_without-files">
      <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className="file-container__placeholder">
              <input {...getInputProps()} className="file_container__input" />
              <UploadIcon className="file-container__upload-images" />
              <div className="file-container__placeholder">
                <p className="file-container__placeholder-text">Drag & drop file here</p>
                <p>
                  or <a className="file-container__placeholder-browse">Browse File</a>
                </p>
              </div>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
