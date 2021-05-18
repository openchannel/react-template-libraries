//@ts-nocheck
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { IFileWithMeta, IMeta, IPreviewProps } from 'react-dropzone-uploader';
import { PreviewContent } from '../../../../src/ui/common/atoms/oc-file-upload/preview-content';

const setUp = (props: IPreviewProps) => shallow(<PreviewContent {...props} />);

describe('Content preview for each file', () => {
  const component: ShallowWrapper = setUp({
    canCancel: true,
    canRemove: true,
    fileWithMeta: {
      cancel: () => {},
      remove: () => {},
      restart: () => {},
      file: {},
      meta: {
        id: '1621345945054-0',
        lastModifiedDate: '2021-02-22T14:32:42.265Z',
        name: 'Web 1920 – 1.pdf',
        percent: 100,
        size: 655331,
        status: 'done',
        type: 'application/pdf',
        uploadedDate: '2021-05-18T13:52:25.055Z',
      },
    },
    meta: {
      id: '1621345945054-0',
      lastModifiedDate: '2021-02-22T14:32:42.265Z',
      name: 'Web 1920 – 1.pdf',
      percent: 0,
      size: 655331,
      status: 'preparing',
      type: 'application/pdf',
      uploadedDate: '2021-05-18T13:52:25.055Z',
    },
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
