//@ts-nocheck
import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import UploadIcon from '../../../../src/react-common-components/assets/img/upload_icon.svg';

describe('Basic layout component', () => {
  const component: ShallowWrapper = shallow(
    <div>
      <div>
        <UploadIcon className="file-container__upload-images" />
      </div>
    </div>,
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
