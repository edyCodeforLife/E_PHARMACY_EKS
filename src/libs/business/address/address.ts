import { IResponseSuccess, HandleError } from '../../services/error/error';
import { AddressServiceDAta, IAddressServiceData } from '../../services/address/address-service';
import { IRequestAddress } from '../../services/address/iaddress-service';

export interface IAddressService {
    GetAddress(page: number, limit: number, handler: IResponseSuccess): void;
	AddAddress(req: IRequestAddress, handler: IResponseSuccess): void;
	GetAddressById(id: string, handler: IResponseSuccess): void;
    EditAddress(id: string, req: IRequestAddress, handler: IResponseSuccess): void;
    DeleteAddress(id: string, handler: IResponseSuccess): void;
}

export class AddressService implements IAddressService {
	private _service: IAddressServiceData;

	constructor() {
		this._service = new AddressServiceDAta();
	}

    async GetAddress(page: number, limit: number, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetAddress(page, limit);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async AddAddress(req: IRequestAddress, handler: IResponseSuccess) {
		try {
			const response = await this._service.AddAddress(req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async GetAddressById(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.GetAddressById(id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}

	async EditAddress(id: string, req: IRequestAddress, handler: IResponseSuccess) {
		try {
			const response = await this._service.EditAddress(id, req);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
	
	async DeleteAddress(id: string, handler: IResponseSuccess) {
		try {
			const response = await this._service.DeleteAddress(id);
			return await handler.Success?.(response?.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}