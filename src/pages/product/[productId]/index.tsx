import type { NextPage } from 'next'
import { useEffect, useState } from 'react';
import styles from '../../../styles/_styles-web.module.scss';
import { DetailProductContent } from '../../../components/pages-components/detail-product/index';
import { useRouter } from 'next/router'
import { ICMSService, CMSService, ICartService, CartService } from '../../../libs/business/index';
import { IProductList } from '../../../libs/services/CMS/ICMS-service'
import { IGetUserCartData } from '../../../libs/services/cart/icart-service';
import { SnackbarState } from '../../address/insert/[cartId]';

const DetailProduct: NextPage = () => {
	const router = useRouter();
	const { productId } = router.query;
	const product_id = productId as string;
	const _CMSService: ICMSService = new CMSService();
	const _CartService: ICartService = new CartService();
	const [productData, setProductData] = useState<any>();
	const [cartList, setCartList] = useState<IGetUserCartData>();
	const [productExist, setProductExist] = useState(false);
	const [snackbar, setSnackBar] = useState<SnackbarState>({
		open: false,
		vertical: 'top',
		horizontal: 'center',
		message: '',
		severity: "success"
	});
	const { vertical, horizontal, open, message, severity } = snackbar;

	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const handleClose = () => {
		setSnackBar({ ...snackbar, open: false });
	};

	const onAddtoCart = (productId: string, qty: number, original_price: number, price: number) => {
		addtoCart(productId, qty, original_price, price);
	}

	const addtoCart = async (product_id: string, qty: number, original_price: number, price: number) => {
		_CartService.AddToCart({ product_id, qty, original_price, price }, {
			Success: (res: any) => {
				router.push('/cart', undefined, {
					shallow: true
				})
			},
			NotFound: (data: any) => {
				console.log(data)
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			unprocessableEntity: (data: any) => {
				setSnackBar({
					open: true,
					vertical: 'top',
					horizontal: 'right',
					message: data?.error,
					severity: "error"
				});
			}
		})
	}

	const getData = async () => {
		_CMSService.GetProductDetail(product_id, {
			Success: (res: any) => {
				setProductData(res.data);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			}
		});
	}

	// const getCartList = () => {
	// 	_CartService.GetUserCart({
	// 		Success: (res: any) => {
	// 			setCartList(res.data);
	// 		},
	// 		ValidationError: (data: any) => {
	// 			console.log(data)
	// 		},
	// 		ServerError: (data: any) => {
	// 			console.log(data)
	// 		},
	// 		NotFound: (data: any) => {
	// 			console.log(data)
	// 		}
	// 	})
	// }

	// const isProductExist = () => {
	// 	if (cartList?.product instanceof Array) {
	// 		const find = cartList?.product.find((idx: any) => idx.id === productData?.id);
	// 		find ? setProductExist(true) : setProductExist(false);
	// 	}
	// }

	useEffect(() => {
		productId && getData();
	}, [productId]);

	// useEffect(() => {
	// 	getCartList();
	// }, [productData])

	// useEffect(() => {
	// 	cartList && isProductExist();
	// }, [cartList])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<DetailProductContent
						onBack={onBack}
						productData={productData}
						onAddtoCart={onAddtoCart}
						productExist={productExist}
						vertical={vertical}
						horizontal={horizontal}
						open={open}
						message={message}
						handleClose={handleClose}
						severity={severity}
					/>
				</div>
			</div>
		</div>

	)
}

export default DetailProduct
