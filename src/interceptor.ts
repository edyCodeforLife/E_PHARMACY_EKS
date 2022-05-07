import { TeleService } from './libs/services/config';
import { COOKIES_NAME } from './libs/variables';
import { getToken, removeToken } from './libs/hooks/auth-token';
import Router from 'next/router'

export class AppSingletonClass {
	private static instance: AppSingletonClass;
	private appInitialize: boolean = false;
	private masterDataInitialize: boolean = false;

	private constructor() { }

	get isInitialize() {
		return this.appInitialize;
	}

	get isMasterDataInitialize() {
		return this.masterDataInitialize;
	}

	static getInstance(): AppSingletonClass {
		if (!AppSingletonClass.instance) {
			AppSingletonClass.instance = new AppSingletonClass();
		}
		return AppSingletonClass.instance;
	}

	setInitialize() {
		this.appInitialize = true;
	}

	setMasterDataInitialize() {
		this.masterDataInitialize = true;
	}
}

const appSingletonInstance = AppSingletonClass.getInstance();

// axios interceptors
let quiting = false;



if (!appSingletonInstance.isInitialize) {
	TeleService.interceptors.request.use(
		function (config) {
			const token = getToken({});

			if (token) {
				config.headers = { Authorization: `Bearer ${token}` }

			}
			return config;
		},
		function (error) {
			console.log('interceptor error cuy');
			return Promise.reject(error);
		}
	);

	TeleService.interceptors.response.use(
		function (response) {
			return response
		},
		error => {
			// Do something with response error
			if (error.response.status === 401) {
				// let errObj = JSON.parse(JSON.stringify(error));
				// if ((errObj as any).response.status === 401) {
				// handle this
				console.log('Quiting application as token is expired');
				removeToken({})

				if (!quiting) {
					quiting = true;
					// window.location.href = window.location.pathname;
					if (history) {
						setTimeout(() => {
							(() => {
								Router.push('/blankpage', undefined, {
									shallow: true
								})
							})();
						}, 250);

						//prevents browser from storing history with each change:
						quiting = false;
						console.log('exit');
					}
				}
			}
			return Promise.reject(error);
		}
	);
	appSingletonInstance.setInitialize();
}