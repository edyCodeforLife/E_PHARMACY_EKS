import { AxiosPromise } from 'axios';
import { TeleService } from '../config';
import { IResponseGetCities, IResponseGetCountry, IResponseGetDistricts, IResponseGetProvince, IResponseGetSubDistricts } from './ilocation-service';

export interface ILocationServiceData {
	GetCountry(query: string): AxiosPromise<IResponseGetCountry>;
	GetProvince(query: string, id: string): AxiosPromise<IResponseGetProvince>;
	GetCities(query: string, id: string): AxiosPromise<IResponseGetCities>;
    GetDistricts(query: string, id: string): AxiosPromise<IResponseGetDistricts>;
    GetSubDistricts(query: string, id: string): AxiosPromise<IResponseGetSubDistricts>;
}

export class LocationServiceData implements ILocationServiceData {
	GetCountry(query: string): AxiosPromise<IResponseGetCountry> {
		return TeleService.get<IResponseGetCountry>(`/data/countries?keyword=${query}`);
	}

    GetProvince(query: string, id: string): AxiosPromise<IResponseGetProvince> {
		return TeleService.get<IResponseGetProvince>(`/data/provinces?keyword=${query}&country=${id}`);
	}

    GetCities(query: string, id: string): AxiosPromise<IResponseGetCities> {
		return TeleService.get<IResponseGetCities>(`/data/cities?keyword=${query}&province=${id}`);
	}

    GetDistricts(query: string, id: string): AxiosPromise<IResponseGetDistricts> {
		return TeleService.get<IResponseGetDistricts>(`/data/districts?keyword=${query}&city=${id}`);
	}

    GetSubDistricts(query: string, id: string): AxiosPromise<IResponseGetSubDistricts> {
		return TeleService.get<IResponseGetSubDistricts>(`/data/sub-districts?keyword=${query}&district=${id}`);
	}
}