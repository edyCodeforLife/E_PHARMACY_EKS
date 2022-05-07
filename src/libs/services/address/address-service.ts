import { AxiosPromise } from 'axios';
import { IRequestAddress, IResponseAddAdress, IResponseEditAddress, IResponseGetAddress, IResponseGetAddressById } from './iaddress-service';
import { TeleService } from '../config';

export interface IAddressServiceData {
	GetAddress(page: number, limit: number): AxiosPromise<IResponseGetAddress>;
	AddAddress(req: IRequestAddress): AxiosPromise<IResponseAddAdress>;
	GetAddressById(id: string): AxiosPromise<IResponseGetAddressById>;
    EditAddress(id: string, req: IRequestAddress): AxiosPromise<IResponseEditAddress>;
    DeleteAddress(id: string): AxiosPromise<IResponseEditAddress>;
}

export class AddressServiceDAta implements IAddressServiceData {
	GetAddress(page: number, limit: number): AxiosPromise<IResponseGetAddress> {
		return TeleService.get<IResponseGetAddress>(`/user/address?page=${page}&limit=${limit}`);
	}

    AddAddress(req: IRequestAddress): AxiosPromise<IResponseAddAdress> {
		return TeleService.post<IResponseAddAdress>('/user/address', req);
    }

    GetAddressById(id: string): AxiosPromise<IResponseGetAddressById> {
		return TeleService.get<IResponseGetAddressById>(`/user/address/${id}`);
    }

    EditAddress(id: string, req: IRequestAddress): AxiosPromise<IResponseEditAddress> {
		return TeleService.post<IResponseEditAddress>(`/user/address/${id}`, req);
    }

    DeleteAddress(id: string): AxiosPromise<IResponseEditAddress> {
		return TeleService.delete<IResponseEditAddress>(`/user/address/${id}`);
    }
}