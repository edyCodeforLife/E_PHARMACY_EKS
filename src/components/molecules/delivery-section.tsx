import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { currencyFormat } from "../../libs/function";

const DeliveryContainer = styled(Flex)`
	padding: 5px 15px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	border-bottom: 2px solid #F2F2F5;
`;

const PromoTag = styled.div`
	background: rgba(87, 235, 161, 0.5);
	border-radius: 8px;
	color: #2C528B;
	font-size: 12px;
	padding: 10px;
	font-weight: bold;
`;

const CustomFlexSpaceBetween = styled(FlexRowSpaceBetween)`
	width: 100%;
	margin: 8px 0px;
`;

export interface IDeliverySectionProps {
	is_free: boolean;
	flat_price: number;
}

function _DeliverySection(props: IDeliverySectionProps) {
	const { is_free, flat_price } = props;
	return (
		<DeliveryContainer>
			<CustomFlexSpaceBetween>
				<LabelText
					fsize={14}
					color={"#3A3A3C"}
				>
					AlteaCare Delivery
				</LabelText>
				{is_free ? (
					<PromoTag>
						Bebas Ongkir Rp 0
					</PromoTag>
				) : (
					<PromoTag>
						{currencyFormat?.(flat_price)}
					</PromoTag>
				)}

			</CustomFlexSpaceBetween>

			<LabelText
				color={"#8F90A6"}
				fsize={12}
				fweight={500}
			>
				Pengiriman akan dilakukan oleh AlteaCare Delivery
			</LabelText>

		</DeliveryContainer>
	);
}

export const DeliverySection = memo(_DeliverySection);
