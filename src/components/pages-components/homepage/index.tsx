import { memo, Fragment, useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import {
	CustomContainerGeneral,
	InsideContainer,
	CustomFlex,
	ContentContainer,
	CustomHeader
} from '../../../components/atoms/custom-element';
import Flex, { FlexCenter, FlexRow, FlexRowCenter } from '../../atoms/flex';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { CustomFlexRowCenter } from '../../../components/atoms/flex';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { SearchSection } from '../../molecules/search-section';
import { FlexOneCustom, FlexRowSpaceBetween } from '../../atoms/flex';
import { LabelText } from '../../atoms/typography';
import { InfoLabel } from '../../atoms/info';
import { BannerComponent } from '../../atoms/banner';
import { IBannerData, IProductList } from '../../../libs/services/CMS/ICMS-service';
import { ProductCard } from '../../atoms/product-card';
import Grid from '@mui/material/Grid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Spinner } from '../../atoms/spinner';
import { SwipeDrawerMaterial } from '../../atoms/swipe-drawer';
import { LogoImage } from '../../atoms/image';
import { BasicBtn } from '../../atoms/button';

export interface IHomePageContentProps {
	onBack(): void;
	handleClick(): void;
	bannerData: IBannerData[];
	productList: IProductList[];
	gotoDetail(productId: string): void;
	updateProduct(): void;
	hasMore: boolean;
	cartCount: number;
	redirecTo(url_web: string): void;
	scrollTop(): void;
	redirectToCart(): void;
	redirectToOrder(): void;
	page: number;
	contactPharmacy: any;
	gotoWA(e: any): void;
}

export interface CustomFlexRowCenterProps {
	alignItems: string;
}

export const HeaderText = styled.div`
	color: #3868B0;
	font-weight: 600;
	font-size: 18px;
`;

export const ContainerImg = styled.div`
	text-align: right;
`;

export const ContainerSlider = styled.div`
	display: flex;
	margin-top: 20px;
	flex-direction: column;
	width: 100%;
`;

const ContainerInside = styled(Flex)`
	margin-top: 60px;
	height: calc(100vh - 142px);
	box-sizing: border-box;
	align-items: center;
	justify-content: flex-start;
	overflow: scroll;
	width: 100%;
	// padding: 5px 20px;
	@media (max-width: 768px) {
		height: calc(100vh - 60px);
	};
`;

export const FlexRowCustomize = styled(CustomFlexRowCenter) <CustomFlexRowCenterProps>`
	align-items: ${props => props.alignItems}
`;

export const SectionOrder = styled(FlexRowSpaceBetween)`
	padding: 10px 15px;
	width: 100%;
`;

export const ContainerProduct = styled(Grid)`
	width: 100%;
	box-sizing: border-box;
	margin-left: 0px;
	margin-top: 0px;
`;

export const ContainerSpinner = styled(FlexRowCenter)`
	width: inherit;
	height: 100%;
`;

const ContainerIconArrowTop = styled(FlexRow)`
	position: absolute;
	bottom: 7%;
	right: 5%;
	cursor: pointer;
	z-index: 999;
`;

export const BackToTopContainer = styled.div`
	border-radius: 50%;
	padding:9px 12px;
	background-color: #61C7B5;
`;

export const ContainerCustomerService = styled(FlexRow)`
	margin: 15px 0px;
	justify-content: space-around;
`;

export const BtnWhatsapp = styled(BasicBtn)`
	border-radius: 6px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	padding: 8px;
	color: #fff;
`;

function _HomepageContent(props: IHomePageContentProps) {
	const {
		cartCount,
		redirecTo,
		redirectToCart,
		scrollTop,
		onBack,
		handleClick,
		bannerData,
		productList,
		gotoDetail,
		updateProduct,
		hasMore,
		page,
		contactPharmacy,
		gotoWA,
		redirectToOrder
	} = props;

	const [openDrawer, setOpenDrawer] = useState<boolean>(false);

	const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setOpenDrawer(isOpen);
	};

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
												textAlign={"left"}
												flex={"25% 0 0"}
												onClick={() => onBack()}
											>
												<ArrowBackIosNewIcon sx={{ color: '#2C528B' }} />
											</FlexOneCustom>
											<FlexOneCustom flex={"50% 0 0"}>
												<HeaderText>
													Beli Obat
												</HeaderText>
											</FlexOneCustom>
											<FlexOneCustom onClick={toggleDrawer(true)} cursor={"pointer"} flex={"25% 0 0"}>
												<ContainerImg>
													<Image
														src="/static/images/whatsapp_icon.svg"
														alt="Whatsapp icon"
														width={25}
														height={25}
													/>
												</ContainerImg>

											</FlexOneCustom>
										</CustomHeader>
									</FlexRowCustomize>
									<ContainerInside id="scrollableDiv">
										<SectionOrder>
											<FlexRow>
												<Image
													src="/static/icons/Receipt.svg"
													alt="Receipt icon"
													width={20}
													height={20}
												/>
												<LabelText
													fsize={14}
													fweight={600}
													color={"#3E8CB9"}
													margin={"0px 5px"}
												>
													Pesanan Saya
												</LabelText>
											</FlexRow>

											<FlexRow style={{ cursor: 'pointer' }} onClick={() => redirectToOrder()}>
												<LabelText
													fsize={14}
													fweight={600}
													color={"#61C7B5"}
													margin={"0px 5px"}
												>
													Lihat Pesanan
												</LabelText>
												<ArrowForwardIosIcon sx={{ color: '#3E8CB9', fontSize: 14 }} />
											</FlexRow>
										</SectionOrder>

										<SearchSection
											cartCount={cartCount}
											isActiveClick
											handleClick={handleClick}
											redirectToCart={redirectToCart}
										/>

										<BannerComponent
											bannerHeight={86}
											bannerWidth={bannerData.length === 1 ? "100%" : "88%"}
											centerPadding={"0px"}
											bannerData={bannerData}
											redirecTo={redirecTo}
											bradius={"15px"}
											mtop={bannerData.length === 1 ? 12 : 20}

										/>

										<InfoLabel
											background={"#D6EDF6"}
											color={"#2C528B"}
											fontSize={10}
											fontWeight={500}
											justifyContent={"center"}
											padding={"15px"}
											talign={"center"}
										>
											Obat akan dikirim dari instalasi farmasi Rumah Sakit Mitra Keluarga
										</InfoLabel>


										<InfiniteScroll
											style={{ width: '100%' }}
											dataLength={productList.length}
											hasMore={hasMore || true}
											scrollableTarget="scrollableDiv"
											loader={hasMore ?
												<ContainerSpinner>
													<Spinner />
												</ContainerSpinner>
												: null
											}
											next={() => { updateProduct(); }}
										>
											<ContainerProduct container spacing={2}>
												{productList.map((item: IProductList, idx: number) => (
													<ProductCard
														key={`product No=${idx}`}
														minheight={"158px"}
														item={item}
														imageHeight={80}
														imageWidth={"80px"}
														gotoDetail={gotoDetail}
													/>
												))}
												{!hasMore && (
													<FlexRowCenter style={{ width: '100%' }}>
														<LabelText
															color={"#6B7588"}
															talign={"center"}
															margin={"10px 0px"}
															wspace={"pre-line"}
														>
															Tidak ada obat lagi yang dapat ditampilkan
														</LabelText>
													</FlexRowCenter>
												)}

												{page > 1 && (
													<ContainerIconArrowTop onClick={() => { scrollTop() }}>
														<BackToTopContainer>
															<ArrowUpwardIcon sx={{ color: '#fff' }} />
														</BackToTopContainer>
													</ContainerIconArrowTop>
												)}
											</ContainerProduct>
										</InfiniteScroll>
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
												Hubungi Admin Farmasi
											</LabelText>
										</FlexRowCenter>
										<ContainerCustomerService>
											<LogoImage
												src={"/static/icons/CS_Pharmacy.svg"}
												height={40}
												width={"40px"}
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
													{contactPharmacy?.[0]?.content.phone}
												</LabelText>
											</Flex>

											<BtnWhatsapp
												data-action="share/whatsapp/share"
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
		</Fragment >
	)
}

export const HomepageContent = memo(_HomepageContent);