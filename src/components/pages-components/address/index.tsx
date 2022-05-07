import { memo, Fragment } from 'react';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
} from '../../atoms/custom-element';
import { ContainerSpinner, HeaderText } from '../homepage/index';
import { CustomText, LabelText } from '../../atoms/typography';
import { Flex, FlexRowCenter, FlexOne, FlexOneCustom } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { CustomFlexRow } from '../detail-product';
import { AddressCard } from '../../atoms/address-card';
import { BasicBtn } from '../../atoms/button';
import { IAddressData } from '../../../libs/services/address/iaddress-service';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../../atoms/spinner';
import { SwipeDrawerMaterial } from '../../atoms/swipe-drawer';
import { DrawerDelete } from '../../atoms/drawer-delete';
import { DrawerMaxOrder } from '../../atoms/drawer-max-order';

export interface IAddressContentProps {
    addressData: IAddressData[];
	hasMore: boolean;
    drawer: boolean;
    toggleDrawer(isOpen: boolean): any;
    onHandleDelete(): void;
	onBack(): void;
    gotoInsertAddress(): void;
    updateAddress(): void;
    primaryAddress: string;
    setPrimaryAddress(e:any, id: string): void;
    onClickDelete(event: any, id: string): void;
    onChangeClick(event: any, id: string): void;
    errorMessage: any;
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
    height: calc(100vh - 140px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh - 60px);
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

const CustomBtn = {
    fontSize: 12,
    fontWeight: 700,
    padding: '13px 0',
    margin: '10px 15px',
    height: '40px',
    color: '#61C7B5',
    border: '1px solid #61C7B5',
    borderRadius: 8,
}

const AddressNotFound = styled.div`
    margin: 70% 0 20px 0;
    text-align: center;
`

function _AddressPageContent(props: IAddressContentProps) {
    const { addressData, hasMore, drawer, toggleDrawer, onHandleDelete, updateAddress, onBack, gotoInsertAddress, primaryAddress, setPrimaryAddress, onClickDelete, errorMessage, onChangeClick } = props;
    
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

                                        <ContainerInside id="scrollableDiv">
                                            <ContainerListContent width='100%'>
                                                {addressData?.length > 0 ? (
                                                    <InfiniteScroll
                                                        style={{ width: '100%' }}
                                                        dataLength={addressData?.length}
                                                        hasMore={hasMore || true}
                                                        scrollableTarget="scrollableDiv"
                                                        loader={hasMore ?
                                                            <ContainerSpinner>
                                                                <Spinner />
                                                            </ContainerSpinner>
                                                            : null
                                                        }
                                                        next={() => { updateAddress(); }}
                                                    >         
                                                        <ContainerListContent padding='10px 15px' width='100%'>
                                                            {addressData.map((item: IAddressData, idx: number) => (
                                                                <AddressCard key={idx} item={item} primaryAddress={primaryAddress} setPrimary={setPrimaryAddress} onClickDelete={onClickDelete} onChangeClick={onChangeClick}/>
                                                            ))}
                                                        </ContainerListContent>

                                                    </InfiniteScroll>
                                                ) : (
                                                    <AddressNotFound>
                                                        <Image src="/static/icons/map-marker-icon.svg" alt="Map marker icon" width={25} height={25} />
                                                        <CustomText fsize={14} talign='center' fweight={400} color="#8F90A6" margin='10px 0'>Daftar alamat masih kosong, tambah alamat baru untuk pengiriman Anda</CustomText>
                                                    </AddressNotFound>
                                                )}
                                                <BasicBtn style={CustomBtn} onClick={() => gotoInsertAddress()}>
                                                    + Tambah Alamat Baru
                                                </BasicBtn>
                                            </ContainerListContent>
                                        </ContainerInside>

                                        <SwipeDrawerMaterial
                                            openDrawer={drawer}
                                            toggleDrawer={toggleDrawer}
                                            anchor={"bottom"}
                                            bgcolor={"#fff"}
                                            bordertopleft={20}
                                            bordertopright={20}
                                            padding={"10px"}
                                            drawerheight={"180px"}
									    >
                                            {errorMessage?.length > 0 ? (
                                                <Fragment>
                                                    <CustomText fsize={14} fweight={600} talign='center' padding='16px 0'>Oops</CustomText>
                                                    <DrawerMaxOrder onHandleClose={toggleDrawer(false)} text={errorMessage}></DrawerMaxOrder>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <CustomText fsize={14} fweight={600} talign='center' padding='16px 0'>Hapus Alamat</CustomText>
                                                    <DrawerDelete onHandleClose={toggleDrawer(false)} onHandleDelete={() => { onHandleDelete() }}></DrawerDelete>
                                                </Fragment>
                                            )}
                                        </SwipeDrawerMaterial>

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

export const AddressPageContent = memo(_AddressPageContent);
