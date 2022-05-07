import { memo } from 'react';
import styled from '@emotion/styled';
import { FlexRow } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { ImageLogo } from '../atoms/image';

const UploadContainer = styled(FlexRow)`
	padding: 10px 15px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 2px solid #F2F2F5;
`;

function _UploadSection(props: any) {
	return (
		<UploadContainer>
			<ImageLogo
				src="/static/icons/attachment.svg"
				alt="attachment icon"
				width={20}
				height={20}
			/>

			<LabelText
				color={"#61C7B5"}
				fsize={12}
				margin={"0px 5px"}

			>
				Masukkan Resep Dokter (maks 10 MB)
			</LabelText>

		</UploadContainer>
	);
}

export const UploadSection = memo(_UploadSection);
