import type { NextPage } from 'next'
import styled from '@emotion/styled';
import styles from '../../styles/_styles-web.module.scss';
import { FlexRowCenter } from '../../components/atoms/flex';
import { LabelText } from '../../components/atoms/typography';

const BlankContainer = styled(FlexRowCenter)`
	align-items: center;
	width: 100%;
	height: 100%;
`;

const BackToMobile: NextPage = () => {

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<BlankContainer>
					<LabelText>
						Kembali Ke Mobile Apps
					</LabelText>
				</BlankContainer>
			</div>
		</div>


	)
}

export default BackToMobile;
