import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image'
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
    CustomFooter
} from '../../../components/atoms/custom-element';
import { HeaderText } from '../homepage/index'
import { CustomText } from '../../../components/atoms/typography';
import { Flex, FlexOne, FlexOneCustom, CustomFlexRowCenter } from '../../atoms/flex';
import { BasicBtn } from '../../../components/atoms/button';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { SliderComponent } from '../../atoms/slider-product';
import { IProductList } from '../../../libs/services/CMS/ICMS-service';
import PositionedSnackbar from '../../atoms/snack-bar';

export interface IDetailProductPageContentProps {
    onBack(): void;
    productData: any;
    onAddtoCart(productId: string, qty: number, original_price: number, price: number): void;
    productExist: boolean;
    vertical: any;
    horizontal: any;
    open: boolean;
    message: string;
    handleClose(): void;
    severity: any;
}

const ContainerBanner = styled.div({
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    justifyContent: 'center',
    maxWidth: '100%',
    maxHeight: '100%',
})

export const ContainerDetail = styled.div`
	padding: 5px 5px;
    width: 100%;
    overflow: scroll;
    position: relative;
`

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 180px);
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-start;
	overflow: scroll;
	width: 100%;
	@media (max-width: 768px) {
		height: calc(100vh - 120px);
	};
`;

const ContainerContent = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 0 10px 0 10px;
`

const ContainerDescription = styled.div`
    margin: 10px 0 10px 0;
    text-align: left;
`

const DetailFlex = styled.div`
    display: flex;
`
const FlexRow = styled(DetailFlex)`
    flex-direction: row;
`
const FlexCol = styled(DetailFlex)`
    flex-direction: column;
`

export const FlexRowBetween = styled(FlexRow)`
    justify-content: space-between;
`

export const CustomFlexRow = styled(CustomFlexRowCenter)`
	height: 100%;
	align-items: flex-start;
`;

const CustomButton = {
    fontSize: 14,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    width: 400,
    borderRadius: 20,
}

const PromoTag = styled.div`
    font-size: 12px;
    font-weight: 700;
    position: absolute;
    top: 15px;
    right: 15px;
    padding: 5px 8px;
    background-color: #57EBA180;
    color: #2C528B;
    border-radius: 8px;
`

const ContainerText = styled(Flex)`
	flex-wrap: wrap;
    font-size: 14px; 
    margin: 10px 0;
`;

function _detailProductContent(props: IDetailProductPageContentProps) {
    const { onBack, productData, onAddtoCart, productExist, vertical, horizontal, open, message, handleClose, severity } = props;

    return (
        <Fragment>
            <CustomContainerGeneral>
                <InsideContainer>
                    <CustomFlex>
                        <ContentContainer>
                            <GeneralCard variant="outlined">
                                <ContainerCardContent>
                                    <CustomFlexRow>
                                        <CustomHeader>
                                            <FlexOneCustom
                                                cursor={"pointer"}
                                                flex={"25% 0 0"}
                                                onClick={() => onBack()}
                                            >
                                                <ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
                                            </FlexOneCustom>
                                            <FlexOneCustom flex={"50% 0 0"}>
                                                <HeaderText>
                                                    Detail Obat
                                                </HeaderText>
                                            </FlexOneCustom>
                                        </CustomHeader>

                                        <ContainerInside>
                                            <ContainerDetail>
                                                <ContainerBanner>
                                                    <SliderComponent
                                                        sliderHeight={300}
                                                        sliderWidth={"300"}
                                                        centerPadding={"0px"}
                                                        productImg={productData?.images}
                                                    />
                                                </ContainerBanner>
                                                {(productData?.price?.raw !== 0 && productData?.price?.raw !== productData?.original_price?.raw) && (
                                                    <PromoTag>
                                                        Promo
                                                    </PromoTag>
                                                )}
                                                <ContainerContent>
                                                    <CustomText fsize={18} fweight={500} padding='10px 0 20px 0' talign='left'>{productData?.name}</CustomText>
                                                    <FlexRowBetween>
                                                        <FlexCol>
                                                            <CustomText fsize={14} color={"#61C7B5"} talign='left' margin='0 0 8px 0'>
                                                                Harga Per {productData?.package}
                                                            </CustomText>
                                                            <FlexRowBetween>
                                                                {productData?.price?.raw === 0 || productData?.price?.raw === productData?.original_price?.raw ? (
                                                                    <CustomText fsize={12} fweight={700} color={"#3A3A3C"}>
                                                                        {productData?.original_price.formatted}
                                                                    </CustomText>
                                                                ) : (
                                                                    <CustomText fsize={12} fweight={400} color={"#8F90A6"} margin='0 5px 0 0' tdecorline='line-through'>
                                                                        {productData?.original_price.formatted}
                                                                    </CustomText>
                                                                )}
                                                                {(productData?.price?.raw !== 0 && productData?.price?.raw !== productData?.original_price?.raw) && (
                                                                    <CustomText fsize={12} fweight={700} color={"#FF5C5C"}>
                                                                        {productData?.price.formatted}
                                                                    </CustomText>
                                                                )}
                                                            </FlexRowBetween>
                                                        </FlexCol>
                                                        <FlexCol>
                                                            <CustomText fweight={400} color={"#8F90A6"} fsize={10} margin='0 0 8px 0'>
                                                                No. Registrasi BPOM:
                                                        </CustomText>
                                                            <CustomText fweight={400} color={"#8F90A6"} fsize={10} talign={"right"}>
                                                                {productData?.regis_no}
                                                            </CustomText>
                                                        </FlexCol>
                                                    </FlexRowBetween>
                                                    <ContainerDescription>
                                                        <CustomText fweight={700} fsize={14} margin={"20px 0 0 0"}>
                                                            Deskripsi Obat
                                                        </CustomText>

                                                        <ContainerText dangerouslySetInnerHTML={{ __html: productData?.desc }} />
                                                    </ContainerDescription>
                                                </ContainerContent>
                                            </ContainerDetail>

                                        </ContainerInside>

                                        <CustomFooter>
                                            <BasicBtn style={CustomButton} bColor={productExist ? "#C7C9D9" : "#61C7B5"} onClick={() => onAddtoCart(productData?.id, 1, productData?.original_price.raw, productData?.price.raw)}>
                                                Masukkan ke Keranjang
                                            </BasicBtn>
                                        </CustomFooter>
                                    </CustomFlexRow>

                                    <PositionedSnackbar
                                        vertical={vertical}
                                        horizontal={horizontal}
                                        open={open}
                                        message={message}
                                        handleClose={handleClose}
                                        severity={severity}
                                    />

                                </ContainerCardContent>
                            </GeneralCard>
                        </ContentContainer>
                    </CustomFlex>
                </InsideContainer>
            </CustomContainerGeneral>
        </Fragment>
    )
}

export const DetailProductContent = memo(_detailProductContent);