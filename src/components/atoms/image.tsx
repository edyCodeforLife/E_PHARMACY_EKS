import styled from '@emotion/styled';
import Image from 'next/image';

export interface ImageProps {
	mwidth?: number;
	mheight?: number;
	margin?: string;
	padding?: string;
}

export const ImageLogo = styled(Image) <ImageProps>`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	max-width: ${(props) => props.mwidth}px;
	max-height: ${(props) => props.mheight}px;
	margin: ${(props) => props.margin} !important;
	padding:  ${(props) => props.padding} !important;
`;

export interface IImageProps {
	width?: any;
	height: number;
	mwidth?: number;
	mheight?: number;
	margin?: boolean;
	bradius?: string;
}

export const LogoImage = styled.img<IImageProps>`
	width: ${(props) => props.width};
	height: ${(props) => props.height}px;
	max-width: ${(props) => props.mwidth}px;
	max-height: ${(props) => props.mheight}px;
	margin: ${(props) => props.margin ? '0px 5px' : null};
	border-radius: ${(props) => props.bradius};
`;