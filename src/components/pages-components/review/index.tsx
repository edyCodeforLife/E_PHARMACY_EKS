import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
    CustomFooter
} from '../../atoms/custom-element';
import { HeaderText } from '../homepage/index';
import { CustomText } from '../../atoms/typography';
import { Flex, FlexRow, FlexRowCenter, FlexOne, FlexOneCustom, FlexRowSpaceBetween } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { BasicBtn } from '../../atoms/button';
import { CustomFlexRow } from '../detail-product';
import BasicRating from '../../atoms/rating';
import { TextField } from '@mui/material';
import { CustomContainer } from '../shipping-info';
import { ReviewRatedPage } from '../../molecules/review-rated-page';
import { IOrderData } from '../../../libs/services/order/IOrder-service';
import OrderBadgeSection from '../../atoms/order-badge-section';

export interface IReviewPageContentProps {
    onBack(): void;
    orderData: IOrderData;
    star: number;
    setStar(value: number): void;
    review: string;
    onChange(e: any): void;
    onPostReview(): void;
    reviewSuccess: boolean;
    goToOrderList(): void;
}

type IpropsCustomFlex = {
    loading?: number
}

type IPropsContainerListContent = {
    padding?: string;
    margin?: string;
}

type IPropsContainerReview = {
    margin: string;
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
        height: calc(100vh - 100px);
    };
`;

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

export const ReviewBtnStyle = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: 'white',
    borderRadius: 20,
    width: '100%'
}

export const ContainerReview = styled.div<IPropsContainerReview>`
    margin: ${(props) => props.margin}
`

const InfoTag = styled.div`
	background: #06C270;
	border-radius: 5px;
	color: white;
	font-size: 12px;
	padding: 5px;
	font-weight: 500;
`;

function _reviewPageContent(props: IReviewPageContentProps) {
    const { onBack, orderData, star, setStar, review, onChange, onPostReview, reviewSuccess, goToOrderList } = props;

    return (
        <Fragment>
            <CustomContainerGeneral>
                <InsideContainer>
                    <CustomFlex>
                        <ContentContainer>
                            <GeneralCard variant="outlined">
                                {!reviewSuccess ? (
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
                                                        Ulasan
                                                    </HeaderText>
                                                </FlexOneCustom>
                                            </CustomHeader>

                                            <ContainerInside>
                                                <CustomContainer margin='8px 0 1px 0'>
                                                    <OrderBadgeSection ref_code={orderData?.ref_code} status={orderData?.status}/>
                                                </CustomContainer>
                                                <ContainerReview margin='8% 40px 20px 40px'>
                                                    <Flex>
                                                        <CustomText fsize={16} fweight={700} color="#3868B0" margin='0 0 24px 0' talign='center'>Terima Kasih!</CustomText>
                                                        <CustomText fsize={12} fweight={400} talign="center" color="#8F90A6" padding='0 5px 30px 5px'>Ulasan Anda sangat bermanfaat untuk peningkatkan layanan AlteaCare</CustomText>
                                                        <Image src="/static/images/review.svg" alt="Review Icon" width={110} height={110} />
                                                        <BasicRating value={star} setStar={setStar}></BasicRating>
                                                        <TextField label="Ulasan Saya" value={review} onChange={(e) => onChange(e)} variant="standard" color='primary' size='small' hiddenLabel/>
                                                    </Flex>
                                                </ContainerReview>

                                            </ContainerInside>

                                            <CustomFooter>
                                                <BasicBtn style={ReviewBtnStyle} disabled={star === 0 || review == '' ? true : false} bColor={star === 0 || review == '' ? '#C7C9D9' : '#61C7B5'} onClick={() => onPostReview()}>
                                                    Kirim Ulasan
                                                </BasicBtn>
                                            </CustomFooter>
                                        </CustomFlexRow>
                                    </ContainerCardContent>
                                ): (
                                    <ReviewRatedPage goToOrderList={goToOrderList}/>
                                )}
                            </GeneralCard>
                        </ContentContainer>
                    </CustomFlex>
                </InsideContainer>
            </CustomContainerGeneral>
        </Fragment>
    )
}

export const ReviewPageContent = memo(_reviewPageContent);
