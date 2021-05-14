import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { TotalInfoProps } from '../../../src/ui/portal';
import { TotalInfo } from '../../../src/ui/portal/organisms/chart/components/total-info';


const setUp = (props: TotalInfoProps) => shallow(<TotalInfo {...props} />);

describe('Chart (total-info)', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({
			count: 1,
			countText: 'Total view 1',
			downloadUrl: './some-img-path',
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
