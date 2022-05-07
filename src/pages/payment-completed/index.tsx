import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { PaymentCompletedContent } from '../../components/pages-components/payment-completed/index';
import { useRouter } from 'next/router';

const PaymentCompleted: NextPage = () => {
	const router = useRouter();
	const { isSuccessPayment } = router.query;


	const redirectTo = (path: string) => {
		router.push(path, undefined, {
			shallow: true
		})
	}

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<PaymentCompletedContent
						isSuccessPayment={isSuccessPayment}
						redirectTo={redirectTo}
					/>
				</div>
			</div>
		</div>

	)
}

export default PaymentCompleted;
