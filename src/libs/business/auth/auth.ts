
import { IResponseSuccess, HandleError } from '../../services/error/error';
import { AuthServiceData, IAuthServiceData } from '../../services/auth/auth-service';

export interface IAuthService {
	GetProfile(handler: IResponseSuccess): void;
}

export class AuthService implements IAuthService {
	private _service: IAuthServiceData;

	constructor() {
		this._service = new AuthServiceData();
	}

	async GetProfile(handler: IResponseSuccess) {
		try {
			const response = await this._service.GetProfile();
			return await handler.Success?.(response.data);
		}
		catch (e: any) {
			return HandleError(e, handler);
		}
	}
}