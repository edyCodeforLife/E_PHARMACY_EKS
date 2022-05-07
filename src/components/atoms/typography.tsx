import styled from '@emotion/styled';

type ICustomTextProps = {
    fsize?: number,
    fweight?: number,
    margin?: string,
    color?: string,
    talign?: string,
    tdecorline?: string,
    padding?: string,
    lheight?: string | number
}

type IpropsLabel = {
    color?: string,
    fsize?: number,
    fweight?: number,
    margin?: string | number,
    talign?: string,
    lheight?: string | number,
    wspace?: string | number,
    cursor?: string
}

export const H3 = styled.h3`
    font-weight: 500;
`;

export const H1 = styled.h1`
    font-weight: 500;
    font-size: 18px;
`;


export const CustomText = styled(H3)<ICustomTextProps>`
    font-size: ${(props) => props.fsize}px;
    font-weight: ${(props) => props.fweight};
    margin: ${(props) => props.margin};
    color: ${(props) => props.color};
    text-align: ${(props) => props.talign};
    text-decoration-line: ${(props) => props.tdecorline};
    padding: ${(props) => props.padding};
    line-height: ${(props) => props.lheight};
`;

export const LabelText = styled.div<IpropsLabel>`
	color: ${(props) => props.color};
	font-size: ${(props) => props.fsize}px;
	font-weight: ${(props) => props.fweight};
	margin: ${(props) => props.margin};
	text-align: ${(props) => props.talign};
	line-height: ${(props) => props.lheight};
	white-space:${(props) => props.wspace};
	cursor: ${(props) => props.cursor};
`;

