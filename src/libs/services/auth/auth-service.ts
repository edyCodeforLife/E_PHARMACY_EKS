import { AxiosPromise } from 'axios';
import { IProfileResponse } from './iauth-service';
import { TeleService } from '../config';

export interface IAuthServiceData {
	GetProfile(): AxiosPromise<IProfileResponse>;
}

export class AuthServiceData implements IAuthServiceData {
	GetProfile(): AxiosPromise<IProfileResponse> {
		return TeleService.get<IProfileResponse>('/user/profile/me');
	}

}