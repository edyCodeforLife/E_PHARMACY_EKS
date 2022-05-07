
import { AxiosPromise } from 'axios';
import { IResponseBanner, IResponseProductList, IResponseProductDetail, IResponseGeneralSearch, IResponseTermsCondition } from './ICMS-service';
import { TeleService } from '../config';

export interface ICMSServiceData {
	GetBannerPharmacy(): AxiosPromise<IResponseBanner>;
	GetProductDetail(product_id: string): AxiosPromise<IResponseProductDetail>;
	GeneralSearch(query: string): AxiosPromise<IResponseGeneralSearch>;
	GetProductList(page: number, limit: number): AxiosPromise<IResponseProductList>;
	GetContactPharmacy(query: string): AxiosPromise<any>;
	GetTermsCondition(type: string): AxiosPromise<IResponseTermsCondition>;
}

export class CMSServiceData implements ICMSServiceData {
	GetBannerPharmacy(): AxiosPromise<IResponseBanner> {
		return TeleService.get<IResponseBanner>('/data/banners?category=PHARMACY');
	}

	GetProductList(page: number, limit: number): AxiosPromise<IResponseProductList> {
		return TeleService.get<IResponseProductList>(`/data/products?_page=${page}&_limit=${limit}`);
	}

	GetProductDetail(product_id: string): AxiosPromise<IResponseProductDetail> {
		return TeleService.get<IResponseProductDetail>(`/data/products/${product_id}`);
	}

	GeneralSearch(query: string): AxiosPromise<IResponseGeneralSearch> {
		return TeleService.get<IResponseGeneralSearch>(`/data/products?name_contains=${query}`);
	}

	GetContactPharmacy(query: string): AxiosPromise<any> {
		return TeleService.get<IResponseGeneralSearch>(`/data/contents?type=${query}`);
	}

	GetTermsCondition(type: string): AxiosPromise<IResponseTermsCondition> {
		return TeleService.get<IResponseTermsCondition>(`/data/blocks?type=${type}`);
	}
}