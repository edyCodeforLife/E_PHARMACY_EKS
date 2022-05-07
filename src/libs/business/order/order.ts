import { IResponseSuccess, HandleError } from '../../services/error/error';
import { IOrderServiceData, OrderServiceData } from '../../services/order/Order-service';
import { IRequestOrder, IRequestOrderReview, StatusOrder } from '../../services/order/IOrder-service';

export interface IOrderService {
	PostOrder(req: IRequestOrder, handler: IResponseSuccess): void;
	GetOrderList(status: StatusOrder, _limit: number, _page: number, handler: IResponseSuccess): void;
	GetOrderById(id: string, handler: IResponseSuccess): void;
	PostOrderCompleted(id: string, handler: IResponseSuccess): void;
	PostOrderReview(id: string, req: IRequestOrderReview, handler: IResponseSuccess): void;
}

export class OrderService implements IOrderService {
	private _service: IOrderServiceData;

	constructor() {
		this._service = new OrderServiceData();
	}

	async PostOrder(req: IRequestOrder, handler: IResponseSuccess) {
		try {
			const response = await this._service.PostOrder(req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetOrderList(status: StatusOrder, _limit: number, _page: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetOrderList(status, _limit, _page);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetOrderById(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetOrderById(id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async PostOrderCompleted(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.PostOrderCompleted(id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async PostOrderReview(id: string, req: IRequestOrderReview, handler: IResponseSuccess) {
		try {
			const response = await this._service.PostOrderReview(id, req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}