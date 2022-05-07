import styled from '@emotion/styled';
import { memo } from 'react';
import { FlexRowCenter } from './flex';
import { LabelText } from './typography';

export interface IInfoLabelProps extends React.HTMLProps<HTMLDivElement> {
	background: string;
	fontSize?: number;
	color?: string;
	fontWeight?: number;
	justifyContent?: string;
	padding: string;
	radius?: number;
	talign?: string;
}

type IContainerLabelType = {
	background: string;
	fontSize?: number;
	color?: string;
	fontWeight?: number;
	justifyContent?: string;
	padding: string;
	radius?: number;
}

const ContainerLabel = styled(FlexRowCenter) <IContainerLabelType>`
	align-items: center;
	padding: ${(props) => props.padding};
	width: 100%;
	height: 28px;
	background: ${(props) => props.background};
	font-size: ${(props) => props.fontSize}px;
	color: ${(props) => props.color};
	font-weight: ${(props) => props.fontWeight};
	justify-content: ${(props) => props.justifyContent};
	border-radius: ${(props) => props.radius}px;
`;

function _InfoLabel(props: IInfoLabelProps) {
	const { background, fontWeight, color, padding, fontSize, justifyContent, radius, talign } = props;
	return (
		<ContainerLabel
			background={background}
			fontSize={fontSize}
			color={color}
			fontWeight={fontWeight}
			justifyContent={justifyContent}
			padding={padding}
			radius={radius}
		>
			<LabelText talign={talign}>
				{props.children}
			</LabelText>
		</ContainerLabel>
	);
}

export const InfoLabel = memo(_InfoLabel);