import * as React from 'react';
import { Form, Formik } from 'formik';
import { noop } from 'lodash-es';
import {
	OcLabelComponent,
	OcInputComponent,
	OcSelect,
	OcError,
	OcButtonComponent,
} from '@openchannel/react-common-components/src/ui/index';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/calendar-icon.svg';
import { validateCreditCard, validateAddress } from './utils';
import { BillingFormProps } from './types';
import './style.scss';

export const BillingForm: React.FC<BillingFormProps> = (props) => {
	const {
		hideCardFormElements = false,
		showStripeForm = noop,
		cardForm,
		handleSubmit = noop,
		successButtonText = 'Text',
		billingAction = noop,
		clearChanges = noop,
	} = props;

	return (
		<>
			<div className="billing__credit-card">
				<h3 className="billing__header">Credit card information</h3>
				<Formik
					initialValues={{
						name: '',
						card_number: '',
						expiration: '',
						cvc: '',
					}}
					onSubmit={handleSubmit}
					validate={validateCreditCard}
				>
					{({ handleSubmit, handleChange, errors, values, handleBlur }) => (
						<Form className="billing__credit-card-form" onSubmit={handleSubmit} noValidate>
							<OcLabelComponent
								htmlFor="billing_name"
								text="Card holder name"
								customClass="billing__credit-card-form-label"
							/>
							<OcInputComponent
								id="billing_name"
								placeholder="Name"
								required
								name="name"
								onChange={handleChange}
								value={values.name}
								onBlur={handleBlur}
								customClass={`billing__credit-card-form-input billing__credit-card-form-group ${
									errors.name ? 'invalid' : ''
								}`}
							/>
							{errors.name && <OcError message={errors.name} />}
							<div className="billing__credit-card-form-group">
								<OcLabelComponent
									htmlFor="card-element"
									text="Card number"
									customClass="oc-form-label billing__credit-card-form-label"
								/>
								{!hideCardFormElements && (
									<OcInputComponent
										id="card-element"
										placeholder="1234 1234 1234 1234"
										name="card_number"
										required={false}
										onChange={handleChange}
										value={values.card_number}
										onBlur={handleBlur}
										// [ngModel]="'••• ••• ••• ' + cardData.last4"
										customClass={`billing__credit-card-form-input ${
											errors.card_number ? 'invalid' : ''
										}`}
										onClick={showStripeForm}
									/>
								)}
								{errors.card_number && <OcError message={errors.card_number} />}
							</div>
							<div className="billing__credit-card-form-group">
								<div className="billing__credit-card-form-row">
									<div className="billing__credit-card-form-row-expiration">
										<OcLabelComponent
											htmlFor="expiration-element"
											text="Expiration"
											customClass="oc-form-label billing__credit-card-form-label"
										/>
										<div className="billing__credit-card-form-row-expiration-group">
											{!hideCardFormElements && (
												<OcInputComponent
													name="expiration"
													placeholder="MM/YY"
													id="expiration-element"
													onChange={handleChange}
													onBlur={handleBlur}
													// [ngModel]="cardData.exp_month + '/' + cardData.exp_year.toString().slice(-2)"
													customClass={`billing__credit-card-form-input ${
														errors.expiration ? 'invalid' : ''
													}`}
													onClick={showStripeForm}
													value={values.expiration}
												/>
											)}
											<div className="billing__credit-card-form-expiration-svg">
												<CalendarIcon />
											</div>
										</div>
										{errors.expiration && <OcError message={errors.expiration} />}
									</div>
									<div className="billing__credit-card-form-row-cvc">
										<OcLabelComponent
											htmlFor="cvc-element"
											text="CVV"
											customClass="oc-form-label billing__credit-card-form-label"
										/>
										{!hideCardFormElements && (
											<OcInputComponent
												name="cvc"
												placeholder="CVV"
												id="cvc"
												value={values.cvc}
												onChange={handleChange}
												onBlur={handleBlur}
												customClass="billing__credit-card-form-input"
												onClick={showStripeForm}
												// ngModel="•••"
											/>
										)}
										{errors.cvc && <OcError message={errors.cvc} />}
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="billing__address">
				<h3 className="billing__header">Billing address</h3>
				<Formik
					initialValues={{
						address_line1: '',
						address_line2: '',
						address_country: '',
						address_state: '',
						address_city: '',
						address_zip: '',
					}}
					onSubmit={handleSubmit}
					validate={validateAddress}
				>
					{({ handleSubmit, handleChange, errors, values, handleBlur }) => (
						<Form className="billing__address-form" onSubmit={handleSubmit} noValidate>
							<div className="billing__address-form-field">
								<OcLabelComponent
									text="Address line 1"
									className="billing__address-form-label"
									htmlFor="address_line1"
								/>
								<OcInputComponent
									id="address_line1"
									placeholder="Enter address"
									required
									name="address_line1"
									customClass="billing__address-form-input"
									onChange={handleChange}
									value={values.address_line1}
									onBlur={handleBlur}
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
							<div className="billing__address-form-field">
								<OcLabelComponent
									text="Address line 2"
									customClass="billing__address-form-label"
									htmlFor="address_line2"
								/>
								<OcInputComponent
									//   formControlName="address_line2"
									id="address_line2"
									placeholder="Enter address"
									required={false}
									name="address_line2"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.address_line2}
									customClass="billing__address-form-input"
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
							<div className="billing__address-form-field">
								<OcLabelComponent
									text="Country"
									className="billing__address-form-label"
									htmlFor="address_country"
								/>
								<OcSelect
									// [selectValArr]="billingCountries"
									placeholder="Select country"
									labelField="name"
									idField="address_country"
									value={values.address_country}
									onSelectionChange={handleChange}
									// onBlur={handleBlur}
									//   formControlName="address_country"
									//    (ngModelChange)="onCountriesChange($event)"
									customClass="billing__address-form-input"
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
							<div className="billing__address-form-field">
								<OcLabelComponent
									text="State"
									className="billing__address-form-label"
									//   [className.billing__address-form-label_disabled]="emptyStates"
								/>
								<OcSelect
									// [selectValArr]="billingStates"
									labelField="name"
									//   formControlName="address_state"
									placeholder="Select state"
									customClass="billing__address-form-input"
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
							<div className="billing__address-form-field">
								<OcLabelComponent text="City" className="billing__address-form-label" />
								<OcInputComponent
									//   formControlName="address_city"
									placeholder="City"
									required
									customClass="billing__address-form-input"
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
							<div className="billing__address-form-field">
								<OcLabelComponent text="Postal code" className="billing__address-form-label" />
								<OcInputComponent
									//   formControlName="address_zip"
									placeholder="Postal code"
									required
									customClass="billing__address-form-input"
								/>
								{errors.address_line1 && <OcError message={errors.address_line1} />}
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<div className="billing__actions">
				<OcButtonComponent
					type="primary"
					text={successButtonText}
					customClass="billing__actions-button"
					onClick={billingAction}
				/>
				<OcButtonComponent
					type="secondary"
					text="Cancel"
					customClass="billing__actions-button billing__actions-button_margin-top"
					onClick={clearChanges}
				/>
			</div>
		</>
	);
};
