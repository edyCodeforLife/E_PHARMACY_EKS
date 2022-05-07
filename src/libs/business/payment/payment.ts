import { IResponseSuccess, HandleError } from '../../services/error/error';
import { IPaymentServiceData, PaymentServiceData } from '../../services/payment/Payment';
import { IPaymentRequest } from '../../services/payment/IPayment';

export interface IPaymentService {
	GetPaymentMethod(type_of_service: string, transaction_id: any, handler: IResponseSuccess): void;
	GetPaymentDetail(orderRefCode: string, handler: IResponseSuccess): void;
	PostPayment(req: IPaymentRequest, handler: IResponseSuccess): void;
}

export class PaymentService implements IPaymentService {
	private _service: IPaymentServiceData;

	constructor() {
		this._service = new PaymentServiceData();
	}

	async GetPaymentMethod(type_of_service: string, transaction_id: any, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetPaymentMethod(type_of_service, transaction_id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetPaymentDetail(orderRefCode: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetPaymentDetail(orderRefCode);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async PostPayment(req: IPaymentRequest, handler: IResponseSuccess) {
		try {
			const response = await this._service.PostPayment(req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}