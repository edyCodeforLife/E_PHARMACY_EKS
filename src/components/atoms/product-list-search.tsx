import styled from '@emotion/styled';
import { memo } from 'react';
import { IProductList } from '../../libs/services/CMS/ICMS-service';
import { LogoImage } from './image';
import { H3, CustomText } from '../atoms/typography';
import { Flex, FlexRowCenter, FlexRow, FlexOne, FlexOneCustom } from '../atoms/flex';

export interface IProductCardProps {
    minheight: string;
    item: any;
    gotoDetail(item: string): void;
    imageHeight: number;
    imageWidth: string;
}

const CardList = styled(FlexRow)`
    // padding: 10px 0;
    // height: 100px;
    align-items: center;
    border-bottom: 1px solid rgb(150, 150, 150, 0.2);
`

const CardContainer = styled(FlexRow)`
    cursor: pointer;
    padding: 10px 0;
    height: 100px;
`

const CardContentText = styled(Flex)`
    padding: 5px 0 5px 10px;
    // padding: 0 0 0 10px;
    height: 100%;
    justify-content: space-evenly;
`

const TextDrug = styled(H3)`
    font-weight: 400;
    font-size: 12px;
    text-align: left;
    width: 220.2px;
    // white-space: nowrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
`

function _ProductSearchList(props: IProductCardProps) {
    const { item, imageHeight, imageWidth, gotoDetail } = props;
    return (
        <CardList onClick={() => gotoDetail(item?.id)}>
            <CardContainer>
                <LogoImage
                    src={item.images[0]?.formats.small}
                    height={imageHeight}
                    width={imageWidth}
                />
                <CardContentText>
                    <TextDrug>
                        {item.name}
                    </TextDrug>
                    <CustomText fsize={10} color={"#61C7B5"} talign='left' margin='0'>
                        Harga Per {item.package}
                    </CustomText>
                    <FlexRow>
                        {item?.price?.raw === 0 || item?.price?.raw === item?.original_price?.raw ? (
                            <CustomText fsize={12} fweight={700} color={"#3A3A3C"}>
                                {item?.original_price.formatted}
                            </CustomText>
                        ) : (
                            <CustomText fsize={12} fweight={400} color={"#8F90A6"} margin='0 5px 0 0' tdecorline='line-through'>
                                {item?.original_price.formatted}
                            </CustomText>
                        )}
                        {(item?.price?.raw !== 0 && item?.price?.raw !== item?.original_price?.raw) && (
                            <CustomText fsize={12} fweight={700} color={"#FF5C5C"}>
                                {item?.price.formatted}
                            </CustomText>
                        )}
                    </FlexRow>
                </CardContentText>
            </CardContainer>
        </CardList>
    );
}

export const ProductSearchList = memo(_ProductSearchList);