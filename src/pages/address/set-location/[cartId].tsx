import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { LocationAddressPageContent } from '../../../components/pages-components/address-location';
import { useGlobalState } from '../../../libs/states';
import { USER_ACTIONS } from '../../../libs/reducers/user-reducer';


const LocationAddress: NextPage = () => {

	const router = useRouter();
	const { cartId } = router.query;
	const { addressId } = router.query;
	const _cartId = cartId as string;
	const _addressId = addressId as string;
	const [_state, dispatch] = useGlobalState();
	const [addressData, setaddressData] = useState({});
    const [latLong, setLatLong] = useState({lat: 0, lng: 0})
	const [address_formatted, setAddress_formatted] = useState('');

	const onBack = () => {
		const route = !_addressId ? `/address/insert/${_cartId}` : `/address/insert/${_cartId}?addressId=${_addressId}`
		router.push(route, undefined, {
			shallow: true
		});
	};

    const onGetLatLng = useCallback((latLng: any) => {
        setLatLong(latLng);
    },[]);

	const onGetAddress = useCallback((formatted_address: string) => {
		setAddress_formatted(formatted_address);
	}, []);

	const onSaveAddress = () => {
		dispatch({
			type: USER_ACTIONS.CHANGE_LOCATION,
			data: {
				latLong: {
					lat: latLong.lat.toString(),
					lng: latLong.lng.toString()
				},
				address: address_formatted
			}
		});

		onBack();
	}

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<LocationAddressPageContent
						_addressId={_addressId}
						addressData={addressData}
						onBack={onBack}
                        getLatLng={onGetLatLng}
                        latLong={latLong}
						getAddress={onGetAddress}
						address_formatted={address_formatted}
						onSaveAddress={onSaveAddress}
					/>
				</div>
			</div>
		</div>

	)
}

export default LocationAddress