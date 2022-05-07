import { memo } from 'react';
import styled from '@emotion/styled';
import { ImageLogo } from '../atoms/image';
import { Flex, FlexRow } from '../atoms/flex';
import { H3, CustomText } from '../atoms/typography';
import { currencyFormat } from "../../libs/function";

// type ISearchSectionProps = {
// 	isActiveClick: boolean;
// 	handleClick?(): void;
// };

const CardList = styled(FlexRow)`
    padding: 10px 0;
    height: 100px;
    align-items: center;
`;

const CardContentText = styled(Flex)`
    padding: 0 0 0 10px;
    height: 100%;
    justify-content: space-evenly;
`;

const TextDrug = styled(H3)`
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    width: 220.2px;
    white-space: pre-line;
    overflow: hidden;
	color: #3A3A3C;
`;

const ContainerListContent = styled(Flex)`
	padding: 5px 20px;
	width: 100%;
	background: #fff;
	margin: 1px 0px;
	border-bottom: 2px solid #F2F2F5;
`;

function _ProductSection(props: any) {
	const { item } = props;
	return (
		<ContainerListContent>
			<CardList>
				<ImageLogo
					src={item?.image?.[0].formats?.small}
					width={70}
					height={70}
					alt={item?.name?.name}
				/>
				<CardContentText>
					<TextDrug>
						{item.name}
					</TextDrug>
					<CustomText fsize={12} color={"#6B7588"} talign='left' margin='0'>
						{item?.qty} produk
                    </CustomText>
					<FlexRow>
						{item?.price === 0 || item.price === item.original_price ? (
							<CustomText
								fsize={12}
								fweight={600}
								color={"#3A3A3C"}
								margin='0 5px 0 0'
							>
								{currencyFormat?.(item?.original_price)}
							</CustomText>
						) : (
							<CustomText
								fsize={12}
								fweight={400}
								color={"#8F90A6"}
								margin='0 5px 0 0'
								tdecorline='line-through'
							>
								{currencyFormat?.(item?.original_price)}
							</CustomText>
						)}
						{item?.price !== 0 && item.price !== item.original_price && (
							<CustomText fsize={12} fweight={700} color={"#FF5C5C"}>
								{currencyFormat?.(item?.price)}
							</CustomText>
						)}
					</FlexRow>
				</CardContentText>
			</CardList>
		</ContainerListContent>
	);
}

export const ProductSection = memo(_ProductSection);
