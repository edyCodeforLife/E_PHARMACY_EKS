import { memo } from 'react';
import styled from '@emotion/styled';
import Slider from "react-slick";
import { FlexRowCenter } from './flex';
import { LogoImage } from './image';

export interface IBannerProps {
	mbottom?: number;
	mtop?: number;
}

export interface ContainerBoxProps {
	padding: string;
	mpadding: string;
}

export interface BoxCustomProps {
	height: any
}

export interface IContainerSliderProps {
	mbottom?: number;
	mtop?: number;
}

export interface IContainerBannerProps {
	width: any;
}

export const ContainerSlider = styled.div <IContainerSliderProps>`
	display: flex;
	margin-top: ${(props) => props.mtop || 20}px;
	flex-direction: column;
	width: 100%;
	margin-bottom: ${(props) => props.mbottom || 30}px;
`;

const ContainerBanner = styled(FlexRowCenter) <IContainerBannerProps>`
	align-items: center;
	display: flex !important;
	justify-content: center;
	outline: none;
	cursor: pointer;
	width: ${(props) => props.width} !important;
`;

const CustomDots = styled.div`
	background-color: transparent;
	padding: 5px;
	color: #61C7B5;
`;

const PagingBanner = styled.div`
	background: #61C7B5;
`;

export interface IBannerComponentProps {
	bannerData: any;
	mbottom?: number;
	mtop?: number;
	centerPadding?: string | '0px';
	bannerHeight: number;
	bannerWidth: any;
	bradius?: string;
	redirecTo?(url: string): void;
}



function _BannerComponent(props: IBannerComponentProps) {
	const { mbottom, mtop, bannerData, bannerHeight, bannerWidth, bradius, redirecTo } = props;
	const settings = {
		dots: true,
		infinite: false,
		centerMode: true,
		pauseOnHover: true,
		pauseOnFocus: true,
		swipeToSlide: true,
		nextArrow: undefined,
		prevArrow: undefined,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots: any) => (
			<CustomDots>
				<ul style={{ margin: "0px" }}> {dots} </ul>
			</CustomDots>
		),
		customPaging: (i: any) => (
			<PagingBanner>
				{i + 1}
			</PagingBanner>
		),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	};

	return (
		<ContainerSlider mtop={mtop} mbottom={mbottom}>
			<Slider {...settings}>
				{bannerData.map((item: any, idx: number) => (
					<ContainerBanner
						width={bannerData.length === 1 ? "100%" : "calc(100% + 15px)"}
						onClick={() => redirecTo?.(item.url_web)}
						key={idx}
					>
						<LogoImage
							height={bannerHeight}
							width={bannerWidth}
							src={item.image_mobile}
							bradius={bradius}
							{...props}
						/>
					</ContainerBanner>
				))}
			</Slider>
		</ContainerSlider>
	);
}

export const BannerComponent = memo(_BannerComponent);