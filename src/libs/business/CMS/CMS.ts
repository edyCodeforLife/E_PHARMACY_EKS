
import { IResponseSuccess, HandleError } from '../../services/error/error';
import { CMSServiceData, ICMSServiceData } from '../../services/CMS/CMS-service';

export interface ICMSService {
	GetBannerPharmacy(handler: IResponseSuccess): void;
	GetProductDetail(product_id: string, handler: IResponseSuccess): void;
	GeneralSearch(query: string, handler: IResponseSuccess): void;
	GetProductList(page: number, limit: number, handler: IResponseSuccess): void;
	GetContactPharmacy(query: string, handler: IResponseSuccess): void;
	GetTermsCondition(type: string, handler: IResponseSuccess): void;
}

export class CMSService implements ICMSService {
	private _service: ICMSServiceData;

	constructor() {
		this._service = new CMSServiceData();
	}

	async GetBannerPharmacy(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetBannerPharmacy();
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetProductList(page: number, limit: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProductList(page, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetProductDetail(product_id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProductDetail(product_id);
			return await handler.Success?.(response?.data);
		}
		catch (e) {
			return console.log(e);
		}
	}

	async GeneralSearch(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GeneralSearch(query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetContactPharmacy(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetContactPharmacy(query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetTermsCondition(type: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetTermsCondition(type);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}