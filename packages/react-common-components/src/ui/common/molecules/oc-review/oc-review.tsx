// commit 407dd6f5f0440dfc245d37abccc7ffd52fc6f609 author: Julia Date: 29.06.21 14:16
import * as React from 'react';
// @ts-ignore
import { Review } from '@openchannel/react-common-services';
import { Form, Formik, FormikValues } from 'formik';
import { noop } from 'lodash-es';

import OcError from '../../../common/atoms/oc-error/oc-error';
import OcInputComponent from '../../../common/atoms/oc-input/oc-input';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';
import OcTextarea from '../../../form/atoms/oc-textarea/oc-textarea';
import OcRatingComponent from '../../../market/atoms/oc-rating';
import OcButtonComponent from '../../atoms/oc-button/oc-button';

import { validateReview } from './utils';

import './style.scss';

export interface ReviewProps {
	/**
	 * Heading of the Review component. If not set - heading would not appear.
	 */
	heading?: string;
	/**
	 * Shows the `cancel` and `submit` buttons of the component.
	 * Buttons will not be shown by default.
	 * @default false
	 */
	enableButtons?: boolean;
	/**
	 * Text of the `cancel` button.
	 * @default 'Cancel'
	 */
	cancelButtonText?: string;
	/**
	 * Text of the `submit` button.
	 * @default 'Submit'
	 */
	submitButtonText?: string;
	/**
	 * Hide only the `cancel` button.
	 * @default false
	 */
	hideCancelButton?: boolean;
	/**
	 * Data of the review from the user.
	 */
	reviewData?: Review;
	/**
	 * Handle review submit.
	 */
	onSubmit?: (reviewData: Review) => void;
	/**
	 * Handle review cancel
	 */
	onReviewCancel?: () => void;
}

export const OcReviewComponent: React.FC<ReviewProps> = (props) => {
	const {
		heading = '',
		enableButtons = false,
		cancelButtonText = 'Cancel',
		submitButtonText = 'Submit',
		hideCancelButton = false,
		reviewData,
		onSubmit = noop,
		onReviewCancel = noop,
	} = props;

	const [review] = React.useState({
		rating: reviewData?.rating ? reviewData.rating / 100 : 0,
		headline: reviewData?.headline || '',
		description: reviewData?.description || '',
	});

	const handleSubmit = React.useCallback(
		({ rating, ...rest }: FormikValues) =>
			onSubmit({ ...reviewData, rating: rating * 100, ...rest }),
		[reviewData, onSubmit],
	);

	const handleReviewCancel = React.useCallback((resetForm) => {
		resetForm();
		onReviewCancel();
	}, []);

	return (
		<div className="review">
			<h4 className="review__heading">{heading}</h4>
			<Formik
				initialValues={review}
				onSubmit={handleSubmit}
				validate={validateReview}
				enableReinitialize
			>
				{(f) => (
					<Form className="review__form-group" onSubmit={f.handleSubmit}>
						<div className="review__form-group">
							<OcLabelComponent text="Rating" required customClass="review__form-label" />
							<OcRatingComponent
								type="multi-star"
								name="rating"
								rating={f.values.rating}
								onChange={(r) => f.setFieldValue('rating', r)}
								onBlur={() => f.setFieldTouched('rating')}
							/>
							{f.touched.rating && f.errors.rating && <OcError message={f.errors.rating} />}
						</div>
						<div className="review__form-group">
							<OcLabelComponent text="Title" required customClass="review__form-label" />
							<OcInputComponent
								name="headline"
								customClass="review__form-field review__input"
								value={f.values.headline}
								onChange={f.handleChange}
								onBlur={f.handleBlur}
							/>
							{f.touched.headline && f.errors.headline && <OcError message={f.errors.headline} />}
						</div>
						<div className="review__form-group">
							<OcLabelComponent text="Review" required customClass="review__form-label" />
							<OcTextarea
								name="description"
								customClass="review__form-field review__textarea"
								value={f.values.description}
								onChange={f.handleChange}
								onBlur={f.handleBlur}
							/>
							{f.touched.description && f.errors.description && (
								<OcError message={f.errors.description} />
							)}
						</div>
						{enableButtons && (
							<div className="review__buttons-section">
								{!hideCancelButton && (
									<OcButtonComponent
										text={cancelButtonText}
										type="secondary"
										customClass="review__button review__button-cancel"
										onClick={() => handleReviewCancel(f.resetForm)}
									/>
								)}
								<OcButtonComponent
									htmlType="submit"
									text={submitButtonText}
									type="primary"
									customClass="review__button review__button-submit"
								/>
							</div>
						)}
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default OcReviewComponent;
