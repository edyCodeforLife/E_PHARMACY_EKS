import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader,
    CustomFooter
} from '../../atoms/custom-element';
import { HeaderText } from '../homepage/index';
import { CustomText } from '../../atoms/typography';
import { Flex, FlexRow, FlexRowCenter, FlexOne, FlexOneCustom } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { InfoLabel } from '../../atoms/info';
import { BasicBtn } from '../../atoms/button';
import { CustomFlexRow } from '../detail-product';
import { DrawerMaxOrder } from '../../atoms/drawer-max-order';
import { DrawerDelete } from '../../atoms/drawer-delete';
import { IGetUserCartData, IProduct } from '../../../libs/services/cart/icart-service';
import { ProductCart } from '../../atoms/product-cart';
import { currencyFormat } from '../../../libs/function';
import { SwipeDrawerMaterial } from '../../atoms/swipe-drawer';

export interface ICartPageContentProps {
    cartData: any;
    onBack(): void;
    drawer: boolean;
    drawerOpen: string;
    onHandleDelete(): void;
    onAddProduct(): void;
    onDelete(cartId: number, productId: string): void;
    onUpdateQty(cartId: number, productId: string, qty: number): void;
    onPayClick(cartId: number): void;
    toggleDrawer(isOpen: boolean): any;
}

type IpropsCustomFlex = {
    loading?: number
}

type IPropsContainerListContent = {
    padding?: string;
    margin?: string;
}

const ContainerInside = styled(FlexOne)`
    margin-top: 60px;
    height: calc(100vh - 180px);
    box-sizing: border-box;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: scroll;
    width: 100%;
    // padding: 5px 20px;
    @media (max-width: 768px) {
        height: calc(100vh - 120px);
    };
`;

const ContainerListContent = styled(Flex) <IPropsContainerListContent>`
	padding: ${(props) => props.padding};
    margin: ${(props) => props.margin};
	width: 100%;
`

export const TextNotFound = styled(FlexRowCenter)`
	color: #61C7B5;
	text-align: center;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 16px;
`;

export const CustomFlexRowCenter = styled(FlexRowCenter) <IpropsCustomFlex>`
	position: relative;
	margin-top: ${props => props.loading ? 15 : 0}px;
    padding-top: 10px;
`;

export const HeaderRegister = styled.div`
	background: #FFFFFF;
	box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.12);
	min-height: 40px;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	padding: 5px 10px;
`;

const CustomBtnAdd = {
    fontSize: 12,
    fontWeight: 700,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: '10px',
    height: '40px',
    color: '#61C7B5',
    border: `1px solid #61C7B5`,
    borderRadius: 8,
}

const CustomBtnAddDisabled = {
    fontSize: 12,
    fontWeight: 700,
    paddingTop: 13,
    paddingBottom: 13,
    marginTop: '10px',
    height: '40px',
    color: '#FFFFFF',
    backgroundColor: '#C7C9D9',
    borderRadius: 8,
}

const CustomBtnPay = {
    fontSize: 14,
    fontWeight: 500,
    padding: '12px 35px',
    color: 'white',
    backgroundColor: '#61C7B5',
    borderRadius: 20,
}

const CartNotFound = styled.div`
    margin: 50% 0 20px 0;
`;

const ContainerFull = styled.div`
    width: 100%;
    text-align: center;
`;

function _cartPageContent(props: ICartPageContentProps) {
    const { cartData, onBack, drawer, drawerOpen, onAddProduct, onHandleDelete, onDelete, onPayClick, toggleDrawer, onUpdateQty } = props;

    return (
			<Fragment>
				<CustomContainerGeneral>
					<InsideContainer>
						<CustomFlex>
							<ContentContainer>
								<GeneralCard variant="outlined">
									<ContainerCardContent>
										<CustomFlexRow>
											<CustomHeader>
												<FlexOneCustom
													cursor={"pointer"}
													flex={"25% 0 0"}
													onClick={() => onBack()}
												>
													<ArrowBackIosNewIcon sx={{ color: "#2C528B" }} />
												</FlexOneCustom>
												<FlexOneCustom flex={"50% 0 0"}>
													<HeaderText>Keranjang</HeaderText>
												</FlexOneCustom>
											</CustomHeader>

											<ContainerInside>
												<ContainerListContent padding="10px 15px">
													{cartData?.product?.length > 0 ? (
														<Fragment>
															{/* <InfoLabel
																background={"#D6EDF6"}
																color={"#2C528B"}
																fontSize={12}
																fontWeight={500}
																justifyContent={"flex-start"}
																padding={"25px 20px"}
																radius={8}
															>
																<CustomText talign="center">
																	Saat ini obat hanya bisa dipesan 1 buah untuk
																	setiap obat, Maksimal 5 obat untuk setiap
																	transaksi
																</CustomText>
															</InfoLabel> */}

															<ContainerListContent margin="10px 0">
																{cartData?.product?.map(
																	(item: IProduct, idx: number) => (
																		<ProductCart
																			key={idx}
																			item={item}
																			cartId={cartData.cart_id}
																			onDelete={onDelete}
                                                                            onUpdateQty={onUpdateQty}
																		/>
																	)
																)}

																<BasicBtn
																	style={
																		CustomBtnAdd
																	}
																	onClick={onAddProduct}
																>
																	+ Tambah Produk
																</BasicBtn>
															</ContainerListContent>
														</Fragment>
													) : (
														<CartNotFound>
															<CustomText
																fsize={16}
																fweight={700}
																color="#6B7588"
																margin="0 0 20px 0"
																talign="center"
															>
																Keranjang Kosong
															</CustomText>
															<ContainerFull>
																<Image
																	src="/static/icons/empty-cart-icon.svg"
																	alt="Empty Cart icon"
																	width={100}
																	height={100}
																/>
															</ContainerFull>

															<CustomText
																fsize={14}
																talign="center"
																fweight={400}
																color="#8F90A6"
																margin="10px 0 48px 0"
															>
																Keranjang obat masih kosong, silakan cari obat
																dan vitamin sesuai kebutuhan Anda
															</CustomText>
															<ContainerFull>
																<BasicBtn
																	style={CustomBtnPay}
																	onClick={onAddProduct}
																>
																	Beli Obat Sekarang
																</BasicBtn>
															</ContainerFull>
														</CartNotFound>
													)}
												</ContainerListContent>
											</ContainerInside>

											<SwipeDrawerMaterial
												openDrawer={drawer}
												toggleDrawer={toggleDrawer}
												anchor={"bottom"}
												bgcolor={"#fff"}
												bordertopleft={20}
												bordertopright={20}
												padding={"10px"}
												drawerheight={"180px"}
											>
												<CustomText
													fsize={14}
													fweight={600}
													talign="center"
													padding="16px 0"
												>
													{drawerOpen == "max-order"
														? "Melebihi Batas Pemesanan"
														: "Hapus Produk"}
												</CustomText>
												{drawerOpen == "max-order" ? (
													<DrawerMaxOrder
														onHandleClose={toggleDrawer(false)}
														text="Pemesanan obat hanya dapat dilakukan sesuai batas jumlah pembelian"
													/>
												) : (
													<DrawerDelete
														onHandleClose={toggleDrawer(false)}
														onHandleDelete={() => {
															onHandleDelete();
														}}
													/>
												)}
											</SwipeDrawerMaterial>

											{cartData?.product?.length > 0 && (
												<CustomFooter jcontent="space-between">
													<Flex>
														<CustomText
															fsize={10}
															fweight={400}
															color="#6B7588"
															talign="left"
														>
															Total Pembayaran
														</CustomText>
														<CustomText
															fsize={16}
															fweight={700}
															color="#3A3A3C"
															talign="left"
														>
															{currencyFormat?.(cartData.total_payment)}
														</CustomText>
													</Flex>

													<BasicBtn
														style={CustomBtnPay}
														onClick={() => onPayClick(cartData?.cart_id)}
													>
														Bayar
													</BasicBtn>
												</CustomFooter>
											)}
										</CustomFlexRow>
									</ContainerCardContent>
								</GeneralCard>
							</ContentContainer>
						</CustomFlex>
					</InsideContainer>
				</CustomContainerGeneral>
			</Fragment>
		);
}

export const CartPageContent = memo(_cartPageContent);
