import { AxiosPromise } from 'axios';
import { IRequestOrder, IRequestOrderReview, IResponseOrder, IResponseOrderById, IResponseOrderCompleted, IResponseOrderList, StatusOrder } from './IOrder-service';
import { TeleService } from '../config';

export interface IOrderServiceData {
	PostOrder(req: IRequestOrder): AxiosPromise<IResponseOrder>;
	GetOrderList(status: StatusOrder, _limit: number, _page: number): AxiosPromise<IResponseOrderList>;
	GetOrderById(id: string): AxiosPromise<IResponseOrderById>;
	PostOrderCompleted(id: string): AxiosPromise<IResponseOrderCompleted>;
	PostOrderReview(id: string, req: IRequestOrderReview): AxiosPromise<IResponseOrderCompleted>;
}

export class OrderServiceData implements IOrderServiceData {
	PostOrder(req: IRequestOrder): AxiosPromise<IResponseOrder> {
		return TeleService.post<IResponseOrder>('/ecommerce/order', req);
	}

	GetOrderList(status: StatusOrder, _limit: number, _page: number): AxiosPromise<IResponseOrderList> {
		return TeleService.get<IResponseOrderList>(`/ecommerce/order?status=${status}&limit=${_limit}&page=${_page}`)
	}

	GetOrderById(id: string): AxiosPromise<IResponseOrderById> {
		return TeleService.get<IResponseOrderById>(`/ecommerce/order/${id}`);
	}

	PostOrderCompleted(id: string): AxiosPromise<IResponseOrderCompleted> {
		return TeleService.patch<IResponseOrderCompleted>(`ecommerce/order/${id}/completed`);
	}

	PostOrderReview(id: string, req: IRequestOrderReview): AxiosPromise<IResponseOrderCompleted> {
		return TeleService.patch<IResponseOrderCompleted>(`ecommerce/order/${id}/review`, req);
	}
}