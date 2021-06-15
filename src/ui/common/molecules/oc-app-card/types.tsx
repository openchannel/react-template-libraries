export interface AppModel {
	type: string;
	price: number;
	trial: number;
	license: string;
	modelId: string;
	currency: string;
	commission?: number;
	feePayer?: string;
	billingPeriod?: string | 'daily' | 'weekly' | 'monthly' | 'annually';
	billingPeriodUnit?: any;
}

export interface Restrict {
	own: {
		country: string[];
	};
	view: {
		country: string[];
	};
}

export type ComponentsAppStatusValue =
	| 'pending'
	| 'inReview'
	| 'inDevelopment'
	| 'approved'
	| 'suspended'
	| 'rejected';

export interface AppStatus {
	value: ComponentsAppStatusValue;
	lastUpdated: number;
	modifiedBy: string;
	reason: string;
}

export interface Parent {
	status: AppStatus;
}

export interface StatElement {
	'90day': number;
	'30day': number;
	total: number;
}

export interface Statistics {
	views: StatElement;
	downloads: StatElement;
	developerSales: StatElement;
	totalSales: StatElement;
	ownerships: StatElement;
	reviews: StatElement;
}

export interface CustomDataAppConfig {
	icon: string;
	logo: string;
	summary: string;
	description: string;
	video: string;
	images: string;
	categories: string;
	author: string;
	gallery: string;
}

export interface GalleryItem {
	title: string;
	description: string;
	image: string;
}

export interface OwnershipModel {
	ownershipId: string;
	date: Date;
	appId: string;
	userId: string;
	developerId: string;
	ownershipType: string | 'full' | 'subscription' | 'trial';
	ownershipStatus: string | 'pending' | 'active' | 'uninstalled' | 'cancelled';
	uninstallDate?: Date;
	expires?: Date;
	model: AppModel;
	customData?: any;
}

export interface AppTypeOptionModel {
	value: string;
}

export interface AppTypeFieldModel {
	id: string;
	label: string;
	type: string;
	attributes?: any;
	description?: string;
	fields?: AppTypeFieldModel[];
	subFieldDefinitions?: AppTypeFieldModel[];
	defaultValue?: any;
	placeholder?: string;
	options?: AppTypeOptionModel[] | string[];
	specialType?: string;
}

export interface AppTypeModel {
	appTypeId: string;
	label?: string;
	description?: string;
	createdDate: any;
	fields?: AppTypeFieldModel[];
}

/**
 * Class used for mapping apps customData to proper fields.
 * If you need more fields just extend this class.
 *
 * @example
 * export class MyFullAppData extends FullAppData {
 *   myField: string;
 *
 *   constructor(appData: AppVersion, customDataConfig: CustomDataAppConfig) {
 *   super(appData, customDataConfig);
 *
 *   this.myField = appData.customData[customDataConfig.myField] || '';
 * }
 *
 * this.appService.getAppById('appId')
 *  .map((app: App) => new MyFullAppData(app, {icon: 'image1', myFiled: 'fieldNameInCustomData'}))
 */
export interface FullAppData {
	/**
	 * App fields
	 */
	appId: string;
	customData?: any;
	lastUpdated: number | Date;
	version: number;
	name: string;
	safeName: string[];
	developerId: string;
	model: AppModel[];
	access?: string[];
	restrict?: Record<string, unknown> | Restrict;
	allow?: Record<string, unknown> | Restrict;
	submittedDate: number | Date;
	created: number | Date;
	attributes?: any;
	rating: number;
	reviewCount: number;
	status: AppStatus;
	statistics: Statistics;
	isLive: boolean;
	type?: string;

	/**
	 * App version fields
	 */
	isLatestVersion?: boolean;
	children?: FullAppData[];
	parent?: Parent;
	ownership?: OwnershipModel;

	/**
	 * custom data fields mapped in constructor
	 */
	icon?: string;
	logo?: string;
	summary?: string;
	description?: string;
	video?: string;
	images?: string[];
	categories?: string[];
	author?: string;
	gallery?: GalleryItem[];
}
