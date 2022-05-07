import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { CartPageContent } from '../../components/pages-components/cart/index';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CartService, ICartService } from '../../libs/business';
import useRedirectTo from '../../libs/hooks/use-redirectTo';
import { replace } from 'lodash';

const CartPage: NextPage = () => {
	const router = useRouter()
	const _CartService: ICartService = new CartService();
	const [cartList, setCartList] = useState<any>({});
	const [drawer, setDrawer] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState('');
	const [deleteProductId, setDeleteProductId] = useState<any>({});
	const [qtyProductData, setQtyProductData] = useState<any>({});
	const [checkout, checkoutAs] = useRedirectTo(`/checkout/[cartId]`);

	const drawerOpenList = {
		drawerMaxOrder: 'max-order',
		drawerDelete: 'delete-drawer'
	}

	const onBack = () => {
		router.push('/', undefined, {
			shallow: true
		})
	}

	const onAddProduct = () => {
		// if (cartList?.product?.length == 5) {
		// 	setDrawerOpen(drawerOpenList.drawerMaxOrder);
		// 	setDrawer(true);
		// } else {
			router.push('/', undefined, {
				shallow: true
			})
		// }
	}

	const onDelete = (cartId: number, id: string) => {
		setDeleteProductId({ cartId: cartId, productId: id });
		setDrawerOpen(drawerOpenList.drawerDelete);
		setDrawer(true);
	}

	const toggleDrawer = (isOpen: boolean) => (
		event: any
	) => {
		setDrawer(isOpen);
	};

	const onHandleDelete = () => {
		_CartService.DeleteProductFromCart(deleteProductId.cartId, deleteProductId.productId, {
			Success: () => {
				setDrawer(false);
				getCartList();
			}
		})
	}

	const onHandleUpdateQty = (cartId: number, productId: string, qty: number) => {
		if (qty === 0) {
			onDelete(cartId, productId);
		} else {
			_CartService.UpdateQtyProduct(cartId, productId, {qty}, {
				Success: () => {
					getCartList();
				}
			})
		}
	}

	const onPayClick = useCallback((cartId) => {
		router.replace(
			`${checkout}`,
			`${replace(checkoutAs, '[cartId]', cartId)}`,
		);
	}, [checkout, checkoutAs]);

	const getCartList = () => {
		_CartService.GetUserCart({
			Success: (res: any) => {
				setCartList(res.data);
			},
			ValidationError: (data: any) => {
				console.log(data)
			},
			ServerError: (data: any) => {
				console.log(data)
			},
			NotFound: (data: any) => {
				console.log(data)
			}
		})
	}

	useEffect(() => {
		getCartList();
	}, [])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<CartPageContent
						cartData={cartList}
						onBack={onBack}
						drawer={drawer}
						drawerOpen={drawerOpen}
						onHandleDelete={onHandleDelete}
						onDelete={onDelete}
						onAddProduct={onAddProduct}
						onPayClick={onPayClick}
						toggleDrawer={toggleDrawer}
						onUpdateQty={onHandleUpdateQty}
					/>
				</div>
			</div>
		</div>

	)
}

export default CartPage
