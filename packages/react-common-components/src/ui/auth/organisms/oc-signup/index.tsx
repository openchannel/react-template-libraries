import * as React from 'react';
import { OcLabelComponent, OcButtonComponent } from '../../../common';
import { OcEditUserFormComponent } from '../../../auth';
import { Link } from 'react-router-dom';

export const OcSignupComponent: React.FC<any> = (props) => {
	const {
		companyLogoUrl = '../../../../assets/img/logo-company.png',
		process,
		loginUrl = '/',
		showSignupFeedbackPage,
		setFeedbackPageVisible,
		forgotPasswordDoneUrl,
		goToActivationPage,
		termsChecked,
		setTermsChecked,
		formConfigs,
		enableTypesDropdown,
		defaultTypeLabelText,
		customTermsDescription,
		selectConfigOptions,
		selectValue,
		setSelectValue,
		defaultEmptyConfigsErrorMessage,
		onCancel,
		onSubmit,
		enablePasswordField,
	} = props;

	const handleShowFeedback = React.useCallback(
		() => setFeedbackPageVisible(!showSignupFeedbackPage),
		[showSignupFeedbackPage],
	);

	return (
		<div className="sign-up login-card login-card_borders">
			{!showSignupFeedbackPage && (
				<div>
					<div className="sign-up__card-body">
						<div className="sign-up__logo">
							<img alt="logo" className="sign-up__logo-img company-logo" src={companyLogoUrl} />
						</div>
						<div className="sign-up__header">
							<h4 className="sign-up__header-heading">Sign Up</h4>
							<OcLabelComponent
								text="Enter your account details below"
								className="sign-up__header-invitation"
							></OcLabelComponent>
						</div>
						<div>
							<OcEditUserFormComponent
								formConfigs={formConfigs}
								enableTypesDropdown={enableTypesDropdown}
								defaultTypeLabelText={defaultTypeLabelText}
								customTermsDescription={customTermsDescription}
								termsChecked={termsChecked}
								setTermsChecked={setTermsChecked}
								selectConfigOptions={selectConfigOptions}
								selectValue={selectValue}
								setSelectValue={setSelectValue}
								onCancel={onCancel}
								onSubmit={onSubmit}
								enablePasswordField={enablePasswordField}
								defaultEmptyConfigsErrorMessage={defaultEmptyConfigsErrorMessage}
							/>
							<OcButtonComponent
								disabled={process}
								htmlType="submit"
								text="Sign Up"
								type="primary"
								customClass="sign-up__button"
							/>
						</div>
						<div className="sign-up__login">
							Already have an account?{' '}
							<Link className="sign-up__login-link" to={loginUrl}>
								Log In
							</Link>
						</div>
					</div>
				</div>
			)}

			{showSignupFeedbackPage && (
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
							<OcLabelComponent text="An activation email has been sent to your inbox."></OcLabelComponent>
						</div>
						<OcButtonComponent
							onClick={goToActivationPage}
							disabled={false}
							text="Activate account"
							type="primary"
							className="sign-up__button"
						></OcButtonComponent>
						<div className="result__sign-up-message">
							<OcLabelComponent text="Don't have an account yet?"></OcLabelComponent>
							<button className="result__link" onClick={handleShowFeedback}>
								{' '}
								Sign Up
							</button>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};
