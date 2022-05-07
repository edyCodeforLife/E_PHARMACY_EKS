import { memo } from 'react';
import styled from '@emotion/styled';
import { Flex, FlexRowSpaceBetween } from '../atoms/flex';
import { LabelText } from '../atoms/typography';

const AddressContainerSection = styled(Flex)`
	padding: 5px 15px;
	background: #fff;
	margin: 1px 0px;
	width: 100%;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	align-items: flex-start;
	border-bottom: 2px solid #F2F2F5;
`;


const CustomFlexSpaceBetween = styled(FlexRowSpaceBetween)`
	width: 100%;
	margin: 8px 0px;
`;


function _AddressCheckout(props: any) {
	const { address } = props;
	const address_formatted = `${address?.street}, ${address?.rt_rw}, ${address?.sub_district.name}, ${address?.district.name}, ${address?.city.name}, ${address?.province.name}, ${address?.country.name}, ${address?.sub_district.postal_code}`;

	return (
		<AddressContainerSection>
			<CustomFlexSpaceBetween>
				<LabelText
					color={"#8F90A6"}
					fsize={12}
				>
					{`${address.receiver_name} | ${address.receiver_phone}`}
				</LabelText>

			</CustomFlexSpaceBetween>

			<LabelText
				color={"#8F90A6"}
				fsize={12}
				fweight={500}
			>
				{address_formatted}
			</LabelText>

		</AddressContainerSection>
	);
}

export const AddressCheckout = memo(_AddressCheckout);
