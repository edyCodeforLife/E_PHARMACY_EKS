import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { InsertAddressPageContent } from '../../../components/pages-components/address-insert';
import { AddressService, IAddressService, ILocationService, LocationService } from '../../../libs/business';
import { debounce } from 'lodash';
import { useGlobalState } from '../../../libs/states';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { USER_ACTIONS } from '../../../libs/reducers/user-reducer';
import { GOOGLE_MAPS_API_KEY } from '../../../libs/variables';

export interface SnackbarState extends SnackbarOrigin {
	open: boolean;
	message: string;
	severity: "success" | "error" | "warning" | "info";
}

export interface IInitialStateValue {
	street: string;
	country: string;
	province: string;
	city: string;
	district: string;
	sub_district: string;
	rt_rw: string;
	lat: string | number;
	lng: string | number;
	receiverName: string;
	receiverPhone: string;
}

export interface ILocationName {
	country: any;
	province: any;
	city: any;
	district: any;
	sub_district: any;
}

const InsertAddress: NextPage = () => {
	const _initialStateValue: IInitialStateValue = {
		street: "",
		country: "",
		province: "",
		city: "",
		district: "",
		sub_district: "",
		rt_rw: "",
		lat: "",
		lng: "",
		receiverName: "",
		receiverPhone: ""
	}

	const _locationName: ILocationName = {
		country: null,
		province: null,
		city: null,
		district: null,
		sub_district: null
	}

	const _messageError: IInitialStateValue = {
		street: "",
		country: "",
		province: "",
		city: "",
		district: "",
		sub_district: "",
		rt_rw: "",
		lat: "",
		lng: "",
		receiverName: "",
		receiverPhone: ""
	}

	const userInteraction = useRef(false);
	const location = useRef(false);
	const router = useRouter();
	const { cartId } = router.query;
	const { addressId } = router.query;
	const _cartId = cartId as string;
	const _addressId = addressId as string;
	const [_state, dispatch] = useGlobalState();
	const _LocationService: ILocationService = new LocationService();
	const _AddressService: IAddressService = new AddressService();
	const [data, setData] = useState(_initialStateValue);
	const [locationData, setLocationData] = useState(_locationName);
	const [errorMessage, setErrorMessage] = useState(_messageError);
	const [country, setCountry] = useState<any>([]);
	const [province, setProvince] = useState([]);
	const [city, setCity] = useState([]);
	const [districts, setDistricts] = useState([]);
	const [subDistricts, setSubDistricts] = useState([]);
	const [snackbar, setSnackBar] = useState<SnackbarState>({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		message: '',
		severity: "success"
	});
	const { vertical, horizontal, open, message, severity } = snackbar;

	const isEmptyValue = data && (
		data.street !== "" &&
		data.street !== null &&
		data.country !== "" &&
		data.country !== null &&
		data.province !== "" &&
		data.province !== null &&
		data.city !== "" &&
		data.city !== null &&
		data.district !== "" &&
		data.district !== null &&
		data.sub_district !== "" &&
		data.sub_district !== null &&
		data.rt_rw !== "" &&
		data.rt_rw !== null &&
		data.lat !== "" &&
		data.lat !== null &&
		data.lng !== "" &&
		data.lng !== null &&
		data.receiverName !== "" &&
		data.receiverName !== null &&
		data.receiverPhone !== "" &&
		data.receiverPhone !== null &&
		data.receiverPhone.length >= 9 &&
		data.receiverPhone.match("^[0-9]+$")
	);

	const onBack = () => {
		router.push(`/address/${_cartId}`, undefined, {
			shallow: true
		})
	}

	const gotoSetLocation = () => {
		const route = !_addressId ? `/address/set-location/${_cartId}` : `/address/set-location/${_cartId}?addressId=${_addressId}`
		router.push(route, undefined, {
			shallow: true
		})

		dispatch({
			type: USER_ACTIONS.CHANGE_FORM_ADDRESS,
			data: {
				form: data,
				location: locationData
			}
		});
	}

	const handleClose = () => {
		setSnackBar({ ...snackbar, open: false });
	};

	const onChangeLocation = (field: string, value: any, id: any) => {
		let _obj: any = {};
		_obj[field] = value;
		setLocationData({ ...locationData, ..._obj })
	}

	const onChange = useCallback((fieldId: string, value: any, error?: any) => {
		userInteraction.current = true;
		let obj: any = {};
		obj[fieldId] = value;

		if (fieldId === 'receiverPhone') {
			obj[fieldId] = value.replace(/[^0-9]/g, '');
		}
		setData({ ...data, ...obj })
		setLocation(fieldId, '', value, true);
	}, [data]);

	const onInput = useCallback(debounce((field: string, e: any) => {
		const { value } = e.target;
		setLocation(field, value, '', false);
	}, 500), []);

	const setLocation = (field: string, keyword: string, value: any, isSelect: boolean) => {
		location.current = true;

		if (field === 'country') {
			getCountry('Indonesia');
			if (isSelect) {

				setProvince([]);
				setCity([]);
				setDistricts([]);
				setSubDistricts([]);
				value.length > 0 && getProvince('', value);
				setData(prevState => {
					return {
						...prevState,
						province: '',
						city: '',
						district: '',
						sub_district: '',
					}
				})

				setLocationData(prevState => {
					return {
						...prevState,
						province: null,
						city: null,
						district: null,
						sub_district: null
					}
				})
			}
		} else if (field === 'province') {
			getProvince(keyword, data.country);
			if (isSelect) {
				setCity([]);
				setDistricts([]);
				setSubDistricts([]);
				value.length > 0 && getCity('', value);
				setData(prevState => {
					return {
						...prevState,
						city: '',
						district: '',
						sub_district: '',
					}
				})
				setLocationData(prevState => {
					return {
						...prevState,
						city: null,
						district: null,
						sub_district: null,
					}
				})
			}
		} else if (field === 'city') {
			getCity(keyword, data.province);
			if (isSelect) {
				setDistricts([]);
				setSubDistricts([]);
				value.length > 0 && getDistricts('', value);
				setData(prevState => {
					return {
						...prevState,
						district: '',
						sub_district: '',
					}
				})
				setLocationData(prevState => {
					return {
						...prevState,
						district: null,
						sub_district: null,
					}
				})
			}
		} else if (field === 'district') {
			getDistricts(keyword, data.city);
			if (isSelect) {
				setSubDistricts([]);
				value.length > 0 && getSubDistricts('', value);
				setData(prevState => {
					return {
						...prevState,
						sub_district: '',
					}
				})
				setLocationData(prevState => {
					return {
						...prevState,
						sub_district: null,
					}
				})
			}
		} 
	}

	const onSaveAddress = () => {
		!_addressId ? addAddress(data) : updateAddress(_addressId, data);
	}

	const validationChangeInput = () => {
		const regexMinimum = "^[-+\/\s]*([0-9][-+\/\s]*){9,}$";
		const regexOnlyNumber = "^[0-9]+$";
		let messageError: any = {};

		if (data && data.receiverPhone !== "" && data.receiverPhone !== null) {
			if (!data.receiverPhone.match(regexMinimum)) {
				messageError["receiverPhone"] = "Minimum 9 angka";
			}

			if (!data.receiverPhone?.match(regexOnlyNumber)) {
				messageError["receiverPhone"] = "Nomor ponsel harus berupa angka";
			}

			if (data.receiverPhone?.match(regexMinimum) && data.receiverPhone?.match(regexOnlyNumber)) {
				messageError["receiverPhone"] = "";
			}
		}

		if (data.receiverPhone === null || data.receiverPhone === "") {
			messageError["receiverPhone"] = "Nomor telepon harus terisi";
		}

		if (data && data.receiverName === "" || data.receiverName === null) {
			messageError["receiverName"] = "Nama harus terisi";
		} else {
			messageError["receiverName"] = "";
		}

		if (data.lat === "" || data.lat === null || data.lng === "" || data.lng === null) {
			messageError["lat"] = "Lokasi alamat tujuan pengiriman anda harus terisi";
		} else {
			messageError["lat"] = "";
		}

		if (data && data.street === "" || data.street === null) {
			messageError["street"] = "Alamat harus terisi";
		} else {
			messageError["street"] = "";
		}


		if (data && data.country !== "") {
			if (data.province === "" || data.province === null) {
				messageError["province"] = "Provinsi harus terisi";
			} else {
				messageError["province"] = "";
			}

			if (data.city === "" || data.city === null) {
				messageError["city"] = "Kota harus terisi";
			} else {
				messageError["city"] = "";
			}

			if (data.district === "" || data.district === null) {
				messageError["district"] = "Kecamatan harus terisi";
			} else {
				messageError["district"] = "";
			}

			if (data.sub_district === "" || data.sub_district === null) {
				messageError["sub_district"] = "Kelurahan harus terisi";
			} else {
				messageError["sub_district"] = "";
			}

			if (data.rt_rw === "" || data.rt_rw === null) {
				messageError["rt_rw"] = "Rt/rw harus terisi";
			} else {
				messageError["rt_rw"] = "";
			}
		}

		setErrorMessage({ ...errorMessage, ...messageError });
	}

	const addAddress = (req: any) => {
		_AddressService.AddAddress(req, {
			Success: (res: any) => {
				onBack();
			},
			ValidationError: (data: any) => {
				setSnackBar({
					open: true,
					vertical: 'top',
					horizontal: 'right',
					message: data?.message,
					severity: "error"
				});
			},
		})
	}

	const updateAddress = (id: string, req: any) => {
		_AddressService.EditAddress(id, req, {
			Success: (res: any) => {
				onBack();
			},
			ValidationError: (data: any) => {
				setSnackBar({
					open: true,
					vertical: 'top',
					horizontal: 'right',
					message: data?.message,
					severity: "error"
				});
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const getAddressById = () => {
		_AddressService.GetAddressById(_addressId, {
			Success: (res: any) => {
				let dataUpdate: any = {};
				let location: any = {};

				getCountry('Indonesia');
				getProvince('', res.data.country.id);
				getCity('', res.data.province.id);
				getDistricts('', res.data.city.id);
				getSubDistricts('', res.data.district.id);

				dataUpdate['street'] = res.data?.street;
				dataUpdate['country'] = res.data?.country.id;
				dataUpdate['province'] = res.data?.province.id;
				dataUpdate['city'] = res.data?.city.id;
				dataUpdate['district'] = res.data?.district.id;
				dataUpdate['sub_district'] = res.data?.sub_district.id;
				dataUpdate['rt_rw'] = res.data?.rt_rw;
				dataUpdate['lat'] = !_state.user.location_user.latLong ? res.data?.latitude : _state.user.location_user.latLong.lat;
				dataUpdate['lng'] = !_state.user.location_user.latLong ? res.data?.longitude : _state.user.location_user.latLong.lng;
				dataUpdate['receiverName'] = res.data?.receiver_name;
				dataUpdate['receiverPhone'] = res.data?.receiver_phone;
				setData({ ...data, ...dataUpdate });
				userInteraction.current = true;

				location['country'] = {
					country_id: res.data?.country.id,
					code: res.data?.country.code,
					name: res.data?.country.name
				};
				location['province'] = {
					province_id: res.data?.province.id,
					code: res.data?.province.code,
					name: res.data?.province.name
				};
				location['city'] = {
					city_id: res.data?.city.id,
					name: res.data?.city.name
				};
				location['district'] = {
					city_id: res.data?.district.id,
					name: res.data?.district.name
				};
				location['sub_district'] = {
					city_id: res.data?.sub_district.id,
					name: res.data?.sub_district.name
				};
				setLocationData(location);

				if (!_state.user.location_user.latLong) {
					dispatch({
						type: USER_ACTIONS.CHANGE_LOCATION,
						data: {
							latLong: {
								lat: res.data.latitude !== "" && res.data.latitude !== null ? res.data.latitude.toString() : null,
								lng: res.data.longitude !== "" && res.data.longitude !== null ? res.data.longitude.toString() : null,
							}
						}
					});
				}
			}
		})
	}

	const getCountry = (query: 'Indonesia') => {
		_LocationService.GetCountry(query, {
			Success: (res: any) => {
				setCountry(res?.data)
			}
		})
	}

	const getProvince = (query: string, id: string) => {
		_LocationService.GetProvince(query, id, {
			Success: (res: any) => {
				setProvince(res?.data)
			}
		})
	}

	const getCity = (query: string, id: string) => {
		_LocationService.GetCities(query, id, {
			Success: (res: any) => {
				setCity(res?.data)
			}
		})
	}

	const getDistricts = (query: string, id: string) => {
		_LocationService.GetDistricts(query, id, {
			Success: (res: any) => {
				setDistricts(res?.data)
			}
		})
	}

	const getSubDistricts = (query: string, id: string) => {
		_LocationService.GetSubDistricts(query, id, {
			Success: (res: any) => {
				setSubDistricts(res?.data)
			}
		})
	}

	const setLocationUser = () => {
		setData(prevState => {
			return {
				...prevState,
				lat: !_state.user.location_user.latLong ? "" : _state.user.location_user?.latLong?.lat,
				lng: !_state.user.location_user.latLong ? "" : _state.user.location_user?.latLong?.lng
			}
		})
	}

	useEffect(() => {
		if (_addressId === undefined) {
			getCountry('Indonesia');
		}
	}, []);

	useEffect(() => {
		setLocationUser()
	}, [_state.user.location_user])

	useEffect(() => {
		userInteraction.current && validationChangeInput();
	}, [data])

	useEffect(() => {
		_addressId && getAddressById();
	}, [_addressId])

	useEffect(() => {
		if (Object.keys(_state.user.form_insert_address).length !== 0) {
			const formData = _state.user.form_insert_address.form;

			setData(prevState => {
				return {
					...prevState,
					street: formData.street,
					country: formData.country,
					province: formData.province,
					city: formData.city,
					district: formData.district,
					sub_district: formData.sub_district,
					rt_rw: formData.rt_rw,
					receiverName: formData.receiverName,
					receiverPhone: formData.receiverPhone

				}
			})

			setLocationData(_state.user.form_insert_address.location)
		}
	}, [_state.user.form_insert_address])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<InsertAddressPageContent
						data={data}
						GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
						locationData={locationData}
						errorMessage={errorMessage}
						onBack={onBack}
						gotoSetLocation={gotoSetLocation}
						countryData={country}
						provinceData={province}
						cityData={city}
						districtsData={districts}
						subDistrictsData={subDistricts}
						onInput={onInput}
						onChange={onChange}
						onChangeLocation={onChangeLocation}
						onSaveAddress={onSaveAddress}
						isEmptyValue={isEmptyValue}
						vertical={vertical}
						horizontal={horizontal}
						open={open}
						message={message}
						handleClose={handleClose}
						severity={severity}
					/>
				</div>
			</div>
		</div>
	)
}

export default InsertAddress