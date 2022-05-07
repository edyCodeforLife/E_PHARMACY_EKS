import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
} from '../../atoms/custom-element';
import { HeaderText } from '../homepage/index';
import { CustomText } from '../../atoms/typography';
import { Flex, FlexRow, FlexRowCenter, FlexOne, FlexOneCustom, FlexRowSpaceBetween } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RoomIcon from '@mui/icons-material/Room';
import { InfoLabel } from '../../atoms/info';
import { CustomFlexRow } from '../detail-product';
import { currencyFormat } from '../../../libs/function';

export interface IShippingPageContentProps {
    onBack(): void;
    shippingData: any;
}

type IpropsCustomFlex = {
    loading?: number
}
type IPropsCustomContainer = {
    margin?: string;
}

const ContainerInside = styled(FlexOne)`
    margin-top: 60px;
    height: 100vh;
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    background-color: #F2F2F5;
    overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh);
    };
`;

export const CustomGeneralCard = styled(GeneralCard)`
    max-height: 92vh;
    @media (max-width: 768px) {
        max-height: 100vh;
    };
`
export const TextNotFound = styled(FlexRowCenter)`
	color: #61C7B5;
	text-align: center;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;

export const CustomFlexRowCenter = styled(FlexRowCenter) <IpropsCustomFlex>`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
    padding-top: 10px;
`;

export const HeaderRegister = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 40px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 10px;
`;

export const CustomContainer = styled(Flex)<IPropsCustomContainer>`
    background-color: #FFFFFF;
    width: 100%;
    padding: 12px; 18px;
    margin: ${(props) => props.margin};
`

const PromoTag = styled.div`
	background: rgba(87, 235, 161, 0.5);
	border-radius: 8px;
	color: #2C528B;
	font-size: 12px;
	padding: 10px;
	font-weight: bold;
`;

export const Divide = {
    borderRight: '1.5px solid black',
}

function _shippingInfoPageContent(props: IShippingPageContentProps) {
    const { onBack, shippingData } = props;

    const receiver_name = shippingData.checkout_data.receiver_name;
    const receiver_phone = shippingData.checkout_data.receiver_phone;
    const address = shippingData.checkout_data.address;

    return (
        <Fragment>
            <CustomContainerGeneral>
                <InsideContainer>
                    <CustomFlex>
                        <ContentContainer id='hahaha'>
                            <CustomGeneralCard variant="outlined">
                                <ContainerCardContent>
                                    <CustomFlexRow>
                                        <CustomHeader>
                                            <FlexOneCustom
                                                cursor={"pointer"}
                                                flex={"10% 0 0"}
                                                onClick={() => onBack()}
                                            >
                                                <ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
                                            </FlexOneCustom>
                                            <FlexOneCustom flex={"80% 0 0"}>
                                                <HeaderText>
                                                    Informasi Pengiriman
                                            </HeaderText>
                                            </FlexOneCustom>
                                        </CustomHeader>
                                            
                                        <ContainerInside>
                                            <CustomContainer>
                                                <FlexRowSpaceBetween>
                                                    <FlexRow>
                                                        <LocalShippingIcon
                                                            sx={{ color: '#3E8CB9' }}
                                                        />
                                                        <CustomText fsize={14} fweight={600} color="#6B7588" margin='0 0 0 8px'>AlteaCare Delivery</CustomText>
                                                    </FlexRow>
                                                    {shippingData.checkout_data.is_free === undefined || shippingData.checkout_data.is_free === true ? (
                                                        <PromoTag>
                                                            Bebas Ongkir Rp 0
                                                        </PromoTag>
                                                    ) : (
                                                        <PromoTag>
                                                            {currencyFormat?.(shippingData.checkout_data.flat_price)}
                                                        </PromoTag>
                                                    )}
                                                </FlexRowSpaceBetween>
                                                <CustomText fsize={12} fweight={400} color="#6B7588" talign='left' margin='16px 0 0 0'>Promo Ongkir melalui AlteaCare Delivery</CustomText>
                                                <CustomText fsize={12} fweight={400} color="#6B7588" talign='left' margin='0 0 0 0'>untuk semua tujuan alamat pengiriman Anda</CustomText>
                                            </CustomContainer>

                                            <CustomContainer margin='8px 0 1px 0'>
                                                <FlexRow>
                                                    <RoomIcon
                                                        sx={{ color: '#3E8CB9' }}
                                                    />
                                                    <CustomText fsize={14} fweight={600} color="#6B7588" margin='0 0 0 8px'>Alamat Pengiriman</CustomText>
                                                </FlexRow>
                                            </CustomContainer>

                                            <CustomContainer margin='0 0 1px 0'>
                                                <FlexRow>
                                                    <CustomText style={Divide} fsize={12} fweight={500} talign="left" margin="0 5px 8px 0" padding='0 5px 0 0'>{receiver_name && receiver_name}</CustomText>
                                                    <CustomText fsize={12} fweight={500} talign="left" margin="0 0 8px 0">{receiver_phone && receiver_phone}</CustomText>
                                                </FlexRow>
                                                <CustomText fsize={12} fweight={500} talign="left">{address && address}</CustomText>
                                            </CustomContainer>

                                            <CustomContainer margin='0 0 8px 0'>
                                                <FlexRowSpaceBetween>
                                                    <CustomText fsize={12} fweight={400} color="#8F90A6">Catatan : { shippingData.notes_checkout }</CustomText>
                                                    <CustomText fsize={12} fweight={400}></CustomText>
                                                </FlexRowSpaceBetween>
                                            </CustomContainer>

                                            <InfoLabel
                                                background={"#D6EDF6"}
                                                color={"#2C528B"}
                                                fontSize={12}
                                                fontWeight={500}
                                                padding={"32px 20px"}
                                            >
                                                <FlexRow>
                                                    <Image src='/static/icons/headhphone-icon.svg' width={35} height={35} alt="headhphone icon" />
                                                    <CustomText fsize={12} fweight={400} talign='left' margin='0 0 0 10px'>Anda akan dihubungi oleh tim AlteaCare untuk konfirmasi pemesanan dan pengiriman obat.</CustomText>
                                                </FlexRow>
                                            </InfoLabel>

                                        </ContainerInside>

                                    </CustomFlexRow>
                                </ContainerCardContent>
                            </CustomGeneralCard>
                        </ContentContainer>
                    </CustomFlex>
                </InsideContainer>
            </CustomContainerGeneral>
        </Fragment>
    )
}

export const ShippingInfoPageContent = memo(_shippingInfoPageContent);
