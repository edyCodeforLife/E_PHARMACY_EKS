import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { OrderDetailPageContent } from '../../../components/pages-components/order-detail';
import { CMSService, ICMSService, IOrderService, OrderService } from '../../../libs/business';
import { IOrderData } from '../../../libs/services/order/IOrder-service';
import { useGlobalState } from '../../../libs/states';
import { USER_ACTIONS } from '../../../libs/reducers/user-reducer';


const OrderDetailPage: NextPage = () => {
	const router = useRouter();
	const { orderId } = router.query;
	const _orderId = orderId as string;
	const _CMSService: ICMSService = new CMSService();
	const _OrderService: IOrderService = new OrderService();
	const [_state, dispatch] = useGlobalState();
	const [customerService, setCustomerService] = useState<any>([]);
	const [orderData, setOrderData] = useState<any>();
	const [addressFormatted, setAddressFormatted] = useState<any>([]);
	const address = orderData?.delivery_address;
	
	const getAddress = () => {
		let addressData:any = [];
		const arrAddress = [address?.street, address?.rt_rw, address?.sub_district?.name, address?.district?.name, address?.city?.name, address?.province?.name, address?.sub_district?.postal_code, address?.country?.name];
		arrAddress.map((value:any, index:any) => {
			if (value) {
				addressData.push(value)
			}
		})

		setAddressFormatted(addressData)
	}

	const onBack = () => {
		router.push('/order', undefined, {
			shallow: true
		})
	}

	const redirectHome = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const redirectToReview = () => {
		router.push(`/review/${_orderId}`, undefined, {
			shallow: true
		})
	}

	const gotoShippingAddress = () => {
		router.push(`/shipping-info/${_orderId}`, undefined, {
			shallow: true
		})
	}

	const onOrderClick = (status: string) => {
		if (status === 'COMPLETED') {
			redirectHome();
		} else if (status === 'ARRIVED') {
			postOrderCompleted();
		}
	}

	const getContactPharmacy = () => {
		_CMSService.GetContactPharmacy("PUSAT_INFORMASI", {
			Success: (res: any) => {
				setCustomerService(res.data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const getOrderDetail = () => {
		if (_orderId === undefined) return;
		_OrderService.GetOrderById(_orderId, {
			Success: (res: any) => {
				setOrderData(res?.data);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const postOrderCompleted = () => {
		if (_orderId === undefined) return;
		_OrderService.PostOrderCompleted(_orderId, {
			Success: (res: any) => {
				redirectToReview();
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	const gotoWA = (e: any) => {
		customerService?.[0]?.content.phone
		if (!customerService?.[0]?.content.whatsapp) return;
		if (process.browser) {
			window.location.href = customerService?.[0]?.content.whatsapp
		}
	}

	const stateShippInfo = () => {
		if (address !== undefined) {
			dispatch({
				type: USER_ACTIONS.CHANGE_CHECKOUT,
				data: {
					receiver_name: address.receiver_name,
					receiver_phone: address.receiver_phone,
					address: addressFormatted.length > 0 ? addressFormatted.join(', ') : '',
					is_free: orderData.courier.is_free,
					flat_price: orderData.courier.flat_price
				}
			});
		}
	}

	useEffect(() => {
		getContactPharmacy();
	}, []);

	useEffect(() => {
		address && getAddress();
	}, [address])

	useEffect(() => {
		getOrderDetail();
	}, [_orderId])

	useEffect(() => {
		addressFormatted && stateShippInfo();
	}, [addressFormatted])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<OrderDetailPageContent
						addressFormatted={addressFormatted}
						onBack={onBack}
						orderData={orderData}
						customerService={customerService}
						gotoWA={gotoWA}
						gotoShippingAddress={gotoShippingAddress}
						onOrderClick={onOrderClick}
						goToReview={redirectToReview}
					/>
				</div>
			</div>
		</div>

	)
}

export default OrderDetailPage
