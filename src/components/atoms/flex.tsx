import styled from '@emotion/styled';

export interface FlexOneProps {
    textAlign?: string;
    cursor?: string;
    flex: string;
    justifyContent?: string;
    position?: string;
}

export const Flex = styled.div`
    -js-display: flex;
    display: flex;
    flex-direction: column;
`;

export const FlexCenter = styled(Flex)`
    justify-content: center;
    align-items: center;
`;

export const FlexRow = styled(Flex)`
    flex-direction: row;
    align-items: center;
`;

export const FlexRowCenter = styled(FlexRow)`
    justify-content: center;
`;

export const FlexOne = styled(Flex)`
    flex: 1;
`;

export const FlexOneCenter = styled(FlexOne)`
    align-items: center;
    justify-content: center;
`;

export const CustomFlexRowCenter = styled(FlexRowCenter)`
	position: relative;
	margin-top: 0px;
`;

export const FlexRowSpaceBetween = styled(FlexRow)`
    justify-content: space-between;
`;

export const FlexOneCustom = styled(FlexOne) <FlexOneProps>`
	text-align: ${props => props.textAlign};
	flex-grow: 0 !important;
	flex: ${(props) => props.flex};
	cursor: ${props => props.cursor};
    justify-content:  ${props => props.justifyContent};
    position: ${props => props.position};
`;

export default Flex;
