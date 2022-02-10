import * as React from 'react';
import { CountryRegionData } from 'react-country-region-selector';
import {
	OcButtonComponent,
	OcError,
	OcInputComponent,
	OcLabelComponent,
	OcSelect,
} from '@openchannel/react-common-components/src/ui/index';
import { Form, FormikValues, useFormik, FormikContext } from 'formik';
import { noop } from 'lodash-es';
import { Option } from '../../../common/index';
import { ReactComponent as CalendarIcon } from '../../../../assets/img/calendar-icon.svg';

import { BillingFormProps } from './types';
import { handleCardNumberChange, validateAddress, validateCreditCard } from './utils';

import './style.scss';

export const BillingForm: React.FC<BillingFormProps> = (props) => {
	const {
		hideCardFormElements = false,
		showStripeForm = noop,
		// cardForm,
		handleSubmit = noop,
		successButtonText = 'Save',
		// billingAction = noop,
		// clearChanges = noop,
	} = props;

	const billingCountries = CountryRegionData.map((ctr) => ctr[0]);
	const [selectedCountry, setSelectedCountry] = React.useState('');

	const billingStates =
		selectedCountry.length > 0
			? CountryRegionData.filter((ctr) => ctr[0] === selectedCountry)
					.flat()[2]
					.split('|')
					.map((st) => st.replace(/(~[a-zA-Z\d]+$)/gm, ''))
			: [];
	const [selectedState, setSelectedState] = React.useState('');

	const formikCard = useFormik({
		initialValues: {
			name: '',
			card_number: '',
			expiration: '',
			cvc: '',
		},
		validate: validateCreditCard,
		onSubmit: (values) => console.log(values),
	});
	const formikAddress = useFormik({
		initialValues: {
			address_line1: '',
			address_line2: '',
			address_country: '',
			address_state: '',
			address_city: '',
			address_zip: '',
		},
		validate: validateAddress,
		onSubmit: (values) => console.log(values),
	});

	const finalHandleSubmit = (e: any) => {
		formikCard.handleSubmit(e);
		formikAddress.handleSubmit(e);
		handleSubmit(e);
	};

	const handleCancel = React.useCallback(() => {
		formikCard.resetForm();
		formikAddress.resetForm();
	}, [formikCard, formikAddress]);

	return (
		<>
			<div className="billing__credit-card">
				<h3 className="billing__header">Credit card information</h3>
				<FormikContext.Provider value={formikCard}>
					<Form className="billing__credit-card-form" onSubmit={formikCard.handleSubmit} noValidate>
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
							onChange={formikCard.handleChange}
							value={formikCard.values.name}
							onBlur={formikCard.handleBlur}
							customClass={`billing__credit-card-form-input billing__credit-card-form-group ${
								formikCard.errors.name ? 'invalid' : ''
							}`}
						/>
						{formikCard.errors.name && <OcError message={formikCard.errors.name} />}
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
									onChange={(e: any) => handleCardNumberChange(e, formikCard.handleChange)}
									value={formikCard.values.card_number}
									onBlur={formikCard.handleBlur}
									// [ngModel]="'••• ••• ••• ' + cardData.last4"
									customClass={`billing__credit-card-form-input ${
										formikCard.errors.card_number ? 'invalid' : ''
									}`}
									onClick={showStripeForm}
								/>
							)}
							{formikCard.errors.card_number && <OcError message={formikCard.errors.card_number} />}
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
												onChange={formikCard.handleChange}
												onBlur={formikCard.handleBlur}
												// [ngModel]="cardData.exp_month + '/' + cardData.exp_year.toString().slice(-2)"
												customClass={`billing__credit-card-form-input ${
													formikCard.errors.expiration ? 'invalid' : ''
												}`}
												onClick={showStripeForm}
												value={formikCard.values.expiration}
											/>
										)}
										<div className="billing__credit-card-form-expiration-svg">
											<CalendarIcon />
										</div>
									</div>
									{formikCard.errors.expiration && (
										<OcError message={formikCard.errors.expiration} />
									)}
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
											value={formikCard.values.cvc}
											onChange={formikCard.handleChange}
											onBlur={formikCard.handleBlur}
											customClass="billing__credit-card-form-input"
											onClick={showStripeForm}
											// ngModel="•••"
										/>
									)}
									{formikCard.errors.cvc && <OcError message={formikCard.errors.cvc} />}
								</div>
							</div>
						</div>
					</Form>
				</FormikContext.Provider>
			</div>
			<div className="billing__address">
				<h3 className="billing__header">Billing address</h3>
				<FormikContext.Provider value={formikAddress}>
					<Form className="billing__address-form" onSubmit={formikAddress.handleSubmit} noValidate>
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
								customClass={`billing__address-form-input ${
									formikAddress.errors.address_line1 ? 'invalid' : ''
								}`}
								onChange={formikAddress.handleChange}
								value={formikAddress.values.address_line1}
								onBlur={formikAddress.handleBlur}
							/>
							{formikAddress.errors.address_line1 && (
								<OcError message={formikAddress.errors.address_line1} />
							)}
						</div>
						<div className="billing__address-form-field">
							<OcLabelComponent
								text="Address line 2"
								customClass="billing__address-form-label"
								htmlFor="address_line2"
							/>
							<OcInputComponent
								id="address_line2"
								placeholder="Enter address"
								required={false}
								name="address_line2"
								onChange={formikAddress.handleChange}
								onBlur={formikAddress.handleBlur}
								value={formikAddress.values.address_line2}
								customClass="billing__address-form-input"
							/>
							{formikAddress.errors.address_line2 && (
								<OcError message={formikAddress.errors.address_line2} />
							)}
						</div>
						<div className="billing__address-form-field">
							<OcLabelComponent
								text="Country"
								className="billing__address-form-label"
								htmlFor="address_country"
							/>
							<OcSelect
								selectValArr={billingCountries}
								placeholder="Select country"
								labelField="label"
								idField="address_country"
								value={selectedCountry}
								onSelectionChange={(e: any) => {
									setSelectedCountry(e.label);
									formikAddress.setFieldValue('address_country', e.label);
								}}
								onBlur={formikAddress.handleBlur}
								name="address_country"
								customClass="billing__address-form-input"
							/>
							{formikAddress.errors.address_country && (
								<OcError message={formikAddress.errors.address_country} />
							)}
						</div>
						<div className="billing__address-form-field">
							<OcLabelComponent text="State" className="billing__address-form-label" />
							<OcSelect
								selectValArr={billingStates}
								name="address_state"
								value={selectedState}
								onSelectionChange={(e: any) => {
									setSelectedState(e);
									formikAddress.setFieldValue('address_state', e);
								}}
								onBlur={formikAddress.handleBlur}
								placeholder="Select state"
								customClass="form-control billing__address-form-input select-component"
								disabled={selectedCountry === ''}
							/>
							{formikAddress.errors.address_state && (
								<OcError message={formikAddress.errors.address_state} />
							)}
						</div>
						<div className="billing__address-form-field">
							<OcLabelComponent text="City" className="billing__address-form-label" />
							<OcInputComponent
								name="address_city"
								placeholder="City"
								required
								value={formikAddress.values.address_city}
								onChange={formikAddress.handleChange}
								onBlur={formikAddress.handleBlur}
								customClass={`billing__address-form-input ${
									formikAddress.errors.address_city ? 'invalid' : ''
								}`}
							/>
							{formikAddress.errors.address_city && (
								<OcError message={formikAddress.errors.address_city} />
							)}
						</div>
						<div className="billing__address-form-field">
							<OcLabelComponent text="Postal code" className="billing__address-form-label" />
							<OcInputComponent
								//   formControlName="address_zip"
								placeholder="Postal code"
								required
								value={formikAddress.values.address_zip}
								onChange={formikAddress.handleChange}
								onBlur={formikAddress.handleBlur}
								customClass={`billing__address-form-input ${
									formikAddress.errors.address_zip ? 'invalid' : ''
								}`}
							/>
							{formikAddress.errors.address_zip && (
								<OcError message={formikAddress.errors.address_zip} />
							)}
						</div>
					</Form>
				</FormikContext.Provider>
			</div>
			<div className="billing__actions">
				<OcButtonComponent
					type="primary"
					text={successButtonText}
					customClass="billing__actions-button"
					onClick={finalHandleSubmit}
				/>
				<OcButtonComponent
					type="secondary"
					text="Cancel"
					customClass="billing__actions-button billing__actions-button_margin-top"
					onClick={handleCancel}
				/>
			</div>
		</>
	);
};
