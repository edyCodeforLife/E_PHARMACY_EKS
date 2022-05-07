
import styled from '@emotion/styled';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { memo } from 'react';
import Box from '@mui/material/Box';

export interface ISwipeDrawerProps extends ICustomDrawerProps {
	toggleDrawer(open: boolean): any;
	openDrawer: boolean;
	children: any;
	anchor: "left" | "top" | "right" | "bottom" | undefined;
	bgcolor: string;
}

export interface IStyledBoxProps {
	bgcolor: string;
}

export interface ICustomDrawerProps {
	bordertopleft: number;
	bordertopright: number;
	padding: string;
	drawerheight: string;
}

const StyledBox = styled(Box) <IStyledBoxProps>`
	background-color: ${(props) => props.bgcolor};
`;

const CustomDrawer = styled(SwipeableDrawer) <ICustomDrawerProps>`
	.MuiDrawer-paper {
		border-top-left-radius: ${(props) => props.bordertopleft}px;
		border-top-right-radius: ${(props) => props.bordertopright}px;
		padding:  ${(props) => props.padding};
		height:  ${(props) => props.drawerheight};
	}
`;


function _SwipeDrawerMaterial(props: ISwipeDrawerProps) {
	const {
		toggleDrawer,
		openDrawer,
		children,
		anchor,
		bgcolor,
		bordertopleft,
		bordertopright,
		padding,
		drawerheight
	} = props;
	const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<CustomDrawer
			anchor={anchor}
			open={openDrawer}
			onClose={toggleDrawer(false)}
			onOpen={toggleDrawer(openDrawer)}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			bordertopleft={bordertopleft}
			bordertopright={bordertopright}
			padding={padding}
			drawerheight={drawerheight}
		>
			<StyledBox
				bgcolor={bgcolor}
			>
				{children}
			</StyledBox>
		</CustomDrawer>
	)
}

export const SwipeDrawerMaterial = memo(_SwipeDrawerMaterial);