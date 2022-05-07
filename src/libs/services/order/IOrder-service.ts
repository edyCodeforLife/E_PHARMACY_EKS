import { ICity, ICountry, IDistrict, IProvince, ISubDistrict } from '../address/iaddress-service';
import { ICourier } from '../checkout/Icheckout-service';
import { IPrice, IImages } from '../CMS/ICMS-service';

export interface IRequestOrder {
	cart_id: number;
	courier_id: string;
	address_delivery_id: string;
	total_product_payment: number;
	total_delivery_fee: number;
	service_fee: number;
	total_payment: number;
	notes_delivery: string;
	product: IProductOrder[];
}

export interface IProductOrder {
	id: string;
	price: number;
	original_price: number;
	qty: number;
}

export interface IResponseOrder {
	message: string;
	data: IDataOrder;
}

export interface IDataOrder {
	billing_id: number;
	order_id: number;
	order_ref_code: string;
}

export interface IResponseOrderList {
	message: string;
	data: IOrderListData[];
}

export interface IOrderListData {
	order_id: string
	status: IStatusPayment;
	ref_code: string;
	billing_id: number;
	product_id: IProduct;
	updated_at: string | Date;
}

export interface IStatusPayment {
	label: string;
	textColor: string;
	bgColor: string;
	orderStatus: string;
}

export interface IProduct {
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

export interface IResponseOrderById {
	message: string;
	data: IOrderData;
}

export interface IOrderData {
	order_id: string | number;
	ref_code: string;
	billing_id: number;
	status: IStatusPayment;
	note: string;
	note_delivery: string;
	delivery_address: IDeliveryAddress;
	courier: ICourier;
	product: IProductOrderById[];
	total_product_price: string;
	total_delivery: number;
	total_service_fee: string;
	total_price: number;
	is_review: boolean;
	created_at: string;
}

export interface IProductOrderById {
	id: string;
	name: string;
	package: string;
	price: number;
	original_price: number
	qty: number;
	image: IImages[];
}

export interface IDeliveryAddress {
	id: string;
	receiver_name: string;
	receiver_phone: string;
	street: string;
	country: ICountry;
	province: IProvince;
	city: ICity;
	district: IDistrict;
	sub_district: ISubDistrict;
	rt_rw: string;
}

export interface IResponseOrderCompleted {
	message: string;
}

export interface IRequestOrderReview {
	review_stars: number;
	review_note: string;
}

export type StatusOrder = 'ACTIVE' | 'DONE' | 'REJECT';