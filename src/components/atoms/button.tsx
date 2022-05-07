import React, { memo } from 'react';
import styled from '@emotion/styled';

type IBasicBtnProps = {
    bColor?: string;
}

export const BasicBtn = styled.button<IBasicBtnProps>`
    cursor: pointer;
    outline: none;
    text-decoration: none;
    user-select: none;
    border: none;
    background: ${(props) => props.bColor ? props.bColor : 'none'};
    margin: 0;
    padding: 0;
`;

export interface IBtnProps extends React.HTMLProps<HTMLButtonElement> {
    bColor?: string;
}

function _BasicButton(props: IBtnProps) {
    const { style = {}, id, bColor } = props;
    return (
        <BasicBtn bColor={bColor} id={id} onClick={props.onClick} style={style}>
            {props.children}
        </BasicBtn>
    );
}

export const BasicButton = memo(_BasicButton);
