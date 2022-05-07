export interface IRequestCart {
    product_id: string;
    qty: number;
    original_price: number;
    price: number
}

export interface IResponseAddToCart {
    message: string;
}

export interface IResponseGetUserCart {
	message: string;
	data: IGetUserCartData[];
}

export interface IGetUserCartData {
    cart_id: number;
    user_id: string;
    delivery_address: IDeliveryAddress;
    courier: ICourier;
    product: IProduct;
}

export interface IDeliveryAddress {
    id: any;
    receiver_name: string;
    receiver_phone: number;
    address: string;
    country: string;
    province: string;
    city: string;
    district: string;
    sub_district: string;
    RT_RW: string;
}

export interface ICourier {
    id: any;
}

export interface IProduct {
    id: string;
    name: string;
    package: string;
    price: number;
    original_price: number;
    image: IImage[];
}

export interface IImage {
    _id: string;
    name: string;
    alternativeText: string;
    caption: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    width: number;
    height: number;
    url: string;
    formats: IImageFormats;
    provider: string;
    related: any;
    createdAt: string;
    updatedAt: string;
    __v: number;
    created_by: string;
    updated_by: string;
    id: string;
}

export interface IImageFormats {
    thumbnail?: IImageProperty;
    large?: IImageProperty;
    medium?: IImageProperty;
    small?: IImageProperty;
}

export interface IImageProperty {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    width: number;
    height: number;
    size: number;
    path: any;
    url: string;
}

export interface IResponseGetCartCount {
    message: string;
    data: number;
}

export interface IResponseDeleteProductCart {
    message: string;
}

export interface IResponseUpdateQtyProduct {
    message: string;
}

export interface IRequestUpdateQty {
    qty: number;
}

