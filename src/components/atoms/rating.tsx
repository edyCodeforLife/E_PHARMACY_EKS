import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';

type IRatingProps = {
    value: number;
    setStar(value: any): void;
}

const ContainerRating = styled.div`
    width: 100% !important;
    text-align: center !important;
    padding: 30px 0 5px 0 !important;
`
const CustomRating = styled(Rating)`
    .MuiRating-icon {
        padding-right: 13px !important;
        padding-left: 13px !important;
    }

    .MuiRating-icon:last-child {
        // padding-right: 1050px !important;
    }

    .MuiRating-icon:nth-last-of-type(2) {
        // padding-right: 10px !important;
        // padding-left: 16px !important;
    }

    // .css-dqr9h-MuiRating-label {
    //     padding-right: 30px !important;
    // }

    // .css-dqr9h-MuiRating-label:last-child {
    //     padding-right: 0px !important;
    // }

    // .css-dqr9h-MuiRating-label:nth-last-of-type(2) {
    //     padding-right: 10px !important;
    // }
    
`

function BasicRating(props: IRatingProps) {
    const { value, setStar } = props;
	return (
        <ContainerRating>
            <CustomRating name="size-large" defaultValue={0} value={value} onChange={(event, newValue) => { setStar(newValue) }} size="large" />
        </ContainerRating>
	);
}

export default BasicRating;