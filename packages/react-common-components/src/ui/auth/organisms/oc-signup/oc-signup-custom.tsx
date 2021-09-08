import * as React from 'react';
import { Link } from 'react-router-dom';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';
import { OcEditUserFormComponent } from '../oc-edit-user-form';

import { SignupProps } from './types';

import './style.scss';

export const OcSignupComponent: React.FC<SignupProps> = (props) => {
	const {
		companyLogoUrl = '../../../../assets/img/logo-company.png',
		loginUrl = '/',
		showSignupFeedbackPage,
		forgotPasswordDoneUrl,
		goToActivationPage,
		formConfigs,
		enableTypesDropdown,
		enableCustomTerms,
		enableTermsCheckbox,
		defaultTypeLabelText,
		ordinaryTermsDescription,
		customTermsDescription,
		defaultEmptyConfigsErrorMessage,
		onSubmit,
		enablePasswordField,
	} = props;

	const [showFeedbackPage, setFeedbackPageVisible] = React.useState(showSignupFeedbackPage);

	const handleShowFeedback = React.useCallback(
		() => setFeedbackPageVisible(!showFeedbackPage),
		[showFeedbackPage, setFeedbackPageVisible],
	);

	return (
		<div className="sign-up login-card login-card_borders">
			{!showFeedbackPage && (
				<div>
					<div className="sign-up__card-body">
						<div className="sign-up__logo">
							<img alt="logo" className="sign-up__logo-img company-logo" src={companyLogoUrl} />
						</div>
						<div className="sign-up__header">
							<h4 className="sign-up__header-heading">Sign Up</h4>
							<OcLabelComponent
								text="Enter your account details below"
								customClass="sign-up__header-invitation"
							/>
						</div>
						{formConfigs !== null && (
							<div>
								<OcEditUserFormComponent
									formConfigs={formConfigs}
									enableTypesDropdown={enableTypesDropdown}
									defaultTypeLabelText={defaultTypeLabelText}
									customTermsDescription={customTermsDescription}
									ordinaryTermsDescription={ordinaryTermsDescription}
									onSubmit={onSubmit}
									enableCustomTerms={enableCustomTerms}
									enableTermsCheckbox={enableTermsCheckbox}
									enablePasswordField={enablePasswordField}
									defaultEmptyConfigsErrorMessage={defaultEmptyConfigsErrorMessage}
									submitText="Sign Up"
								/>
							</div>
						)}
						<div className="sign-up__login">
							Already have an account?{' '}
							<Link className="sign-up__login-link" to={loginUrl}>
								Log In
							</Link>
						</div>
					</div>
				</div>
			)}

			{showFeedbackPage && (
				<form>
					<div className="sign-up__card-body result">
						<div className="sign-up__logo result__logo">
							<img alt="logo" className=" company-logo" src={companyLogoUrl} />
						</div>
						<div className="result__message">
							<img
								alt="dropdown-icon"
								className="result__message-img"
								src={forgotPasswordDoneUrl}
							/>
							<h4 className="result__message-heading">Done!</h4>
							<OcLabelComponent text="An activation email has been sent to your inbox." />
						</div>
						<OcButtonComponent
							onClick={goToActivationPage}
							text="Activate account"
							customClass="sign-up__button"
						/>
						<div className="result__sign-up-message">
							<OcLabelComponent text="Don't have an account yet?" />
							<span
								role="button"
								tabIndex={0}
								className="result__link"
								onClick={handleShowFeedback}
							>
								{' '}
								Sign Up
							</span>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default OcSignupComponent;
