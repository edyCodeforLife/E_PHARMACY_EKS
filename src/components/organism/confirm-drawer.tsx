
import { memo } from 'react';
import styled from '@emotion/styled';
import { FlexCenter, FlexRowCenter } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import { SwipeDrawerMaterial } from '../atoms/swipe-drawer';
import FormControl from '@mui/material/CardContent';

export interface IContainerBoxProps {
	normal?: boolean;
}

export interface ICustomFormControlProps {
	minwidth: string;
	talign: string;
}

export interface IBtnSubmitProps {
	minwidth: string;
	background: string;
	border?: string;
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

const CustomContainerBtn = styled(FlexRowCenter)`
	position: relative;
	width: 100%;
	box-sizing: border-box;
`;

export const CustomFormControl = styled(FormControl) <ICustomFormControlProps>`
	min-width: ${(props) => props.minwidth};
	margin-top: 0px;
	text-align: ${(props) => props.talign};
	padding: 0px 0px 15px 0px !important;
`;

export const ContainerBtn = styled.div`
	width: 100%;
	height: auto;
`;

export const BtnSubmit = styled.button<IBtnSubmitProps>`
	background: ${(props) => props.background};
	cursor: pointer;
	border-radius: 40px;
	padding: 15px;
	color:  ${(props) => props.color};
	border: none;
	border: ${(props) => props.border};
	min-width: ${(props) => props.minwidth};
	font-size: 16px;
	&:disabled {
		background-color: #C7C9D9;
		color: #fff;
	}
`;



function _ConfirmDrawer(props: any) {
	const {
		openDrawer,
		toggleDrawer,
		description,
		title,
		onClickNext
	} = props;

	return (
		<SwipeDrawerMaterial
			openDrawer={openDrawer}
			toggleDrawer={toggleDrawer}
			anchor={"bottom"}
			bgcolor={"#fff"}
			bordertopleft={20}
			bordertopright={20}
			padding={"10px"}
			drawerheight={"250px"}

		>
			<FlexCenter>
				<LabelText
					color={"#333333"}
					fsize={14}
					fweight={600}
				>
					{title}
				</LabelText>
				<LabelText
					color={"#6B7588"}
					fsize={14}
					talign={"center"}
					margin={"10px"}
				>
					{description}
				</LabelText>
				<CustomContainerBtn>
					<CustomFormControl minwidth="90%" talign="center">
						<ContainerBtn>
							<BtnSubmit
								onClick={() => onClickNext()}
								background={"#61C7B5"}
								border={"#61C7B5"}
								color={"#fff"}
								minwidth="100%"
							>
								Benar, Lanjutkan
							</BtnSubmit>
						</ContainerBtn>
					</CustomFormControl>
				</CustomContainerBtn>

				<CustomContainerBtn>
					<CustomFormControl minwidth="90%" talign="center">
						<ContainerBtn>
							<BtnSubmit
								background={"#fff"}
								border={"1px solid #61C7B5"}
								color={"#61C7B5"}
								onClick={toggleDrawer(false)}
								minwidth="100%"
							>
								Ubah
							</BtnSubmit>
						</ContainerBtn>
					</CustomFormControl>
				</CustomContainerBtn>
			</FlexCenter>
		</SwipeDrawerMaterial>
	)
}

export const ConfirmDrawer = memo(_ConfirmDrawer);

