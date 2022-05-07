import { IImagesFormat } from "../CMS/ICMS-service";

export interface IResponseGetCheckout {
	message: string;
	data: IGetDataCheckout;
}

export interface IGetDataCheckout {
	cart_id: number;
	user_id: string;
	delivery_address: IDeliveryAddress;
	courier: ICourier;
	product: IProduct[];
	total_payment: number;
	total_product_payment: number;
}

export interface IDeliveryAddress {
	id: any;
	receiver_name: string;
	receiver_phone: string;
	street: string;
	country: object;
	province: object;
	city: object;
	district: object;
	sub_district: object;
	rt_rw: string;
}

export interface ICourier {
	id: any;
	name: string;
	is_free: boolean;
	flat_price: number;
}

export interface IProduct {
	id: string;
	name: string;
	package: string;
	price: number;
	original_price: number;
	image: IImage[];
}

export interface IImage {
	_id: string;
	name: string;
	alternativeText: string;
	caption: string;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	width: number;
	height: number;
	url: string;
	formats: IImagesFormat
	provider: string;
	related: string[];
	createdAt: Date | string;
	updatedAt: Date | string;
	__v: number;
	created_by: string;
	updated_by: string;
	id: string;
}

export interface IRequestUpdateCheckout {
	address_delivery_id: any;
	courier_id?: string;
}

export interface IResponseUpdateCheckout {
	message: string;
}