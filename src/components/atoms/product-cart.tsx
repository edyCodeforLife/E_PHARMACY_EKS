import { memo } from "react"
import styled from "@emotion/styled";
import Image from 'next/image';
import { IGetUserCartData, IProduct } from "../../libs/services/cart/icart-service"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Flex, { FlexRow } from "./flex";
import { CustomText } from "./typography";
import { currencyFormat } from "../../libs/function";
import { BasicBtn } from "./button";

export interface IProductCartProps {
    item: any;
    cartId: number;
    onDelete(cartId: number, item: string): void;
    onUpdateQty(cartId: number, productId: string, qty: number): void;
}

const CardList = styled(FlexRow)`
    display: flex;
    align-items: center;
    padding: 18px;
    margin: 8px 0;
    // box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
    border-radius: 8px;
    position: relative;
    border: 1px solid #EBEBF0;
`

const ImageContainer = styled.div`
    min-width: 70px;
    min-height: 70px;
`

const CardContentText = styled(Flex)`
    padding: 15px 0 0 20px;
    height: 100%;
    justify-content: space-evenly;
`

const ContainerQty = styled.div`
    display: flex;
    align-items: center;
    margin-top: 15px;
`

const ContainerTrash = styled.div`
    position: absolute;
    padding: 10px;
    top: 0;
    right: 0;
    background-color: #F5F5F5;
    border-bottom-left-radius: 8px;
    border-top-right-radius: 7px;
`

const CardContent = styled.div`
    width: 100%;
`

const DeleteBtn = {
    display: 'flex',
    alignItems: 'center',
    marginTop: '3px'
}

const QtyBtnAdd = {
	display: "flex",
	alignItems: "center",
	border: "0.5px solid gray",
};

const QtyBtn = {
    display: 'flex',
    alignItems: 'center',
    border: '0.5px solid #DDE5E9',
    borderRadius: '8px',
    padding: '2px'
}

function _ProductCart(props: IProductCartProps) {
    const { item, cartId, onDelete, onUpdateQty } = props;

    return (
			<CardList>
				<ImageContainer>
					<Image src={item?.image[0].url} width={70} height={70} alt="drug" />
				</ImageContainer>
				<CardContent>
					<CardContentText>
						<CustomText
							fweight={500}
							fsize={12}
							talign="left"
							margin="5px 0 0 0"
						>
							{item?.name}
						</CustomText>
						<CustomText
							fsize={10}
							color={"#61C7B5"}
							talign="left"
							margin="5px 0 0 0"
						>
							Harga Per {item?.package}
						</CustomText>
						<FlexRow>
							{item?.price === 0 || item?.price === item?.original_price ? (
								<CustomText fsize={12} fweight={700} color={"#3A3A3C"}>
									{currencyFormat(item?.original_price)}
								</CustomText>
							) : (
								<CustomText
									fsize={12}
									fweight={400}
									color={"#8F90A6"}
									margin="0 5px 0 0"
									tdecorline="line-through"
								>
									{currencyFormat(item?.original_price)}
								</CustomText>
							)}
							{item?.price !== 0 && item?.price !== item?.original_price && (
								<CustomText fsize={12} fweight={700} color={"#FF5C5C"}>
									{currencyFormat?.(item?.price)}
								</CustomText>
							)}
						</FlexRow>
                        <ContainerQty>
                            <BasicBtn
                                style={QtyBtn}
                                onClick={() => onUpdateQty(cartId, item?.id, item?.qty - 1)}
                            >
                                <RemoveIcon sx={{ color: "#61C7B5" }} fontSize="small" />
                            </BasicBtn>
                            <CustomText fsize={12} fweight={400} margin="0 15px">
                                {item?.qty}
                            </CustomText>
                            <BasicBtn
                                style={QtyBtn}
                                onClick={() => onUpdateQty(cartId, item?.id, item?.qty + 1)}
                            >
                                <AddIcon sx={{ color: "#61C7B5" }} fontSize="small" />
                            </BasicBtn>
                        </ContainerQty>
                        <ContainerTrash>
                            <BasicBtn
                                style={DeleteBtn}
                                onClick={() => onDelete(cartId, item?.id)}
                            >
                                <Image
                                    src="/static/icons/trash-icon.svg"
                                    width={14}
                                    height={14}
                                    alt="Remove Icon"
                                />
                            </BasicBtn>
                        </ContainerTrash>
					</CardContentText>
				</CardContent>
			</CardList>
		);
}

export const ProductCart = memo(_ProductCart);