import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import styled from '@emotion/styled';
import { Flex, FlexRowCenter } from '../../components/atoms/flex';
import FormControl from '@mui/material/CardContent';
import * as LS from 'local-storage';
import styles from '../../styles/_styles-web.module.scss';
import { alteaWebViewURL, SECRET_KEY3 } from '../../libs/variables';
import { getToken } from '../../libs/hooks/auth-token';
import SimpleCryptoJS from 'simple-crypto-js';
import { useRouter } from 'next/router';
import { IPaymentService, PaymentService } from '../../libs/business/index';
import PositionedSnackbar from '../../components/atoms/snack-bar';
import { SnackbarOrigin } from '@mui/material/Snackbar';
import { FlexOneCustom } from '../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexRowCustomize, HeaderText } from '../../components/pages-components/checkout/index';
import {
	CustomHeader
} from '../../components/atoms/custom-element';

export interface ICustomFormControlProps {
	minwidth: string;
	talign: string;
}

export interface State extends SnackbarOrigin {
	open: boolean;
	message: string;
	severity: "success" | "error" | "warning" | "info";
}

export interface IBtnSubmitProps {
	minwidth: string;
}

const ContainerFrame = styled(Flex)`
	position: relative;
	width: 100vw;
	height: 100vh;
`;

const ContainerHeader = styled(FlexRowCustomize)`
	margin-bottom: 61px;
`;

const CustomIframe = styled.iframe`
	width: inherit;
	height: inherit;
`;

const CustomContainerBtn = styled(FlexRowCenter)`
	position: relative;
	width: 100%;
	box-sizing: border-box;
`;

export const CustomFormControl = styled(FormControl) <ICustomFormControlProps>`
	min-width: ${(props) => props.minwidth};
	margin-top: 20px;
	text-align: ${(props) => props.talign};
	padding: 0px 0px 15px 0px !important;
`;

export const ContainerBtn = styled.div`
	width: 100%;
	height: auto;
`;

export const BtnSubmit = styled.button<IBtnSubmitProps>`
	background: #61C7B5;
	cursor: pointer;
	border-radius: 8px;
	padding: 15px;
	color: #fff;
	border: none;
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	}
`;

const AlteaPayment: NextPage = () => {
	const router = useRouter();
	const [selectedPaymentObj, setSelectedPayment] = useState<any>(null);
	const [webviewURL, setWebviewURL] = useState<string>("");
	const _PaymentService: IPaymentService = new PaymentService();
	const [snackbar, setSnackBar] = useState<State>({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		message: '',
		severity: "success"
	});
	const { vertical, horizontal, open, message, severity } = snackbar;

	const handleClose = () => {
		setSnackBar({ ...snackbar, open: false });
	};

	const onBack = () => {
		router.push('/order', undefined, {
			shallow: true
		})
	}

	const onCheckPaymentStatus = () => {
		_PaymentService.GetPaymentDetail(selectedPaymentObj?.service_id, {
			Success: (res: any) => {
				if (res.data?.status === "PAID") {
					setSnackBar({
						open: true,
						vertical: 'top',
						horizontal: 'right',
						message: "Pembayaran Berhasil",
						severity: "success"
					});
					setTimeout(() => {
						router.push('/payment-completed?isSuccessPayment=true', undefined, {
							shallow: true
						})
					}, 500);
				} else {
					if (res.data?.status === "CANCELED_BY_SYSTEM" || res.data?.status === "CANCELED_BY_ADMIN" || res.data?.status === "PAYMENT_EXPIRED") {
						setSnackBar({
							open: true,
							vertical: 'top',
							horizontal: 'right',
							message: "Pembayaran gagal dilakukan.",
							severity: "info"
						});
						setTimeout(() => {
							router.push('/payment-completed?isSuccessPayment=false', undefined, {
								shallow: true
							})
						}, 500);
					} else {
						setSnackBar({
							open: true,
							vertical: 'top',
							horizontal: 'right',
							message: "Mohon lakukan pembayaran terlebih dahulu.",
							severity: "info"
						});
						setTimeout(() => {
							router.push('/order', undefined, {
								shallow: true
							})
						}, 500);
					}
				}
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

	useEffect(() => {
		let decryptedText;
		const paymentObjEncrypted: any = LS.get(alteaWebViewURL);
		let simpleCrypto: any = new SimpleCryptoJS(SECRET_KEY3);
		if (paymentObjEncrypted) {
			decryptedText = simpleCrypto?.decryptObject(paymentObjEncrypted);
		}
		setSelectedPayment(decryptedText)
	}, []);


	useEffect(() => {
		if (selectedPaymentObj) {
			const urlWebView = selectedPaymentObj.payment_url.replace("{{REPLACE_THIS_TO_BEARER_USER}}", getToken({}));
			setWebviewURL(urlWebView);
		}
	}, [selectedPaymentObj]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<ContainerFrame>
					<ContainerHeader alignItems={"flex-start"}>
						<CustomHeader style={{ zIndex: 999, background: 'white' }}>
							<FlexOneCustom
								cursor={"pointer"}
								flex={"25% 0 0"}
								onClick={() => onBack()}
							>
								<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
							</FlexOneCustom>
							<FlexOneCustom flex={"50% 0 0"}>
								<HeaderText>
									Virtual Account
								</HeaderText>
							</FlexOneCustom>
						</CustomHeader>
					</ContainerHeader>
					<CustomIframe allow="clipboard-write" src={webviewURL} />
					<CustomContainerBtn>
						<CustomFormControl minwidth="90%" talign="center">
							<ContainerBtn>
								<BtnSubmit
									onClick={onCheckPaymentStatus}
									minwidth="100%"
								>
									Cek Status Pembayaran
							</BtnSubmit>
							</ContainerBtn>
						</CustomFormControl>
					</CustomContainerBtn>
					<PositionedSnackbar
						vertical={vertical}
						horizontal={horizontal}
						open={open}
						message={message}
						handleClose={handleClose}
						severity={severity}
					/>
				</ContainerFrame>
			</div>
		</div>
	);
}

export default AlteaPayment;