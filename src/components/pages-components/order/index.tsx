import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Image from 'next/image';
import Flex, { FlexRow } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { FlexOneCustom, FlexRowCenter } from '../../atoms/flex';
import { ImageLogo } from '../../atoms/image';
import { LabelText } from '../../atoms/typography';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { SwipeDrawerMaterial } from '../../atoms/swipe-drawer';
import { Spinner } from '../../atoms/spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import { BtnWhatsapp, ContainerCustomerService } from '../homepage/index';
import { OrderCard } from '../../organism/order-card';
import { map } from 'lodash';
import { BasicBtn } from '../../atoms/button';
import { IOrderListData } from '../../../libs/services/order/IOrder-service';

export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export interface IpropsSectionCheckout {
	jcontent: string;
}

export interface IFilterBoxProps {
	isActive: boolean;
}

export interface IOrderProps {
	onBack(): void;
	onAddProduct(): void;
	gotoWA(e: any): void;
	customerService: any;
	hasMore: boolean;
	orderList: IOrderListData[]
	updateOrder(): void;
	handleClickBox(ref_code: string, orderStatus: string, orderId: number): void;
	activeFilterStatus: string;
	handleClickFilter(item: string, idx: number): void;
	notHaveOrder: boolean;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

export const ContainerSpinner = styled(FlexRowCenter)`
	width: inherit;
	height: 100%;
`;

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 120px);
	box-sizing: border-box;
	align-items: flex-start;
	justify-content: flex-start;
	overflow: scroll;
	width: 100% !important;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;

export const ContainerFilterBox = styled(FlexRow)`
	width: 100%;
	justify-content: space-between;
	padding: 10px 14px;
	box-sizing: border-box;
`;

export const ContainerFlexRow = styled(FlexRow)`
	padding: 15px;
	width: 100%;
	box-sizing: border-box;
`;

export const ContainerImg = styled.div`
	text-align: right;
`;

const ContainerOrderBox = styled(Flex)`
	box-sizing: border-box;
	justify-content: flex-start;
	padding: 10px;
	width: 100%;
`;

const FilterBox = styled.div<IFilterBoxProps>`
	border: 1px solid #61C7B5;
	box-sizing: border-box;
	color: ${(props) => props.isActive ? '#fff' : '#8F90A6'};
	border-radius: 15px;
	padding: 4px 15px;
	margin: 0px 2px;
	font-size: 14px;
	min-width: 21%;
	text-align: center;
	cursor: pointer;
	background-color: ${(props) => props.isActive ? '#61C7B5' : '#fff'};
`;

const OrderNotFound = styled.div`
    margin: 35% 0 20px 0;
	width: 100%;
`;

const ContainerFull = styled.div`
    width: 100%;
    text-align: center;
`;


const CustomBtnPay = {
	fontSize: 14,
	fontWeight: 500,
	padding: '12px 35px',
	color: 'white',
	backgroundColor: '#61C7B5',
	borderRadius: 20,
}

function _OrderPageContent(props: IOrderProps) {
	const {
		onBack,
		onAddProduct,
		gotoWA,
		customerService,
		hasMore,
		orderList,
		updateOrder,
		handleClickBox,
		activeFilterStatus,
		handleClickFilter,
		notHaveOrder
	} = props;
	const filterBoxArr = ["Aktif", "Pesanan Selesai", "Dibatalkan"];

	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

	const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setOpenDrawer(isOpen);
	};

	const renderNotHaveOrder = () => {
		return (
			<OrderNotFound>
				<LabelText
					fsize={16}
					fweight={700}
					color="#6B7588"
					margin='0 0 20px 0'
					talign='center'>
					Belum Ada Pesanan
				</LabelText>
				<ContainerFull>
					<Image
						src="/static/icons/empty-cart-icon.svg"
						alt="Empty Order icon"
						width={100}
						height={100}
					/>
				</ContainerFull>

				<LabelText
					fsize={14}
					talign='center'
					fweight={400}
					color="#8F90A6"
					margin='10px 10px 48px 10px'
					wspace="pre-line"
				>
					Silakan cari obat dan vitamin sesuai kebutuhan Anda
				</LabelText>
				<ContainerFull>
					<BasicBtn style={CustomBtnPay} onClick={() => onAddProduct()}>
						Cari Obat Sekarang
					</BasicBtn>
				</ContainerFull>
			</OrderNotFound>
		)
	}


	return (
		<Fragment>
			<CustomContainerGeneral>
				<InsideContainer>
					<CustomFlex>
						<ContentContainer>
							<GeneralCard variant="outlined">
								<ContainerCardContent>
									<FlexRowCustomize alignItems={"flex-start"}>
										<CustomHeader>
											<FlexOneCustom
												cursor={"pointer"}
												flex={"25% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"50% 0 0"}>
												<HeaderText>
													Pesanan Saya
												</HeaderText>
											</FlexOneCustom>
											<FlexOneCustom onClick={toggleDrawer(true)} cursor={"pointer"} flex={"25% 0 0"}>
												<ContainerImg>
													<ImageLogo
														src="/static/icons/CS_Pharmacy.svg"
														alt="cs_icon"
														width={25}
														height={25}
													/>
												</ContainerImg>

											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside id="scrollableDiv">
										<ContainerFilterBox>
											{map(filterBoxArr, (item, idx) => (
												<FilterBox
													isActive={activeFilterStatus === item}
													onClick={() => handleClickFilter(item, idx)}
													key={idx}
												>
													{item}
												</FilterBox>
											))}
										</ContainerFilterBox>
										{notHaveOrder ? (
											renderNotHaveOrder()
										) : (
											<InfiniteScroll
												style={{ width: '100%' }}
												dataLength={orderList.length}
												hasMore={hasMore || true}
												scrollableTarget="scrollableDiv"
												loader={hasMore ?
													<ContainerSpinner>
														<Spinner />
													</ContainerSpinner>
													: null
												}
												next={() => { updateOrder(); }}
											>
												{map(orderList, (item, idx) => (
													<ContainerOrderBox
														key={idx}
													>
														<OrderCard
															id={`box_order_${idx}`}
															item={item}
															isNormalBox
															handleClickBox={handleClickBox}
														/>
													</ContainerOrderBox>
												))}

												{!hasMore && (
													<FlexRowCenter style={{ width: '100%' }}>
														<LabelText
															color={"#6B7588"}
															talign={"center"}
															margin={"10px 0px"}
															wspace={"pre-line"}
														>
															Tidak ada order lagi yang dapat ditampilkan
														</LabelText>
													</FlexRowCenter>
												)}

											</InfiniteScroll>
										)}

									</ContainerInside>
									<SwipeDrawerMaterial
										openDrawer={openDrawer}
										toggleDrawer={toggleDrawer}
										anchor={"bottom"}
										bgcolor={"#fff"}
										bordertopleft={20}
										bordertopright={20}
										padding={"10px"}
										drawerheight={"120px"}

									>
										<FlexRowCenter>
											<LabelText
												color={"#2C528B"}
												fsize={18}
												fweight={600}
											>
												Hubungi Call Center
											</LabelText>
										</FlexRowCenter>
										<ContainerCustomerService>
											<ImageLogo
												src={"/static/icons/CS_Pharmacy.svg"}
												height={40}
												width={40}
											/>
											<Flex>
												<LabelText
													style={{ width: "100%", wordBreak: 'break-all' }}
													wspace={"pre-line"}
													color={"#2C528B"}
													fsize={12}
													margin={"0px 10px"}
												>
													Hubungi via Whatsapp
												</LabelText>

												<LabelText
													style={{ width: "100%", wordBreak: 'break-all' }}
													wspace={"pre-line"}
													color={"#2C528B"}
													fsize={12}
													margin={"0px 10px"}
												>
													{customerService?.[0]?.content.phone}
												</LabelText>
											</Flex>

											<BtnWhatsapp
												onClick={(e) => { gotoWA(e) }}
												bColor={"#61C7B5"}
											>
												<WhatsAppIcon sx={{ color: '#fff' }} />
												<LabelText
													margin={"0px 4px"}
												>
													Kirim Pesan
												</LabelText>
											</BtnWhatsapp>
										</ContainerCustomerService>
									</SwipeDrawerMaterial>
								</ContainerCardContent>
							</GeneralCard>
						</ContentContainer>
					</CustomFlex>
				</InsideContainer>
			</CustomContainerGeneral>
		</Fragment>
	)
}

export const OrderPageContent = memo(_OrderPageContent);