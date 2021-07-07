import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  Content,
  ContentProps,
} from '../../../src/react-common-components/ui/common/organisms/oc-confirmation-modal/content';

const setUp = (props: ContentProps) => shallow(<Content {...props} />);

describe('Confirmation Modal content (common modal)', () => {
  it('should create with default/required props', () => {
    const component: ShallowWrapper = setUp({
      onClose: jest.fn(),
      modalTitle: 'some title',
      modalText: 'some text',
    });

    expect(component).toBeTruthy();
  });

  it('should create with additional props', () => {
    const component: ShallowWrapper = setUp({
      onClose: jest.fn(),
      modalTitle: 'some title',
      modalText: 'some text',
      confirmButtonText: 'click to confirm',
      confirmButtonType: 'secondary',
      confirmButtonHide: false,
      rejectButtonText: 'close this fast',
      rejectButtonType: 'link',
      rejectButtonHide: false,
    });

    expect(component).toBeTruthy();
  });
});
