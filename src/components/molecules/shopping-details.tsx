import { memo } from 'react';
import styled from '@emotion/styled';
import { FlexRow } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { ImageLogo } from '../atoms/image';

const ShoppingDetailsContainer = styled(FlexRow)`
	padding: 10px 15px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 2px solid #F2F2F5;
`;

function _ShoppingDetails(props: any) {
	return (
		<ShoppingDetailsContainer>
			<ImageLogo
				src="/static/icons/shopping_details.svg"
				alt="shopping icon"
				width={20}
				height={20}
			/>

			<LabelText
				color={"#6B7588"}
				fsize={14}
				fweight={600}
				margin={"0px 5px"}

			>
				Rincian Belanja
			</LabelText>

		</ShoppingDetailsContainer>
	);
}

export const ShoppingDetails = memo(_ShoppingDetails);
