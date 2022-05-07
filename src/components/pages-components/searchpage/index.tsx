import { memo, Fragment } from 'react';
import styled from '@emotion/styled';
import {
    CustomContainerGeneral,
    InsideContainer,
    CustomFlex,
    ContentContainer,
    CustomHeader
} from '../../atoms/custom-element';
import { SearchSection } from '../../molecules/search-section';
import { HeaderText, FlexRowCustomize } from '../homepage/index';
import { Flex, FlexRowCenter, FlexRow, FlexOne, FlexOneCustom } from '../../atoms/flex';
import { ContainerDetail } from '../detail-product';
import { GeneralCard, ContainerCardContent } from '../../atoms/card';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IProductList } from '../../../libs/services/CMS/ICMS-service';
import { ProductSearchList } from '../../atoms/product-list-search';
import BasicSkeleton from '../../atoms/skeleton';
import { CustomText } from '../../atoms/typography';

type ISearchPageContentProps = {
    onSearchChange(e: any): void;
    searchData: any;
    loadingSearch: boolean;
    onBack(): void;
    searchQuery: string;
    gotoDetail(productId: string): void;
    cartCount: number;
    redirectToCart(): void;
}

type IpropsCustomFlex = {
    loading?: number
}

const ContainerSearch = ContainerDetail;

const ContainerInside = styled(FlexOne)`
	margin-top: 60px;
	height: calc(100vh - 180px);
	box-sizing: border-box;
	@media (max-width: 768px) {
		height: calc(100vh - 70px);
	};
`;

const ContainerListContent = styled(Flex)`
	padding: 5px 20px;
`

export const TextNotFound = styled(FlexRowCenter)`
	color: #61C7B5;
	text-align: center;
	align-items: center;
	font-style: normal;
	font-weight: bold;
	font-size: 14px;
    margin: 40px 0;
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

const TextLableQuery = styled(FlexRow)`
    font-size: 10px;
    font-weight: 400;
    color: #3E8CB9;
    opacity: 0.9;
`

const ResultLableQuery = styled.q`
    padding-left: 3px;
    font-weight: 700;
    opacity: 1;
    &:after {
        content: "”";
    }
    &:before {
        content: "“";
    }
`

const SkeletonContainer = styled.div`
    display: flex;
    width: 100%;
    padding: 10px;
`

const InsideSkeleton = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    margin: 0 10px;
    justify-content: space-evenly;
`

function _searchPageContent(props: ISearchPageContentProps) {
    const {
        onSearchChange,
        searchData,
        loadingSearch,
        onBack,
        searchQuery,
        gotoDetail,
        cartCount,
        redirectToCart,
    } = props;

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
                                                    Pencarian
                                            </HeaderText>
                                            </FlexOneCustom>
                                        </CustomHeader>

                                        <ContainerInside>
                                            <ContainerSearch>
                                                <SearchSection
                                                    isActiveClick={false}
                                                    onSearchChange={onSearchChange}
                                                    cartCount={cartCount}
                                                    redirectToCart={redirectToCart}
                                                    onKeyPress={(e: any) => { e.key === "Enter" && e.preventDefault() }}
                                                />
                                                <ContainerListContent>
                                                    {searchQuery.length >= 3 ? (
                                                        loadingSearch ? (
                                                            <SkeletonContainer>
                                                                <BasicSkeleton variant="rectangular" animation="wave" width="150px" height={80} />
                                                                <InsideSkeleton>
                                                                    <BasicSkeleton variant="text" animation="wave" width="80%" height={10} />
                                                                    <BasicSkeleton variant="text" animation="wave" width="80%" height={10} />
                                                                    <BasicSkeleton variant="text" animation="wave" width="80%" height={10} />
                                                                </InsideSkeleton>
                                                            </SkeletonContainer>
                                                        ) : (
                                                            searchData?.length > 0 ? (
                                                                <div>
                                                                    <TextLableQuery>
                                                                        <p>Menampilkan 1-{searchData.length} Obat untuk</p> <ResultLableQuery>{searchQuery}</ResultLableQuery>
                                                                    </TextLableQuery>
                                                                    {searchData.map((item: IProductList, idx: number) => (
                                                                        <ProductSearchList
                                                                            key={`product No=${idx}`}
                                                                            minheight={"158px"}
                                                                            item={item}
                                                                            imageHeight={70}
                                                                            imageWidth={"70px"}
                                                                            gotoDetail={gotoDetail}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <TextNotFound>Obat tidak ada dalam pencarian</TextNotFound>
                                                            )
                                                        )
                                                    ) : (
                                                        searchQuery.length < 3 && searchQuery.length !== 0 ? (
                                                            <TextNotFound>Minimal 3 suku Kata</TextNotFound>
                                                        ) : (
                                                            <CustomText fsize={12} talign="center" fweight={400} margin='15px 0' padding='0 20px' color="#C7C9D9">Silakan lakukan pencarian berdasarkan resep dokter atau keluhan</CustomText>
                                                        )
                                                    )}
                                                </ContainerListContent>
                                            </ContainerSearch>

                                        </ContainerInside>

                                    </FlexRowCustomize>
                                </ContainerCardContent>
                            </GeneralCard>
                        </ContentContainer>
                    </CustomFlex>
                </InsideContainer>
            </CustomContainerGeneral>
        </Fragment>
    )
}

export const SearchPageContent = memo(_searchPageContent);
