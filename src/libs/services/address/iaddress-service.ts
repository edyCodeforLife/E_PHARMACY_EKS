export interface IRequestAddress {
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
    receiverPhone: number;
}

export interface IResponseAddAdress {
    status: boolean;
    message: string;
    data: IAddressData;
}

export interface IAddressData {
    id: string;
    type: string;
    street: string;
    rt_rw: string;
    country: ICountry;
    province: IProvince;
    city: ICity;
    district: IDistrict;
    sub_district: ISubDistrict;
    latitude: string | number;
    longitude: string | number;
    receiver_name: string;
    receiver_phone: string;
}

export interface ICountry {
    id: string;
    code: string;
    name: string;
}

export interface IProvince {
    id: string;
    code: string | number;
    name: string;
}

export interface ICity {
    id: string;
    name: string;
}

export interface IDistrict {
    id: string;
    name: string;
}

export interface ISubDistrict {
    id: string;
    name: string;
    geo_area: number;
    postal_code: number;
}


export interface IResponseGetAddress {
	status: boolean;
    message: string;
    data: IGetAddressData[];
}

export interface IGetAddressData {
    meta: IMeta;
    address: IAddressData[];
}

export interface IMeta {
    page: number;
    limit: number;
    total_page: number;
    total_data: number;
}

export interface IResponseGetAddressById {
	status: boolean;
    message: string;
    data: IAddressData;
}

export interface IResponseEditAddress {
    status: boolean;
    message: string;
    data: null;
}


