import { IResponseSuccess, HandleError } from '../../services/error/error';
import { CartServiceData, ICartServiceData } from '../../services/cart/cart-service';
import { IRequestCart, IRequestUpdateQty } from '../../services/cart/icart-service';

export interface ICartService {
    AddToCart(req: IRequestCart, handler: IResponseSuccess): void;
	GetUserCart(handler: IResponseSuccess): void;
	GetCartCount(handler: IResponseSuccess): void;
    DeleteProductFromCart(id: number, product_id: string, handler: IResponseSuccess): void;
    UpdateQtyProduct(id: number, product_id: string, req: IRequestUpdateQty, handler: IResponseSuccess): void;
}

export class CartService implements ICartService {
	private _service: ICartServiceData;

	constructor() {
		this._service = new CartServiceData();
	}

	async AddToCart(req: IRequestCart, handler: IResponseSuccess) {
		try {
			const response = await this._service.AddToCart(req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetUserCart(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetUserCart();
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetCartCount(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCartCount();
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async DeleteProductFromCart(id: number, product_id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.DeleteProductFromCart(id, product_id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async UpdateQtyProduct(id: number, product_id: string, req: IRequestUpdateQty, handler: IResponseSuccess) {
		try {
			const response = await this._service.UpdateQtyProduct(id, product_id, req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}