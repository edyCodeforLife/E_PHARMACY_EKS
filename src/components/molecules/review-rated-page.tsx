import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex } from '../atoms/flex';
import { CustomText } from '../atoms/typography';
import Image from 'next/image';
import { ContainerReview, ReviewBtnStyle } from '../pages-components/review';
import { BasicButton } from '../atoms/button';

export interface IRatedContentProps {
    goToOrderList(): void;
}

function _reviewRatedPage(props: IRatedContentProps) {
    const { goToOrderList } = props;

	return (
        <ContainerReview margin='50% 40px 20px 40px'>
            <Flex>
                <CustomText fsize={16} fweight={700} color="#3868B0" margin='0 0 24px 0' talign='center'>Ulasan Terkirim</CustomText>
                <Image src="/static/images/review-wing.svg" alt="Empty Cart icon" width={150} height={150} />
                <CustomText fsize={12} talign="center" fweight={400} color="#8F90A6" padding='20px 5px 50px 5px'>Terima kasih telah memberikan ulasan, setiap ulasan yang diberikan membantu kami untuk meningkatkan pelayanan yang lebih baik</CustomText>
                <BasicButton style={ReviewBtnStyle} bColor="#61C7B5" onClick={() => goToOrderList()}>Pesanan Saya</BasicButton>
            </Flex>
        </ContainerReview>
	);
}

export const ReviewRatedPage = memo(_reviewRatedPage);
