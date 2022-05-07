
import { memo } from 'react';
import styled from '@emotion/styled';
import { LogoImage } from '../atoms/image';
import Flex, { FlexRow, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { currencyFormat } from "../../libs/function";

export interface IBoxAppointment {
	id: string;
	item: any;
	isNormalBox: boolean;
	handleClickBox(code: string, provider: string, orderId: number): void;
}

export interface IContainerBoxProps {
	normal?: boolean;
}

export interface IContainerInside {
	tAlign?: string;
}

export interface IContainerStatusOrder {
	bg_color: string;
	text_color: string;
}


export const ContainerBox = styled.div<IContainerBoxProps>`
	padding: ${(props) => props.normal ? '0px 5px' : '9px 0px'} ;
	margin: 0px 3px;
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding: ${(props) => props.normal ? '2px 2px;' : '8px 0px'} ;
		margin: 0px 2px;
	}
`;

export const SmallBoxContainer = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	min-height: 0px;
	height: auto;
	min-width: 10px;
	width: auto;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 50px;
		min-width: 50px;
	}
`;

export const CustomFlexRow = styled(FlexRow)`
	justify-content: space-between;
	width: 100%;
	padding: 2px 14px;
`;

const CustomBox = styled(SmallBoxCustom)`
	min-height: 0px;
	height: auto;
		@media (max-width: 768px) {
		min-width: 50px;
	}
`;

export const ContainerInsideItem = styled.div<IContainerInside>`
	text-align: ${(props) => props.tAlign}
`;

export const ContainerOrderInfo = styled(FlexRow)`
	align-items: center;
	width: 100%;
	justify-content: flex-start;
	padding: 4px 14px;
`;

export const ContainerStatusOrder = styled.div < IContainerStatusOrder>`
	padding: 0px 5px;
	width: auto;
	height: 19px;
	background: ${(props) => props.bg_color};
	border-radius: 4px;
	display: flex;
	justify-content: center;
	color: ${(props) => props.text_color};
	font-size: 12px;
	line-height: 1.6;
	text-align: center;
`;

const ContainerOrderPrice = styled(FlexRowSpaceBetween)`
	background: #FAFAFC;
	width: 100%;
	padding: 4px 14px;
`;

const HorizontalLine = styled.div`
	height: 1px;
    background: #F2F2F5;
    width: 100%;
    content: ' ';
    display: block;
	margin: 5px 0px;
`;

const ContainerDataProduct = styled(Flex)`
	width: 80%;
	margin: 0px 15px;
`;

function _OrderCard(props: IBoxAppointment) {
	const {
		id,
		item,
		isNormalBox,
		handleClickBox
	} = props;

	return (
		<div onClick={() => handleClickBox(item?.ref_code, item?.status?.orderStatus, item?.order_id)}>
			<ContainerBox normal={isNormalBox} id={id}>
				<CustomBox>
					<CustomFlexRow>
						<ContainerInsideItem>
							<LabelText
								color={"#8F90A6"}
								fsize={12}
							>
								Order ID: {item.ref_code}
							</LabelText>
						</ContainerInsideItem>

						<ContainerInsideItem>
							<ContainerStatusOrder
								bg_color={item.status?.bgColor}
								text_color={item.status?.textColor}
							>
								{item.status?.label}
							</ContainerStatusOrder>
						</ContainerInsideItem>
					</CustomFlexRow>

					<HorizontalLine />

					<ContainerOrderInfo>
						<LogoImage
							src={item.product_id?.images?.[0]?.formats.small}
							width={"60px"}
							height={60}
						/>
						<ContainerDataProduct>
							<FlexRow>
								<LabelText
									talign={"left"}
									fsize={12}
									color={"#3A3A3C"}
								>
									{item.product_id?.name}
								</LabelText>
							</FlexRow>

							<FlexRow>
								<LabelText
									color={"#8F90A6"}
									fsize={10}
									fweight={500}
								>
									{item?.total_product} Produk
								</LabelText>
							</FlexRow>

							<FlexRow>
								<LabelText
									color={"#8F90A6"}
									fsize={10}
									fweight={500}
								>
									{currencyFormat(item?.total_price)}
								</LabelText>
							</FlexRow>
						</ContainerDataProduct>
						<ArrowForwardIosIcon
							sx={{ color: '#3E8CB9', fontSize: 14 }}
						/>
					</ContainerOrderInfo>
					<ContainerOrderPrice>
						<LabelText
							color={"#3E8CB9"}
							fsize={12}
							fweight={500}
						>
							Total Pesanan
						</LabelText>

						<LabelText
							color={"#3A3A3C"}
							fsize={12}
							fweight={600}
						>
							{currencyFormat(item?.total_price)}
						</LabelText>
					</ContainerOrderPrice>
				</CustomBox>
			</ContainerBox>
		</div>
	)
}

export const OrderCard = memo(_OrderCard);

