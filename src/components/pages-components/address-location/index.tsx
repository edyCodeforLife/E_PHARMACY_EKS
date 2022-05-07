import { memo, Fragment } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
    CustomFooter,
} from '../../atoms/custom-element';
import { HeaderText } from '../homepage/index';
import { CustomText } from '../../atoms/typography';
import { Flex, FlexRowCenter, FlexOne, FlexOneCustom } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomFlexRow } from '../detail-product';
import { AddressCard } from '../../atoms/address-card';
import { BasicBtn } from '../../atoms/button';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { MapContent } from '../../organism/map';
import { SearchInput } from '../../atoms/search';
import { InfoLabel } from '../../atoms/info';

export interface IAddressContentProps {
    _addressId: any;
    addressData: any;
	onBack(): void;
    getLatLng(latLng: any): void;
    getAddress(formatted_address: string): void;
    latLong: any;
    address_formatted: string;
    onSaveAddress(): void;
}

type IpropsCustomFlex = {
    loading?: number
}

type IDivProps = {
    padding?: string;
}

const ContainerInside = styled(FlexOne)`
    // margin-top: 60px;
    height: calc(100vh - 180px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    // overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh - 60px);
    };
`;

const CustomHeaderMap = styled(CustomHeader)`
    background: #FFFFFF80;
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

const CustomBtn = {
    fontSize: 12,
    fontWeight: 700,
    paddingTop: 13,
    paddingBottom: 13,
    height: '40px',
    color: '#61C7B5',
    border: '1px solid #61C7B5',
    borderRadius: 8,
}

const CustomButton = {
    fontSize: 14,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    width: '100%',
    borderRadius: 20,
}

const InputCard = styled(CustomFooter)`
    min-height: 300px;
    border-radius: 20px 20px 0px 0px;
    justify-content: space-between;
    flex-direction: column;
    padding: 18px 0;
`
const Div = styled.div<IDivProps>`
    width: 100%;
    padding: ${(props) => props.padding};
`

function _LocationAddressPageContent(props: IAddressContentProps) {
    const { _addressId, addressData, onBack, getLatLng, latLong, getAddress, address_formatted, onSaveAddress } = props;

    return (
        <Fragment>
            <CustomContainerGeneral>
                <InsideContainer>
                    <CustomFlex>
                        <ContentContainer>
                            <GeneralCard variant="outlined">
                                <ContainerCardContent>
                                    <CustomFlexRow>
                                        <CustomHeaderMap>
                                            <FlexOneCustom
                                                cursor={"pointer"}
                                                flex={"10% 0 0"}
                                                onClick={() => onBack()}
                                            >
                                                <ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
                                            </FlexOneCustom>
                                            <FlexOneCustom flex={"80% 0 0"}>
                                                <HeaderText>
                                                    Pin Lokasi
                                            </HeaderText>
                                            </FlexOneCustom>
                                        </CustomHeaderMap>

                                        {/* <ContainerInside> */}
                                            <MapContent
                                                _addressId={_addressId}
                                                getLatLng={getLatLng}
                                                getAddress={getAddress}
                                                onSaveAddress={onSaveAddress}
                                            />
                                        {/* </ContainerInside> */}
                                        
                                        {/* <InputCard>
                                            <Div padding='0 18px 18px 18px'>
                                                <SearchInput
                                                    id="Search_Drug"
                                                    needIcon={true}
                                                    isActiveClick={false}
                                                    width={"100%"}
                                                    maxWidth='100%'
                                                    placeholder='Cari Alamat'
                                                />

                                                <CustomText fsize={14} fweight={600} talign='left' margin='18px 0'>Jl. Hidup Makmur Selalu, Gg Obat-Obatanno. 7/12</CustomText>
                                                <CustomText fsize={14} fweight={400} color="#8F90A6" talign='left' margin='0 0 1.5px 0'>{address_formatted}</CustomText>
                                                <CustomText fsize={14} fweight={400} color="#3868B0" talign='left'>{latLong.lat}, {latLong.lng}</CustomText>
                                            </Div>
                                            
                                            <Div>
                                                <InfoLabel
                                                id='dwadadawdawda'
                                                    background={"#D6EDF6"}
                                                    color={"#2C528B"}
                                                    fontSize={12}
                                                    fontWeight={500}
                                                    padding={"25px 20px"}
                                                >
                                                    <CustomText fsize={12} fweight={700} talign='center'>Mohon letakan pin dengan akurat</CustomText>
                                                    <CustomText fsize={12} fweight={400} talign='center'>Untuk pengiriman ke alamat yang tepat</CustomText>
                                                </InfoLabel>
                                                <Div padding='18px 18px 0 18px'>
                                                    <BasicBtn style={CustomButton} bColor={"#61C7B5"}>
                                                        Pilih Alamat
                                                    </BasicBtn>
                                                </Div>
                                            </Div>
                                        </InputCard> */}

                                    </CustomFlexRow>
                                </ContainerCardContent>
                            </GeneralCard>
                        </ContentContainer>
                    </CustomFlex>
                </InsideContainer>
            </CustomContainerGeneral>
        </Fragment>
    )
}

export const LocationAddressPageContent = memo(_LocationAddressPageContent);
