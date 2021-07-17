import * as React from 'react';
import { Formik } from 'formik';
import { mount } from 'enzyme';

export const mountWithFormik = (Component: any) => mount(
	<Formik initialValues={{}} onSubmit={() => {}}>
		{Component}
	</Formik>
);
