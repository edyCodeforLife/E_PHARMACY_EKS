
export interface IResponsePaymentMethod {
	status: boolean;
	message: string;
	data: IDataPaymentMethod[];
}

export interface IDataPaymentMethod {
	id: string;
	type: string;
	weight: number;
	payment_methods: IpaymentMethod[]
}

export interface IpaymentMethod {
	code: string;
	name: string;
	description: string;
	provider: string;
	icon: string;
	data: any;
	weight: number;
}

export interface IPaymentRequest {
	service_id: string;
	type_of_service: string;
	payment_method_code: string;
	voucher_code?: string;
}