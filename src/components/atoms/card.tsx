import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import styled from '@emotion/styled';

export const CustomCardStyle = styled(Card)`
  	background: #fff;
	border-radius: 8px;
	max-width: 370px;
	height: 100%;
	margin-left: auto;
	margin-right: auto;
	box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
	margin-top: 10px;
	margin-bottom: 10px;
	border-radius: 12px;
	min-height: 75vh;
	overflow: hidden;
		@media (max-width: 768px) {
			width: 100vw;
			margin-top: 0px;
			margin-bottom: 0px;
			border-radius: 0px;
			min-height: 90vh;
			height: 100vh;
			max-width: 100vw;
		}
`;

export const GeneralCard = styled(CustomCardStyle)`
	min-height: 90vh;
`;

export const CustomCardContent = styled(CardContent)`
	padding: 12px;
	  &:last-child {
        padding-bottom: 10px;
    }
`;

export const NewCardContent = styled(CustomCardContent)`
	padding: 15px !important;
`;

export const ContainerCardContent = styled(NewCardContent)`
	padding: 0px !important;
	// height: calc(100vh - 160px);
	height: 100%;
	position: relative;
	overflow: hidden;
		@media (max-width: 768px) {
		height: 100%;
	};
`;