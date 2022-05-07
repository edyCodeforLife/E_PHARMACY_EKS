import { memo } from 'react';
import { FlexCenter, FlexRowSpaceBetween } from '../atoms/flex';
import { SearchInput } from '../atoms/search';
import styled from '@emotion/styled';
import Image from 'next/image';
import { FlexOneCustom } from '../atoms/flex';
import useRedirectTo from '../../libs/hooks/use-redirectTo';

type ISearchSectionProps = {
	isActiveClick: boolean;
	handleClick?(): void;
	onSearchChange?: any;
	cartCount: number;
	redirectToCart(): void;
	onKeyPress?: any;
};

export const ContainerSectionSearch = styled(FlexRowSpaceBetween)`
	padding: 5px 15px;
	width: 100%;
`;

export const RedDot = styled(FlexCenter)`
	border-radius: 50%;
	background: red;
	position: absolute;
	right: 6px;
	width: 18px;
	height: 18px;
	color: #F2F2F2;
	font-size: 10px;
`;


function _SearchSection(props: ISearchSectionProps) {
	const { isActiveClick, redirectToCart, cartCount, handleClick, onSearchChange, onKeyPress } = props;
	return (
		<ContainerSectionSearch>
			<FlexOneCustom
				cursor={"pointer"}
				flex={"85% 0 0"}
				textAlign={"left"}
			>
				<SearchInput
					id="Search_Drug"
					needIcon={true}
					onSearchChange={onSearchChange}
					isActiveClick={isActiveClick}
					handleClick={handleClick}
					onKeyPress={onKeyPress}
					width={"100%"}
				/>
			</FlexOneCustom>

			<FlexOneCustom
				cursor={"pointer"}
				flex={"15% 0 0"}
				textAlign={"right"}
				position={'relative'}
				onClick={() => redirectToCart()}
			>

				<Image
					src="/static/icons/cart_icon.svg"
					alt="Cart icon"
					width={25}
					height={25}
				/>
				{cartCount > 0 && (
					<RedDot>
						{cartCount}
					</RedDot>
				)}
			</FlexOneCustom>
		</ContainerSectionSearch>
	);
}

export const SearchSection = memo(_SearchSection);
