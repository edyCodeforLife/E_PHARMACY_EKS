import type { NextPage } from 'next'
import { useEffect, useState, useCallback } from "react";
import styles from '../../styles/_styles-web.module.scss';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';
import useRedirectTo from '../../libs/hooks/use-redirectTo';
import { replace } from 'lodash';
import { ICMSService, CMSService, ICartService, CartService } from '../../libs/business/index';
import { SearchPageContent } from '../../components/pages-components/searchpage/index';

const SearchPage: NextPage = () => {
	const router = useRouter();
	const _CMSService: ICMSService = new CMSService();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchData, setSearchData] = useState([]);
	const _CartService: ICartService = new CartService();
	const [count, setCount] = useState(0);
	const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
	const [productDetail, productDetailAs] = useRedirectTo(`/product/[productId]`);

	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const redirectToCart = () => {
		router.push('/cart', undefined, {
			shallow: true
		})
	}

	const getCartCounter = () => {
		_CartService.GetCartCount({
			Success: (res: any) => {
				setCount(res.data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
			}
		})
	}

	const getGeneralSearch = (query: string) => {
		setLoadingSearch(true);
		_CMSService.GeneralSearch(query, {
			Success: (res: any) => {
				setLoadingSearch(false);
				setSearchData(res?.data);
			},
			NotFound: (res: any) => {
				setLoadingSearch(false);
			}
		})
	}

	const onSearchChange = useCallback(debounce((e: any) => {
		e.preventDefault();
		const { value } = e.target;
		setSearchQuery(value);
	}, 500), []);

	useEffect(() => {
		getCartCounter();
	}, []);

	useEffect(() => {
		searchQuery.length >= 3 ? getGeneralSearch(searchQuery) : setSearchData([])
	}, [searchQuery]);

	const gotoDetail = useCallback((productId: string) => {
		router.replace(
			`${productDetail}`,
			`${replace(productDetailAs, '[productId]', productId)}`,
		);
	}, [productDetail, productDetailAs]);

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<SearchPageContent
						onBack={onBack}
						onSearchChange={onSearchChange}
						searchData={searchData}
						loadingSearch={loadingSearch}
						searchQuery={searchQuery}
						gotoDetail={gotoDetail}
						cartCount={count}
						redirectToCart={redirectToCart}
					/>
				</div>
			</div>
		</div>

	)
}

export default SearchPage
