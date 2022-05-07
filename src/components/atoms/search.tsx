import { memo } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/Search';

interface ISearch {
	needIcon: boolean;
	id: string;
	style?: any
	onSearchChange?(e: any): void;
	width?: string;
	maxWidth?: string;
	isActiveClick: boolean;
	handleClick?(): void;
	placeholder?: string;
	onKeyPress?(e: any): void;
}

type IpropsCustomInputField = {
	width: any;
	maxWidth?: string;
}

export const CustomInputFieldContainer = styled.div<IpropsCustomInputField>`
    display: flex;
    align-items: center;
	font-size: 12px;
	width: ${(props) => props.width};
	padding: 10px 12px;
	border-radius: 20px;
	box-shadow: 0px 0px 4px #D6EDF6;
    position: relative;
	line-height: 1.6;
	position: relative;
	border: 1px solid #61C7B5;
	// background: #F2F2F5;
	max-width: ${(props) => props.maxWidth || '300px'};
	overflow: hidden;
`;

export const CustomInputField = styled.input<IpropsCustomInputField>`
	border-bottom: none;
	margin-left: 30px;
	width: ${(props) => props.width};
	border: none;
	outline: none;
	font-size: 14px;
	// background: #F2F2F5;
	color: #959595;
	font-style: normal;
	font-weight: 400;
`;

export const MaterialIconContainer = styled(SearchIcon)`
	position: absolute;
	// top: 8px;
	color: #61C7B5;
`;

function _SearchInput(props: ISearch) {
	const { style = {}, id, needIcon, onSearchChange, width, maxWidth, isActiveClick, handleClick, placeholder, onKeyPress } = props;
	return (
		<form noValidate autoComplete="off">
			<CustomInputFieldContainer
				width={width}
				maxWidth={maxWidth}
			>
				{needIcon ? (
					<MaterialIconContainer />
				) : null}
				<CustomInputField
					onChange={(e) => { onSearchChange?.(e) }}
					width={width}
					onKeyPress={(e) => { onKeyPress?.(e) }}
					type="search"
					onClick={() => {
						!isActiveClick ?
							null
							:
							handleClick?.()
					}}
					placeholder={placeholder ? placeholder : 'Pencarian'}
				/>
			</CustomInputFieldContainer>
		</form>
	);
}

export const SearchInput = memo(_SearchInput);
