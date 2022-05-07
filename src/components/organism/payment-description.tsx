import { Fragment, memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRow, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { currencyFormat } from '../../libs/function';

const PaymentDescriptionContainer = styled(Flex)`
	padding: 10px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	flex-direction: column;
	box-sizing: border-box;
	border-bottom: 2px solid #F2F2F5;
`;

export interface IPaymentDescription {
	subTotalPrice: number;
	shippingFee: number;
}

function _PaymentDescription(props: IPaymentDescription) {
	const { subTotalPrice, shippingFee } = props;

	return (
		<FlexRow style={{ width: '100%' }}>
			<PaymentDescriptionContainer>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"0px 5px"}

					>
						Subtotal Produk
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"0px 5px"}

					>
						{currencyFormat?.(subTotalPrice)}
					</LabelText>
				</FlexRowSpaceBetween>

				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"5px"}

					>
						Biaya Kirim
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"5px"}

					>
						{currencyFormat?.(shippingFee)}
					</LabelText>
				</FlexRowSpaceBetween>
				<FlexRowSpaceBetween>
					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"0px 5px"}

					>
						Biaya Layanan
					</LabelText>

					<LabelText
						color={"#8F90A6"}
						fsize={14}
						fweight={500}
						margin={"0px 5px"}

					>
						Rp 0
					</LabelText>
				</FlexRowSpaceBetween>
			</PaymentDescriptionContainer>
		</FlexRow>

	);
}

export const PaymentDescription = memo(_PaymentDescription);
