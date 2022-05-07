import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CheckoutService, ICheckoutService, IOrderService, OrderService } from '../../../libs/business/index';
import { CheckoutContent } from '../../../components/pages-components/checkout/index';
import { map, clone, replace } from 'lodash';
import useRedirectTo from '../../../libs/hooks/use-redirectTo';
import { useGlobalState } from '../../../libs/states';
import { USER_ACTIONS } from '../../../libs/reducers/user-reducer';

const CheckoutPage: NextPage = () => {
	const router = useRouter();
	const { cartId } = router.query;
	const _cartId = cartId as string;
	const [_state, dispatch] = useGlobalState();
	const [isDisabled, setIsDisabled] = useState(true);
	const [notesValue, setNotesValue] = useState(_state.user.notes_checkout);
	const _CheckoutService: ICheckoutService = new CheckoutService();
	const _OrderService: IOrderService = new OrderService();
	const [chekoutData, setCheckoutData] = useState<any>({});
	const [paymentMethod, paymentMethodAs] = useRedirectTo(`/payment-method/[orderCode]`);

	const onBack = () => {
		router.push('/cart', undefined, {
			shallow: true
		})
	}

	const gotoShippingAddress = () => {
		router.push(`/address/${_cartId}`, undefined, {
			shallow: true
		})
	}

	const redirectToTermsCondition = () => {
		router.push('/termsandcondition', undefined, {
			shallow: true
		})
	}

	const gotoShippingInfo = () => {
		router.push(`/shipping-info/${_cartId}`, undefined, {
			shallow: true
		})
	}

	const getDataCheckout = () => {
		if (_cartId === undefined) return;
		_CheckoutService.GetCheckout(_cartId, {
			Success: (res: any) => {
				setCheckoutData(res?.data);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		})
	}

	const changeNotes = (value: string) => {
		setNotesValue(value);

		dispatch({
			type: USER_ACTIONS.CHANGE_NOTES,
			data: { notes_checkout: value }
		});
	}

	const onClickNext = () => {
		const productCheckout = map(clone(chekoutData?.product), (item, idx) => {
			const newData = {
				id: item?.id,
				price: item?.price,
				original_price: item?.original_price,
				qty: item?.qty
			};
			return newData;
		});

		const req = {
			cart_id: Number(cartId),
			courier_id: chekoutData?.courier?.id,
			address_delivery_id: chekoutData?.delivery_address?.id,
			total_product_payment: chekoutData?.total_product_payment,
			total_delivery_fee: chekoutData?.total_delivery_fee,
			service_fee: chekoutData?.service_fee,
			total_payment: chekoutData?.total_payment,
			notes_delivery: notesValue === "" ? null : notesValue,
			product: productCheckout
		}

		_OrderService.PostOrder(req, {
			Success: (res: any) => {
				setTimeout(() => {
					router.replace(
						`${paymentMethod}`,
						`${replace(paymentMethodAs, '[orderCode]', res.data?.order_ref_code)}`,
					);
				}, 50);

			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		})
	};

	const stateShippInfo = () => {
		const address = chekoutData?.delivery_address;
		if (address !== undefined) {
			const addressFormatted = address.id !== null ? `${address?.street}, ${address?.rt_rw}, ${address?.sub_district.name}, ${address?.district.name}, ${address?.city.name}, ${address?.province.name}, ${address?.sub_district.postal_code}, ${address?.country.name}` : '';

			dispatch({
				type: USER_ACTIONS.CHANGE_CHECKOUT,
				data: {
					receiver_name: address.receiver_name !== null ? address.receiver_name : '',
					receiver_phone: address.receiver_phone !== null ? address.receiver_phone : '',
					address: addressFormatted,
					is_free: chekoutData.courier.is_free,
					flat_price: chekoutData.courier.flat_price
				}
			});
		}
	}

	useEffect(() => {
		getDataCheckout();
	}, [_cartId])

	useEffect(() => {
		chekoutData && stateShippInfo();
	}, [chekoutData]);

	useEffect(() => {
		if (
			chekoutData?.delivery_address &&
			chekoutData?.delivery_address?.receiver_name &&
			chekoutData?.delivery_address?.receiver_phone &&
			chekoutData.product.length > 0
		) {
			setIsDisabled(false)
		}
	}, [chekoutData])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<CheckoutContent
						value={notesValue}
						onBack={onBack}
						isDisabled={isDisabled}
						changeNotes={changeNotes}
						chekoutData={chekoutData}
						gotoShippingAddress={gotoShippingAddress}
						onClickNext={onClickNext}
						redirectToTermsCondition={redirectToTermsCondition}
						gotoShippingInfo={gotoShippingInfo}
					/>
				</div>
			</div>
		</div>

	)
}

export default CheckoutPage
