import { AxiosPromise } from 'axios';
import { IRequestCart, IResponseAddToCart, IResponseGetUserCart, IResponseGetCartCount, IResponseDeleteProductCart, IRequestUpdateQty, IResponseUpdateQtyProduct } from './icart-service';
import { TeleService } from '../config';

export interface ICartServiceData {
	AddToCart(req: IRequestCart): AxiosPromise<IResponseAddToCart>;
	GetUserCart(): AxiosPromise<IResponseGetUserCart>;
	GetCartCount(): AxiosPromise<IResponseGetCartCount>;
    DeleteProductFromCart(id: number, product_id: string): AxiosPromise<IResponseDeleteProductCart>;
    UpdateQtyProduct(id: number, product_id: string, req: IRequestUpdateQty): AxiosPromise<IResponseUpdateQtyProduct>;
}

export class CartServiceData implements ICartServiceData {
	AddToCart(req: IRequestCart): AxiosPromise<IResponseAddToCart> {
		return TeleService.post<IResponseAddToCart>('/ecommerce/cart', req);
	}

    GetUserCart(): AxiosPromise<IResponseGetUserCart> {
		return TeleService.get<IResponseGetUserCart>('/ecommerce/cart');
	}

    GetCartCount(): AxiosPromise<IResponseGetCartCount> {
		return TeleService.get<IResponseGetCartCount>('/ecommerce/cart/count');
	}

    DeleteProductFromCart(id: number, product_id: string): AxiosPromise<IResponseDeleteProductCart> {
        return TeleService.delete<IResponseDeleteProductCart>(`/ecommerce/cart/${id}/product/${product_id}`)
    }

	UpdateQtyProduct(id: number, product_id: string, req: IRequestUpdateQty): AxiosPromise<IResponseDeleteProductCart> {
        return TeleService.patch<IResponseUpdateQtyProduct>(`/ecommerce/cart/${id}/product/${product_id}`, req)
    }

}