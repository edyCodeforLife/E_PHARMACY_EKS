import { memo } from 'react';
import styled from '@emotion/styled';
import { CustomText } from './typography';
import { BasicBtn } from './button';

interface IDrawerMaxOrder {
    onHandleClose?(): void;
    text: string;
}

const DrawerContainer = styled.div`
    height: 100%;
`

const CustomBtn = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: 'white',
    backgroundColor: '#61C7B5',
    borderRadius: 20,
    margin: '20px 0',
    width: '100%'
}

function _DrawerMaxOrder(props: IDrawerMaxOrder) {
    const { onHandleClose, text } = props;

    return (
        <DrawerContainer>
            <CustomText fsize={14} fweight={400} color="#828282" talign='center'>
                {text}
            </CustomText>
            <BasicBtn style={CustomBtn} onClick={onHandleClose}>
                Oke, Mengerti
            </BasicBtn>
        </DrawerContainer>
    );
}

export const DrawerMaxOrder = memo(_DrawerMaxOrder);
