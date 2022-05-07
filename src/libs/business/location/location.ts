import { IResponseSuccess, HandleError } from '../../services/error/error';
import { IRequestAddress } from '../../services/address/iaddress-service';
import { ILocationServiceData, LocationServiceData } from '../../services/location/location-service';

export interface ILocationService {
    GetCountry(query: string, handler: IResponseSuccess): void;
	GetProvince(query: string, id: string, handler: IResponseSuccess): void;
	GetCities(query: string, id: string, handler: IResponseSuccess): void;
    GetDistricts(query: string, id: string, handler: IResponseSuccess): void;
    GetSubDistricts(query: string, id: string, handler: IResponseSuccess): void;
}

export class LocationService implements ILocationService {
	private _service: ILocationServiceData;

	constructor() {
		this._service = new LocationServiceData();
	}

    async GetCountry(query: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCountry(query);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

    async GetProvince(query: string, id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProvince(query, id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

    async GetCities(query: string, id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetCities(query, id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

    async GetDistricts(query: string, id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetDistricts(query, id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

    async GetSubDistricts(query: string, id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetSubDistricts(query, id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}	
}