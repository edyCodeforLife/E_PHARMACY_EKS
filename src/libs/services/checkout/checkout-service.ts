import { AxiosPromise } from 'axios';
import { IRequestUpdateCheckout, IResponseGetCheckout, IResponseUpdateCheckout } from './Icheckout-service';
import { TeleService } from '../config';

export interface ICheckoutServiceData {
	GetCheckout(cartId: string): AxiosPromise<IResponseGetCheckout>;
	UpdateCheckout(cartId: string, req: IRequestUpdateCheckout): AxiosPromise<IResponseUpdateCheckout>
}

export class CheckoutServiceData implements ICheckoutServiceData {
	GetCheckout(cartId: string): AxiosPromise<IResponseGetCheckout> {
		return TeleService.get<IResponseGetCheckout>(`/ecommerce/checkout/${cartId}`);
	}

	UpdateCheckout(cartId: string, req: IRequestUpdateCheckout): AxiosPromise<IResponseUpdateCheckout> {
		return TeleService.patch<IResponseUpdateCheckout>(`/ecommerce/checkout/${cartId}`, req);
	}
}