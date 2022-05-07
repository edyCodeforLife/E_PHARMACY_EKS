import type { NextPage } from 'next'
import styles from '../../../styles/_styles-web.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ReviewPageContent } from '../../../components/pages-components/review';
import { IOrderService, OrderService } from '../../../libs/business/index';

const ReviewPage: NextPage = () => {
	const router = useRouter();
	const { orderId } = router.query;
	const _orderId = orderId as string;
	const _OrderService: IOrderService = new OrderService();
	const [orderData, setOrderData] = useState<any>();
	const [star, setStar] = useState<number>(0);
	const [review, setReview] = useState('');
	const [reviewSuccess, setReviewSuccess] = useState(false);

	const onBack = () => {
		router.back()
	}

	const goToOrderList = () => {
		router.push('/order', undefined, {
			shallow: true
		})
	}

	const onChange = (e: any) => {
		setReview(e.target.value)
	}

	const onPostReview = () => {
		const req = {
			review_stars: star,
			review_note: review
		}

		_OrderService.PostOrderReview(_orderId, req, {
			Success: (res: any) => {
				setReviewSuccess(true);
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

	const getOrderDetail = () => {
		if (_orderId === undefined) return;
		_OrderService.GetOrderById(_orderId, {
			Success: (res: any) => {
				setOrderData(res?.data);
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
		getOrderDetail();
	}, [_orderId])

	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<ReviewPageContent
						onBack={onBack}
						orderData={orderData}
						star={star}
						setStar={setStar}
						review={review}
						onChange={onChange}
						onPostReview={onPostReview}
						reviewSuccess={reviewSuccess}
						goToOrderList={goToOrderList}
					/>
				</div>
			</div>
		</div>

	)
}

export default ReviewPage
