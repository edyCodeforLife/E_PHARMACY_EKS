import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ShippingInfoPageContent } from '../../../components/pages-components/shipping-info';
import { useGlobalState } from '../../../libs/states';

const ShippingInfoPage: NextPage = () => {
	const router = useRouter();
	const { cartId } = router.query;
	const _cartId = cartId as string;
	const [_state, dispatch] = useGlobalState();
	const [shippingData] = useState<any>(_state.user);

	const onBack = () => {
		// router.push(`/checkout/${_cartId}`, undefined, {
		// 	shallow: true
		// })
		router.back();
	}

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<ShippingInfoPageContent
						onBack={onBack}
						shippingData={shippingData}
					/>
				</div>
			</div>
		</div>

	)
}

export default ShippingInfoPage
