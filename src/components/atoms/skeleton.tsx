import React from 'react';
import Skeleton from '@mui/material/Skeleton';

type ISkeletonProps = {
    variant: any,
    animation: any,
    width: number | string,
    height: number | string
}

function BasicSkeleton(props: ISkeletonProps) {

	return (
		<Skeleton variant={props.variant} animation={props.animation} width={props.width} height={props.height} />
	);
}

export default BasicSkeleton;
