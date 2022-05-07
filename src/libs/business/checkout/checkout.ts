import { IResponseSuccess, HandleError } from '../../services/error/error';
import { ICheckoutServiceData, CheckoutServiceData } from '../../services/checkout/checkout-service';
import { IRequestUpdateCheckout } from '../../services/checkout/Icheckout-service';

export interface ICheckoutService {
	GetCheckout(cartId: string, handler: IResponseSuccess): void;
	UpdateCheckout(cartId: string, req: IRequestUpdateCheckout, handler: IResponseSuccess): void;
}

export class CheckoutService implements ICheckoutService {
	private _service: ICheckoutServiceData;

	constructor() {
		this._service = new CheckoutServiceData();
	}

	async GetCheckout(cartId: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCheckout(cartId);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async UpdateCheckout(cartId: string, req: IRequestUpdateCheckout, handler: IResponseSuccess) {
		try {
			const response = await this._service.UpdateCheckout(cartId, req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}