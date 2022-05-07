import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { PaymentMethodContent } from '../../../components/pages-components/payment-method/payment-method';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as LS from 'local-storage';
import SimpleCryptoJS from 'simple-crypto-js';
import { IPaymentService, PaymentService } from '../../../libs/business/index';
import { SECRET_KEY3, alteaWebViewURL } from '../../../libs/variables';

const PaymentMethodPage: NextPage = () => {
	const router = useRouter();
	const { orderCode } = router.query;
	const _orderCode = orderCode as string;
	const _PaymentService: IPaymentService = new PaymentService();
	const [paymentMethod, setPaymentMethod] = useState([]);

	const onBack = () => {
		router.push('/order', undefined, {
			shallow: true
		});
	}

	const getPaymentMethod = () => {
		if (_orderCode !== undefined) {
			_PaymentService.GetPaymentMethod("FARMASI", _orderCode, {
				Success: (res: any) => {
					setPaymentMethod(res?.data)
				}
			})
		}
	}

	const handleClickBox = (code: string, provider: string) => {
		const req = {
			service_id: _orderCode,
			type_of_service: "FARMASI",
			payment_method_code: code
		}
		_PaymentService.PostPayment(req, {
			Success: (res: any) => {
				if (res?.data.type === "MIDTRANS_SNAP" && typeof window === "object") {
					(window as any).snap.pay(res.data?.token, {
						onSuccess: function (result: any) {
							router.push('/payment-completed?isSuccessPayment=true', undefined, {
								shallow: true
							});
						},
						onPending: function (result: any) {
							router.push('/order', undefined, {
								shallow: true
							});
						},
						onError: function (result: any) {
							router.push('/payment-completed?isSuccessPayment=false', undefined, {
								shallow: true
							})
						},
						onClose: function () {
							console.log('close')
						},
						language: "id",
					})
				} else {
					if (res?.data.type === "ALTEA_PAYMENT_WEBVIEW" && typeof window === "object") {
						const _data = res.data;
						_data["service_id"] = orderCode;
						const simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY3);
						const encryptedText = simpleCrypto.encryptObject(_data);
						LS.set(alteaWebViewURL, encryptedText);

						setTimeout(() => {
							router.push('/altea-payment', undefined, {
								shallow: true
							})
						}, 150);
					} else {
						return;
					}
				}
			},
			NotFound: (res: any) => {
				console.log(res)
			},
			ValidationError: (res: any) => {
				console.log(res)
			},
			ServerError: (res: any) => {
				console.log(res)
			},
		})
	}


	useEffect(() => {
		getPaymentMethod();
		if (typeof window === "object") {
			const script: any = document.createElement('script');
			script.src = process.env.NEXT_PUBLIC_BASE_URL_MIDTRANS;
			script.setAttribute('data-client-key', process.env.NEXT_PUBLIC_CLIENT_KEY);
			script.async = true;
			script.type = "text/javascript";

			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			}
		}
	}, [_orderCode]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<PaymentMethodContent
						onBack={onBack}
						paymentMethod={paymentMethod}
						handleClickBox={handleClickBox}
					/>
				</div>
			</div>
		</div>

	)
}

export default PaymentMethodPage;
