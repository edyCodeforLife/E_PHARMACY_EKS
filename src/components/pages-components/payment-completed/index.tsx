import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexRow } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import { LogoImage } from '../../atoms/image';
import { LabelText } from '../../atoms/typography';
import { BasicBtn } from '../../atoms/button';

export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export interface IpropsSectionCheckout {
	jcontent: string;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

const ContainerInside = styled(Flex)`
	height: calc(100vh - 120px);
	box-sizing: border-box;
	align-items: center;
	justify-content: center;
	overflow: scroll;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;


export const ContainerFlexRow = styled(FlexRow)`
	padding: 15px;
	width: 100%;
	box-sizing: border-box;
`;

export const ContainerImg = styled.div`
	text-align: right;
`;

export const BtnRedirect = styled(BasicBtn)`
	border-radius: 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 12px 14px;
	color: #fff;
	font-size: 14px;
`;

function _PaymentCompletedContent(props: any) {
	const { isSuccessPayment, redirectTo } = props;

	const imgSrc = () => {
		if (isSuccessPayment !== undefined) {
			switch (isSuccessPayment) {
				case "true":
					return "/static/icons/transaksi_berhasil.svg";
				case "false":
					return "/static/icons/transaksi_gagal.svg";
				case undefined:
					return "/static/icons/transaksi_berhasil.svg";
				default:
					return "/static/icons/transaksi_berhasil.svg";
			}
		}
	}
	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<ContainerInside>
										<LabelText
											color={"#3868B0"}
											fsize={16}
											fweight={600}
											margin={"20px 0px"}
										>
											{isSuccessPayment === "true" ? "Terima Kasih!" : "Mohon Maaf"}
										</LabelText>
										<LogoImage
											src={imgSrc()}
											width={"100%"}
											height={100}
										/>

										<LabelText
											color={"#8F90A6"}
											fsize={14}
											margin={"20px 40px"}
											talign={"center"}
										>
											{
												isSuccessPayment === "true" ?
													<Fragment>
														Pembayaran berhasil dan pesanan sedang diproses. Lihat detail transaksi Anda dalam
														<LabelText
															color={"#8F90A6"}
															fsize={14}
															fweight={600}
														>
															Pesanan Saya
														</LabelText>
													</Fragment>
													:
													"Proses pembayaran yang dilakukan tidak berhasil, silahkan melakukan pembayaran kembali"
											}
										</LabelText>

										<BtnRedirect onClick={() => { redirectTo(isSuccessPayment === "true" ? "/order" : "/") }} bColor={"#61C7B5"}>
											{isSuccessPayment === "true" ?
												"Pesanan Saya"
												:
												"Kembali Ke Toko Obat "
											}
										</BtnRedirect>

									</ContainerInside>
								</ContainerCardContent>
							</GeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	)
}

export const PaymentCompletedContent = memo(_PaymentCompletedContent);