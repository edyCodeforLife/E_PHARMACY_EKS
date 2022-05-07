import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import Slider from "react-slick";
import { FlexRowCenter } from './flex';
import { LogoImage } from './image';

export interface ISliderProps {
	mbottom?: number;
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
}

export const ContainerSlider = styled.div <IContainerSliderProps>`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
	width: 100%;
	margin-bottom: ${(props) => props.mbottom || 30}px;
`;

const ContainerImg = styled(FlexRowCenter)`
	align-items: center;
	display: flex !important;
	justify-content: center;
	outline: none;
	cursor: pointer;
	width: 100%!important;
`;

const CustomDots = styled.div`
	background-color: transparent;
	padding: 5px;
	color: #61C7B5;
`;

const PagingSlider = styled.div`
	background: #61C7B5;
`;

export interface ISliderComponentProps {
	productImg: any;
	mbottom?: number;
	centerPadding?: string | '0px';
	sliderHeight: number;
	sliderWidth: any;
	bradius?: string;
}


function _SliderComponent(props: ISliderComponentProps) {
	const { mbottom, productImg, sliderHeight, sliderWidth, bradius } = props;
	const settings = {
		dots: true,
		infinite: false,
		centerMode: false,
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
			<PagingSlider>
				{i + 1}
			</PagingSlider>
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
		<ContainerSlider mbottom={mbottom}>
			<Slider {...settings}>
				{productImg?.map((item: any, idx: number) => (
					<ContainerImg key={idx}>
						<LogoImage
							height={sliderHeight}
							width={sliderWidth}
							src={item?.formats?.small}
							bradius={bradius}
							{...props}
						/>
					</ContainerImg>
				))}
			</Slider>
		</ContainerSlider>
	);
}

export const SliderComponent = memo(_SliderComponent);