export interface IResponseBanner {
	status: boolean;
	message: string;
	data: IBannerData[];
}

export interface IBannerData {
	banner_id: string;
	title: string;
	type: string;
	description: string;
	need_login: boolean;
	deeplink_type_android: string;
	deeplink_url_android: string;
	deeplink_type_ios: string;
	deeplink_url_ios: string;
	image_mobile: string;
	image_desktop: string;
	category: string;
}

export interface IResponseProductList {
	status: boolean;
	message: string;
	data: IProductList[];
}

export interface IProductList {
	id: string;
	name: string;
	quantity: number;
	original_price: IPrice;
	price: IPrice;
	desc: string;
	regis_no: string;
	classification: string;
	package: string;
	images: IImages[];
}

export interface IPrice {
	raw: number;
	formatted: string;
}

export interface IImages {
	size_formatted: string
	mimeType: string;
	url: string;
	formats: IImagesFormat;
	uploadedBy?: any;
}

export interface IImagesFormat {
	thumbnail: string;
	large: string;
	medium: string;
	small: string;
}

export interface IResponseProductDetail {
	status: boolean;
	message: string;
	data: IProductList;
}

export interface IResponseGeneralSearch {
	status: boolean;
	message: string;
	data: IProductList[];
}

export interface IResponseTermsCondition {
	status: true;
	message: string;
	data: IDataTermsCondition[];
}

export interface IDataTermsCondition {
	block_id: string;
	title: string;
	type: string;
	text: string;
}