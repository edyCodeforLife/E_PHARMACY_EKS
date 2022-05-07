import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { AddressPageContent } from '../../../components/pages-components/address';
import { AddressService, CheckoutService, IAddressService, ICheckoutService } from '../../../libs/business';
import { useGlobalState } from '../../../libs/states';
import { USER_ACTIONS } from '../../../libs/reducers/user-reducer';

const Address: NextPage = () => {
	const router = useRouter();
	const { cartId } = router.query;
	const _cartId = cartId as string;
	const limit = 5;
	const isLoadAddress = useRef(false);
	const _AddressService: IAddressService = new AddressService();
	const _CheckoutService: ICheckoutService = new CheckoutService();
	const [_state, dispatch] = useGlobalState();
	const [addressData, setaddressData] = useState<any>([]);
	const [page, setPage] = useState(1);
	const [hasMore, setHasMore] = useState(true);
	const [primaryAddress, setPrimaryAddress] = useState('');
	const [drawer, setDrawer] = useState(false);
	const [addressId, setAddressId] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);


	const onBack = () => {
		router.push(`/checkout/${_cartId}`, undefined, {
			shallow: true
		})
	}

	const gotoInsertAddress = () => {
		router.push(`/address/insert/${_cartId}`, undefined, {
			shallow: true
		})
	}

	const onChangeClick = (e: any, id: string) => {
		e && e.stopPropagation();
		router.push(`/address/insert/${_cartId}?addressId=${id}`, undefined, {
			shallow: true
		})
	}

	const updateAddress = () => {
		isLoadAddress.current = true;
		setPage(page + 1);
	}

	const setPrimary = (e: any, id: string) => {
		const findAddress = addressData.find((value: any) => value.id === id);
		if (
			findAddress.receiver_name !== "" && 
			findAddress.receiver_name !== null && 
			findAddress.receiver_phone !== "" &&
			findAddress.receiver_phone !== null &&
			findAddress.latitude !== "" && 
			findAddress.latitude !== null && 
			findAddress.longitude !== "" && 
			findAddress.longitude !== null
		) {
			setPrimaryAddress(id);
			updateDataCheckout(id);
		} else {
			onChangeClick(false, id);
		}
	}

	const onClickDelete = (e: any, id: string) => {
		setErrorMessage(null);
		e.stopPropagation();
		setDrawer(true);
		setAddressId(id);
	}

	const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setDrawer(isOpen);
	};

	const getDataCheckout = () => {
		if (_cartId === undefined) return;
		_CheckoutService.GetCheckout(_cartId, {
			Success: (res: any) => {
				setPrimaryAddress(res?.data?.delivery_address?.id);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		})
	}

	const getAddressList = () => {
		_AddressService.GetAddress(page, limit, {
			Success: (res: any) => {
				setTimeout(() => {
					if (res.data.address.length > 0) {
						isLoadAddress.current ? setaddressData(addressData.concat(res.data.address)) : setaddressData(res.data.address)
					}
					setHasMore(false);
				}, 500);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				setHasMore(false);
			}
		})
	}

	const updateDataCheckout = (id: any) => {
		if (_cartId === undefined) return;
		_CheckoutService.UpdateCheckout(_cartId, { address_delivery_id: id }, {
			Success: (res: any) => {
				console.log(res)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		})
	}

	const onHandleDelete = () => {
		_AddressService.DeleteAddress(addressId, {
			Success: (res: any) => {
				isLoadAddress.current = false;
				if (addressId === primaryAddress) {
					updateDataCheckout(null);
				}
				setErrorMessage(null);
				setDrawer(false);
				getDataCheckout();
				getAddressList();
			},
			ValidationError: (data: any) => {
				setDrawer(false);
				setErrorMessage(data.message);
				setDrawer(true);
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		})
	}

	useEffect(() => {
		getAddressList();
		dispatch(
			{
				type: USER_ACTIONS.CHANGE_LOCATION,
				data: {}
			},
			{
				type: USER_ACTIONS.CHANGE_FORM_ADDRESS,
				data: {}
			}
		);
	}, [])

	useEffect(() => {
		_cartId && getDataCheckout();
	}, [_cartId])

	// useEffect(() => {
	// 	primaryAddress.length > 0 && updateDataCheckout(false);
	// }, [primaryAddress])

	useEffect(() => {
		isLoadAddress.current && getAddressList();
	}, [page, isLoadAddress]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<AddressPageContent
						addressData={addressData}
						hasMore={hasMore}
						drawer={drawer}
						toggleDrawer={toggleDrawer}
						onHandleDelete={onHandleDelete}
						updateAddress={updateAddress}
						onBack={onBack}
						gotoInsertAddress={gotoInsertAddress}
						primaryAddress={primaryAddress}
						setPrimaryAddress={setPrimary}
						onClickDelete={onClickDelete}
						errorMessage={errorMessage}
						onChangeClick={onChangeClick}
					/>
				</div>
			</div>
		</div>

	)
}

export default Address