import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexRow } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexOneCustom } from '../../atoms/flex';
import { ImageLogo } from '../../atoms/image';
import { LabelText } from '../../atoms/typography';
import { IDataTermsCondition } from '../../../libs/services/CMS/ICMS-service';

export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export interface IpropsSectionCheckout {
	jcontent: string;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 120px);
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
	overflow: scroll;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;


export const ContainerFlexRow = styled(FlexRow)`
	padding: 15px;
	width: 100%;
	box-sizing: border-box;
`;

const ContainerText = styled(Flex)`
	padding: 15px;
	flex-wrap: wrap;
`;

export interface ITermsConditionProps {
	onBack(): void;
	dataTermsCondition: IDataTermsCondition[];
}

function _TermsConditionContent(props: ITermsConditionProps) {
	const { onBack, dataTermsCondition } = props;

	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
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
													Syarat & Ketentuan
												</HeaderText>
											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside>
										<ContainerFlexRow>
											<ImageLogo
												src={"/static/images/logo_Alteacare.svg"}
												width={150}
												height={50}
												alt={"alteacare-logo"}
												padding={"0px 20px 0px 0px"}
											/>

											<ImageLogo
												src={"/static/images/logo_kemenkes.svg"}
												width={100}
												height={60}
												alt={"kemenkes-logo"}
											/>
										</ContainerFlexRow>

										<ContainerFlexRow>
											<LabelText
												color={"#000000"}
												fsize={16}
												fweight={600}
											>
												{dataTermsCondition?.[0]?.title}
											</LabelText>
										</ContainerFlexRow>

										<ContainerText dangerouslySetInnerHTML={{ __html: dataTermsCondition?.[0]?.text }} />

									</ContainerInside>
								</ContainerCardContent>
							</GeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	)
}

export const TermsConditionContent = memo(_TermsConditionContent);