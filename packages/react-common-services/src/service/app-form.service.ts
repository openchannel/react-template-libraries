import { api } from '../lib/api';
import { CreateFormSubmissionModel } from '../model/api/app-form.model';
import { QueryUtil } from '../util/query.util';

const FORMS_URL = 'v2/forms';

export const formsService = {
	/**
	 * Description: Returns list of forms.
	 * This is private API endpoint. User/Developer must have 'FORMS.READ' permission.<br>
	 *
	 *
	 * @param {number} pageNumber Current page index. Starts from >= 1.
	 * @param {number} pageLimit Count Forms into response. Starts from >= 1.
	 * @returns {Page<AppFormModelResponse>}
	 */
	getForms: (pageNumber: number, pageLimit: number) => {
		const mainUrl = `${FORMS_URL}?${QueryUtil.getPaginationQuery(pageNumber, pageLimit)}`;
		return api.get(mainUrl);
	},

	/**
	 * Description: Returns list form by ID.
	 * This is public API endpoint.
	 * @param {string} formId - the id of the form.
	 * @returns {AppFormModelResponse}
	 */
	getForm: (formId: string) => {
		const mainUrl = `${FORMS_URL}/${formId}`;
		return api.get(mainUrl);
	},

	/**
	 * Description: Creating an form submission for a particular form.
	 * This can be useful for tracking leads or contact form submissions.
	 * This is public API endpoint.<br>
	 * [OpenChannel docs]{@link https://support.openchannel.io/documentation/api/user-api/forms/create-form-submission/}
	 * @param {string} formId - unique formId identifier.
	 * @param {CreateFormSubmissionModel} createFormSubmissionModel - request body.
	 * @returns {FormSubmissionModel}
	 */
	createFormSubmission: (formId: string, createFormSubmissionModel: CreateFormSubmissionModel) => {
		const mainUrl = `${FORMS_URL}/${formId}/submissions`;
		return api.post(mainUrl, { body: createFormSubmissionModel });
	},
};
