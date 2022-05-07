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
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexOneCustom, FlexRowCenter } from '../../atoms/flex';
import { LabelText } from '../../atoms/typography';
import { map } from 'lodash';
import { BoxPaymentMethod } from '../../organism/box-payment-method';

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
	margin-top: 60px;
	height: calc(100vh - 120px);
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
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

const ContainerListPaymentMethod = styled(Flex)`
	box-sizing: border-box;
	justify-content: flex-start;
	padding: 10px;
	width: 100%;
`;

function _PaymentMethodContent(props: any) {
	const { onBack, handleClickBox, paymentMethod } = props;

	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
										<CustomHeader>
											<FlexOneCustom
												cursor={"pointer"}
												flex={"10% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"90% 0 0"}>
												<HeaderText>
													Metode Pembayaran
												</HeaderText>
											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside>
										{map(paymentMethod, (item, idx) => (
											<ContainerListPaymentMethod key={idx}>
												<LabelText
													color={"#3A3A3C"}
													fsize={14}
													margin={"8px"}
													talign={"left"}
												>
													{item?.type}
												</LabelText>
												{map(item?.payment_methods, (data, index) => (
													<BoxPaymentMethod
														key={index}
														id={`box_payment_${index}`}
														item={data}
														isNormalBox
														handleClickBox={handleClickBox}
													/>
												))}
											</ContainerListPaymentMethod>
										))}
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

export const PaymentMethodContent = memo(_PaymentMethodContent);