import { memo } from "react"
import styled from "@emotion/styled";
import Image from 'next/image';
import { Flex, FlexRow, FlexRowSpaceBetween } from "./flex";
import { CustomText } from "./typography";
import { BasicBtn } from "./button";
import { IAddressData } from "../../libs/services/address/iaddress-service";

export interface IAdressCardProps {
    item: IAddressData;
    primaryAddress: string;
    setPrimary(e: any, id: string): void;
    onClickDelete(e: any, id: string): void;
    onChangeClick(event: any, id: string): void
}

type IPropsCard = {
    border?: string;
}

const Card = styled(FlexRow)<IPropsCard>`
    display: flex;
    align-items: center;
    padding: 18px;
    margin: 8px 0;
    box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    border: ${(props) => props.border};
    cursor: pointer;
`
const CardContent = styled.div`
    width: 100%;
`

const DeleteBtn = {
    marginTop: '-20px'
}

const ChangeBtnStyle = {
    fontSize: 12,
    fontWeight: 700,
    paddingTop: 13,
    paddingBottom: 13,
    height: '40px',
    color: '#61C7B5',
    border: '1px solid #61C7B5',
    borderRadius: 8,
}

const FlexColBetween = styled(Flex)`
    justify-content: space-between;
`

const AddressContent = styled.div`
    padding: 12px 0 18px 0;
`

const CheckIcon = styled.div`
    width: 20px;
    height: 20px;
    margin: -20px 0 0 15px;
`

const Div = styled.div`
    min-height: 42px;
`

function _AddressCard(props: IAdressCardProps) {
    const { item, primaryAddress, setPrimary, onClickDelete, onChangeClick } = props;
    const address_formatted = `${item?.street}, ${item?.rt_rw}, ${item?.sub_district.name}, ${item?.district.name}, ${item?.city.name}, ${item?.province.name}, ${item?.country.name}, ${item?.sub_district.postal_code}`;

    return (
        <Card border={item?.id == primaryAddress ? '1px solid #61C7B5' : ''} onClick={(e) => setPrimary(e, item.id)}>
            <CardContent>
                <Flex>
                    <FlexColBetween>
                        <FlexRowSpaceBetween>
                            <FlexRow>
                                <Div>
                                    <CustomText talign="left" fsize={14} fweight={700}>{item?.receiver_name}</CustomText>
                                    <CustomText fsize={14} fweight={400} color="#6B7588" lheight="1.5">{item?.receiver_phone}</CustomText>
                                </Div>
                                {item?.id == primaryAddress && (<CheckIcon>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#61C7B5">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </CheckIcon>)}
                            </FlexRow>
                            <BasicBtn style={DeleteBtn} onClick={(e) => onClickDelete(e, item?.id)}>
                                <Image src="/static/icons/trash-icon.svg" width={14} height={14} alt='Remove Icon' />
                            </BasicBtn>
                        </FlexRowSpaceBetween>
                        <AddressContent>
                            <CustomText fsize={12} fweight={400} talign="left" color="#6B7588" lheight="1">{address_formatted}</CustomText>
                        </AddressContent>
                        <BasicBtn style={ChangeBtnStyle} onClick={(e) => onChangeClick(e, item?.id)}>
                            Ubah Alamat
                        </BasicBtn>
                    </FlexColBetween>
                </Flex>
            </CardContent>
        </Card>
    )
}

export const AddressCard = memo(_AddressCard);