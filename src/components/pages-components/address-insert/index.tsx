import { memo, Fragment } from 'react';
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
import { Flex, FlexRowCenter, FlexOne, FlexOneCustom } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomFlexRow } from '../detail-product';
import { BasicBtn } from '../../atoms/button';
import { InsertAddressForm } from '../../atoms/address-form';
import { ICountry } from '../../../libs/services/location/ilocation-service';
import PositionedSnackbar from '../../atoms/snack-bar';

export interface IAddressContentProps {
    data: any;
    GOOGLE_MAPS_API_KEY: string;
    locationData: any;
    errorMessage: any;
    countryData: ICountry[];
    provinceData: any;
    cityData: any;
    districtsData: any;
    subDistrictsData: any;
	onBack(): void;
    gotoSetLocation(): void;
    onInput(field: string, value: any): void;
    onChange(field: string, value: any, error?: any): void
    onChangeLocation(field: string,  value: any, id?: any): void;
    onSaveAddress(): void;
    isEmptyValue: any;
    vertical: any;
    horizontal: any;
    open: boolean;
    message: string;
    handleClose(): void;
    severity: any;
}

type IpropsCustomFlex = {
    loading?: number
}

type IPropsContainerListContent = {
    width?: string;
    padding?: string;
    margin?: string;
}

const ContainerInside = styled(FlexOne)`
    margin-top: 60px;
    height: calc(100vh - 180px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh - 120px);
    };
`;

const ContainerListContent = styled(Flex)<IPropsContainerListContent>`
    width: ${(props) => props.width};
	padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
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

const CustomButton = {
    fontSize: 14,
    fontWeight: 500,
    paddingTop: 10,
    paddingBottom: 10,
    color: 'white',
    width: 400,
    borderRadius: 20,
}

function _InsertAddressPageContent(props: IAddressContentProps) {
    const { 
        data, 
        GOOGLE_MAPS_API_KEY, 
        locationData, 
        errorMessage, 
        countryData, 
        provinceData, 
        cityData, 
        districtsData, 
        subDistrictsData, 
        onBack, 
        gotoSetLocation, 
        onInput, 
        onChange, 
        onChangeLocation, 
        onSaveAddress, 
        isEmptyValue, 
        vertical, 
        horizontal, 
        open, 
        message, 
        handleClose, 
        severity
    } = props;

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
                                                flex={"10% 0 0"}
                                                onClick={() => onBack()}
                                            >
                                                <ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
                                            </FlexOneCustom>
                                            <FlexOneCustom flex={"80% 0 0"}>
                                                <HeaderText>
                                                    Alamat Pengiriman
                                            </HeaderText>
                                            </FlexOneCustom>
                                        </CustomHeader>

                                        <ContainerInside>
                                            <ContainerListContent padding='10px 15px' width='100%'>
                                                
                                                <InsertAddressForm
                                                    data={data}
                                                    GOOGLE_MAPS_API_KEY={GOOGLE_MAPS_API_KEY}
                                                    locationData={locationData}
                                                    errorMessage={errorMessage}
                                                    countryData={countryData} 
                                                    provinceData={provinceData}
                                                    cityData={cityData}
                                                    districtsData={districtsData}
                                                    subDistrictsData={subDistrictsData}
                                                    gotoSetLocation={() => gotoSetLocation()}
                                                    onInput={onInput}
                                                    onChange={onChange}
                                                    onChangeLocation={onChangeLocation}
                                                />

                                            </ContainerListContent>
                                        </ContainerInside>

                                        <CustomFooter>
                                            <BasicBtn style={CustomButton} bColor={!isEmptyValue ? "#C7C9D9" : "#61C7B5"} disabled={!isEmptyValue} onClick={onSaveAddress}>
                                                Simpan Alamat
                                            </BasicBtn>
                                        </CustomFooter>

                                        <PositionedSnackbar
                                            vertical={vertical}
                                            horizontal={horizontal}
                                            open={open}
                                            message={message}
                                            handleClose={handleClose}
                                            severity={severity}
                                        />

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

export const InsertAddressPageContent = memo(_InsertAddressPageContent);
