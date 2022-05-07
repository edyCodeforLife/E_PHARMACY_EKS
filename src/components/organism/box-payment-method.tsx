
import { memo } from 'react';
import styled from '@emotion/styled';
import { LogoImage } from '../atoms/image';
import Flex, { FlexRow } from '../atoms/flex';
import { LabelText } from '../atoms/typography';


export interface IBoxAppointment {
	id: string;
	item: any;
	isNormalBox: boolean;
	handleClickBox(code: string, provider: string): void;
}

export interface IContainerBoxProps {
	normal?: boolean;
}


export const ContainerBox = styled.div<IContainerBoxProps>`
	padding: ${(props) => props.normal ? '0px 5px' : '9px 0px'} ;
	margin: 0px 3px;
	position: relative;
	outline: none;
	cursor: pointer;
	@media (max-width: 768px) {
		padding: ${(props) => props.normal ? '2px 2px;' : '8px 0px'} ;
		margin: 0px 2px;
	}
`;

export const SmallBoxContainer = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
`;

export const SmallBoxCustom = styled(SmallBoxContainer)`
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	min-height: 0px;
	height: auto;
	min-width: 10px;
	padding: 14px;
	width: auto;
	border-radius: 8px;
	@media (max-width: 768px) {
		min-height: 50px;
		min-width: 50px;
		padding: 14px 10px;
	}
`;

const ContainerHeaderBox = styled(FlexRow)`
	border-bottom:  1px solid rgba(0,0,0, .08);
	padding-bottom: 10px;
`;

const CustomBox = styled(SmallBoxCustom)`
	min-height: 0px;
	height: auto;
		@media (max-width: 768px) {
		min-width: 50px;
		padding: 14px 10px;
	}
`;

function _BoxPaymentMethod(props: IBoxAppointment) {
	const {
		id,
		item,
		isNormalBox,
		handleClickBox
	} = props;

	return (
		<div onClick={() => handleClickBox(item?.code, item?.provider)}>
			<ContainerBox normal={isNormalBox} id={id}>
				<CustomBox>
					<Flex>
						<ContainerHeaderBox>
							<LogoImage
								src={item?.icon}
								width={'81px'}
								height={20}
							/>

							<LabelText
								margin={"0px 5px"}
								color={"#3A3A3C"}
								fweight={600}
								fsize={14}
							>
								{item?.name}
							</LabelText>
						</ContainerHeaderBox>

						<LabelText
							margin={"8px 0px"}
							color={"#8F90A6"}
							fsize={14}
							lheight={1.4}
							talign={"left"}
						>
							{item?.description}
						</LabelText>
					</Flex>
				</CustomBox>
			</ContainerBox>
		</div>
	)
}

export const BoxPaymentMethod = memo(_BoxPaymentMethod);

