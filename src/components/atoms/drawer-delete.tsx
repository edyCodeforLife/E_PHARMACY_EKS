import { memo } from 'react';
import styled from '@emotion/styled';
import { CustomText } from './typography';
import { BasicBtn } from './button';
import { FlexRowBetween } from '../pages-components/detail-product';

interface IDrawerDelete {
	onHandleClose?(): void;
    onHandleDelete?(): void;
}

const DrawerContainer = styled.div`
    height: 100%;
`

const CustomBtn = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: '#000000',
    border: '1px solid #DDE5E9',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    margin: '20px 0',
    width: '45%'
}

const CustomBtnDelete = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: 'white',
    backgroundColor: '#FF8080',
    borderRadius: 20,
    margin: '20px 0',
    width: '45%'
}

const ContainerBtn = styled(FlexRowBetween)`

`

function _DrawerDelete(props: IDrawerDelete) {
	const { onHandleClose, onHandleDelete } = props;
	return (
		<DrawerContainer>
            <CustomText fsize={14} fweight={400} color="#828282" talign='center' padding='5px 0 0 0'>
                Apakah yakin untuk menghapus produk ini ?
            </CustomText>
            <ContainerBtn>
                <BasicBtn style={CustomBtn} onClick={onHandleClose}>
                    Batal
                </BasicBtn>
                <BasicBtn style={CustomBtnDelete} onClick={onHandleDelete}>
                    Hapus
                </BasicBtn>
            </ContainerBtn>
        </DrawerContainer>
	);
}

export const DrawerDelete = memo(_DrawerDelete);
