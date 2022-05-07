export interface IResponseGetCountry {
    status: boolean;
    message: string;
    data: ICountry[];
}

export interface ICountry {
    country_id: string;
    name: string;
    code: string;
}

export interface IResponseGetProvince {
    status: boolean;
    message: string;
    data: ICountry[];
}

export interface IProvince {
    province_id: string;
    code: string | number;
    name: string;
}

export interface IResponseGetCities {
    status: boolean;
    message: string;
    data: ICities[];
}

export interface ICities {
    city_id: string;
    name: string;
    country: ICountry2;
    province: IProvince2;
}

export interface ICountry2 {
    id: string;
    code: string;
    name: string;
}

export interface IProvince2 {
    id: string;
    code: string | number;
    name: string;
}

export interface IResponseGetDistricts {
    status: boolean;
    message: string;
    data: IDistricts[];
}

export interface IDistricts {
    district_id: string;
    name: string;
    city: ICity;
}

export interface ICity {
    city_id: string;
    name: string;
}

export interface IResponseGetSubDistricts {
    status: boolean;
    message: string;
    data: ISubDistricts[];
}

export interface ISubDistricts {
    sub_district_id: string;
    name: string;
    postal_code: number;
    geo_area: string | number;
    district: IDistricts;
    city: ICity;
    country: ICountry;
}