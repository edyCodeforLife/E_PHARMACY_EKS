import React from 'react';
import { FlexRow, FlexRowSpaceBetween } from './flex';
import Image from 'next/image';
import { CustomText } from './typography';
import styled from '@emotion/styled';

type IOrderBadgeSectionProps = {
    ref_code: string | number;
    status: any;
}

type IInfoTagProps = {
    background: string;
}

export const InfoTag = styled.div<IInfoTagProps>`
	background: ${(props) => props.background};
	border-radius: 5px;
	color: white;
	font-size: 12px;
	padding: 5px;
	font-weight: 500;
`;

function OrderBadgeSection(props: IOrderBadgeSectionProps) {
    const { ref_code, status } = props;

	return (
        <FlexRowSpaceBetween>
            <FlexRow>
                <Image src="/static/icons/receipt-icon.svg" width={20} height={20} alt="Receipt Icon" />
                <CustomText fsize={12} fweight={400} color="#8F90A6" margin='0 8px'>Order ID : {ref_code}</CustomText>
            </FlexRow>
            <InfoTag background={status?.bgColor}>{status?.label}</InfoTag>
        </FlexRowSpaceBetween>
);
}

export default OrderBadgeSection;