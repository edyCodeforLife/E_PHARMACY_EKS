import type { NextPage } from 'next'
import styles from '../../styles/_styles-web.module.scss';
import { TermsConditionContent } from '../../components/pages-components/termscondition/index';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ICMSService, CMSService } from '../../libs/business/index';

const TermsConditionPage: NextPage = () => {
	const router = useRouter();
	const _CMSService: ICMSService = new CMSService();
	const [dataTermsCondition, setTermsCondition] = useState([]);

	const onBack = () => {
		router.back()
	}

	const getTermsCondition = () => {
		_CMSService?.GetTermsCondition("TERMS_AND_CONDITION_PHARMACY", {
			Success: (res: any) => {
				setTermsCondition(res.data)
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

	useEffect(() => {
		getTermsCondition();
	}, [])


	return (
		<div className={styles.insidebody}>
			<div className={styles.fullscreen}>
				<div className={styles.container}>
					<TermsConditionContent
						onBack={onBack}
						dataTermsCondition={dataTermsCondition}
					/>
				</div>
			</div>
		</div>

	)
}

export default TermsConditionPage
