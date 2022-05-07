import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { BasicBtn } from '../atoms/button';
import { CustomFooter } from '../atoms/custom-element';
import { currencyFormat } from "../../libs/function";

const CustomBtn = styled(BasicBtn)`
	font-size: 14px;
    font-weight: 500;
    padding: 12px 35px;
    color: white;
    background-color: #61C7B5;
    border-radius: 20px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	};
`;

export interface IPaymentFooterProps {
	onClickPayment(e: any): void;
	totalPayment: number;
	isDisabled: boolean;
}

function _PaymentFooterSection(props: IPaymentFooterProps) {
	const { onClickPayment, totalPayment, isDisabled } = props;
	return (
		<CustomFooter style={{ padding: '5px 15px' }} jcontent='space-between'>
			<Flex>
				<LabelText
					fsize={10}
					fweight={400}
					color='#6B7588'
					talign='left'
				>
					Total Pembayaran
                 </LabelText>
				<LabelText
					fsize={16}
					fweight={700}
					color='#3A3A3C'
					talign='left'
				>
					{currencyFormat?.(totalPayment)}
				</LabelText>
			</Flex>

			<CustomBtn
				onClick={(e) => onClickPayment(e)}
				disabled={isDisabled}
			>
				Bayar
            </CustomBtn>

		</CustomFooter>
	);
}

export const PaymentFooterSection = memo(_PaymentFooterSection);
