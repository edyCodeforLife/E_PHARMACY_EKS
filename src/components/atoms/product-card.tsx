import styled from '@emotion/styled';
import { Fragment, memo } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { IProductList } from '../../libs/services/CMS/ICMS-service';
import { LogoImage } from './image';
import { LabelText } from './typography';
import { FlexOneCustom, FlexRow } from './flex';
import Grid from '@mui/material/Grid';

export interface IProductCardProps {
	minheight: string;
	item: IProductList;
	gotoDetail(item: string): void;
	imageHeight: number;
	imageWidth: string;
}

export interface ICardProductProps {
	minheight: string;
}

const ContainerGrid = styled(Grid)`
	// padding: 5px 5px !important;
	margin-top: 10px;
	&.MuiGrid-root:nth-of-type(odd) {
		padding: 5px 7px 0px 15px !important;
	}
	&.MuiGrid-root:nth-of-type(even) {
		padding: 5px 15px 0px 7px !important;
	}
`;

const BoxProduct = styled(Box)`
	max-width: 128px;
	margin: 10px;
`;

const CardProduct = styled(Card) <ICardProductProps>`
	min-height: ${props => props.minheight};
	cursor: pointer;
	height: 100%;
`;

const CardContentProduct = styled(CardContent)`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 10px;
`;

const CustomStrike = styled.s`
	color: #8F90A6;
	font-size: 12px;
	margin-top: 10px;
	margin-right: 5px;
`;

function _ProductCard(props: IProductCardProps) {
	const { minheight, item, imageHeight, imageWidth, gotoDetail } = props;

	return (
		<ContainerGrid item xs={6}>
			<CardProduct onClick={() => gotoDetail(item?.id)} variant="outlined" minheight={minheight}>
				<CardContentProduct>
					<LabelText
						color={"#3868B0"}
						fsize={12}
						margin={"0px 0px 5px 0px"}
					>
						{item?.package}
					</LabelText>
					<FlexOneCustom style={{ alignSelf: 'center' }} flex={"100% 0 0"}>
						<LogoImage
							src={item.images?.[0].formats?.small}
							height={imageHeight}
							width={imageWidth}
						/>
					</FlexOneCustom>

					<LabelText
						fsize={12}
						fweight={500}
						color={"#3A3A3C"}
						margin={"10px 0px 0px 0px"}
						talign={"left"}
					>
						{item?.name}
					</LabelText>

					<LabelText
						fsize={12}
						fweight={500}
						color={"#61C7B5"}
						margin={"10px 0px 0px 0px"}
						talign={"left"}
					>
						{`Harga Per ${item?.package}`}
					</LabelText>

					<FlexRow>
						{item.price?.raw === 0 || item.price?.raw === item.original_price?.raw ? (
							<LabelText
								fsize={12}
								fweight={600}
								color={"#3A3A3C"}
								margin={"10px 5px 0px 0px"}
							>
								{item.original_price?.formatted}
							</LabelText>
						) : (
							<CustomStrike>
								{item.original_price?.formatted}
							</CustomStrike>
						)}

						{(item.price?.raw !== 0 && item.price?.raw !== item.original_price?.raw) && (
							<LabelText
								fsize={12}
								fweight={500}
								color={"#FF5C5C"}
								margin={"10px 0px 0px 0px"}
							>
								{item.price?.formatted}
							</LabelText>
						)}

					</FlexRow>
				</CardContentProduct>
			</CardProduct>
		</ContainerGrid>
	);
}

export const ProductCard = memo(_ProductCard);