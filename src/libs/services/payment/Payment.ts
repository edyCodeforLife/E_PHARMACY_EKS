import { AxiosPromise } from 'axios';
import { IResponsePaymentMethod, IPaymentRequest } from './IPayment';
import { TeleService } from '../config';

export interface IPaymentServiceData {
	GetPaymentMethod(type_of_service: string, transaction_id: any): AxiosPromise<IResponsePaymentMethod>;
	GetPaymentDetail(orderRefCode: string): AxiosPromise<any>;
	PostPayment(req: IPaymentRequest): AxiosPromise<any>;
}

export class PaymentServiceData implements IPaymentServiceData {
	GetPaymentMethod(type_of_service: string, transaction_id: any): AxiosPromise<IResponsePaymentMethod> {
		return TeleService.get<IResponsePaymentMethod>(`/data/payment-types?type_of_service=${type_of_service}&transaction_id=${transaction_id}`);
	}

	GetPaymentDetail(orderRefCode: string): AxiosPromise<IResponsePaymentMethod> {
		return TeleService.get<IResponsePaymentMethod>(`/billing/v1/billing/FARMASI/${orderRefCode}`);
	}

	PostPayment(req: IPaymentRequest): AxiosPromise<any> {
		return TeleService.post<any>(`/billing/v1/payment`, req);
	}
}