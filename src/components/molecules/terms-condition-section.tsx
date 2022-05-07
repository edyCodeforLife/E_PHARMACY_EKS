import { memo } from 'react';
import styled from '@emotion/styled';
import { FlexCenter } from '../atoms/flex';
import { LabelText } from '../atoms/typography';

const TermsConditionContainer = styled(FlexCenter)`
	padding: 10px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 2px solid #F2F2F5;
`;

export interface TermsandConditionProps {
	redirectToTermsCondition(): void;
}


function _TermsConditionSection(props: TermsandConditionProps) {
	const { redirectToTermsCondition } = props;

	return (
		<TermsConditionContainer>
			<LabelText
				color={"#3A3A3C"}
				fsize={12}
			>
				Dengan mengklik “Bayar” Anda menyetujui
			</LabelText>

			<LabelText
				onClick={() => { redirectToTermsCondition() }}
				color={"#61C7B5"}
				fsize={12}
				margin={"3px 0px"}
				cursor={"pointer"}
			>
				Syarat dan Ketentuan AlteaCare
			</LabelText>
		</TermsConditionContainer>
	);
}

export const TermsConditionSection = memo(_TermsConditionSection);
