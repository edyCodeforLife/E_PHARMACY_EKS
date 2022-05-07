import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRow } from '../atoms/flex';
import { LabelText } from '../atoms/typography';
import TextField from '@mui/material/TextField';


export type IpropsNotes = {
	value: string;
	changeNotes(value: string): void;
}

const NotesContainer = styled(FlexRow)`
	padding: 13px 15px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	border-bottom: 2px solid #F2F2F5;
`;

const NotesTextField = styled(TextField)`
	border: none !important;
	border-style: none !important;
	margin-left: 10px;
	.MuiOutlinedInput-root {
		font-size: 14px !important;
		color: #8F90A6 !important;
	}
	.MuiOutlinedInput-notchedOutline {
		border-color: transparent !important;
	};
	.MuiOutlinedInput-input {
		padding: 0px !important;
	};
`;

function _NotesSection(props: IpropsNotes) {
	const { value, changeNotes } = props;
	return (
		<NotesContainer>
			<LabelText
				color={"#8F90A6"}
				fsize={14}
			>
				Catatan:
			</LabelText>
			<NotesTextField
				placeholder={"buat catatan untuk kurir"}
				fullWidth
				id="fullWidth"
				value={value}
				onChange={(e) => { changeNotes(e.target.value) }}
			/>
		</NotesContainer>
	);
}

export const NotesSection = memo(_NotesSection);
