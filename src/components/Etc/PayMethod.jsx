import { useState } from 'react';
import styled from 'styled-components';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Link, useNavigate } from 'react-router-dom';
import { LightPurpleButton } from '../Buttons/PurpleButton';
import PayPageContainer from './PayPageContainer';
import Kakao from '../../assets/images/social/kakao.png';
import AddressModal from '../Modals/AddressModal';
import constants from './Constants';
import axiosInstance from '../../utils/axiosInstance';

export default function PayMethod({ payData }) {
	const [url, setUrl] = useState('');
	const [isPayModal, setPayModal] = useState(false);
	const navigate = useNavigate();

	const { expectPrice, orderId, itemOrders, subscription } = payData;
	const clientKey = import.meta.env.VITE_TOSS_CLIENT_API_KEY;

	const tossPay = async () => {
		const tossPayments = await loadTossPayments(clientKey);
		try {
			const paySuccess = await tossPayments.requestPayment('카드', {
				amount: `${expectPrice}`,
				orderId: `${orderId}abcdef`,
				orderName: `${itemOrders.data[0].item.title}, ${itemOrders.data.length} 건`,
				customerName: 'Pillivery',
			});
			if (paySuccess?.paymentKey) {
				const res = await axiosInstance.get('/payments/general/success', {
					params: {
						orderId: paySuccess.orderId,
						paymentKey: paySuccess.paymentKey,
						amount: paySuccess.amount,
					},
				});

				if (res.data.status === '200') {
					alert('구매해주셔서 감사합니다!');
					navigate('/mypage/order/normal');
				}
			} else {
				console.log(paySuccess);
				alert('결제 실패. 관리자에게 문의해주세요');
			}
		} catch (error) {
			console.error(error);
		}
		return 'finish';
	};

	const kakaoClick = async () => {
		try {
			const { data } = await axiosInstance.get(
				`/payments/kakao-pay?orderId=${orderId}`,
			);
			setUrl(data.next_redirect_pc_url);
			setPayModal(true);
		} catch (error) {
			console.error(error);
			alert('카카오 결제 오류!');
		}
	};

	return (
		<PayPageContainer Info="결제 수단">
			<ButtonBox className={subscription ? 'sub' : null}>
				{!subscription && (
					<LightPurpleButton
						width="220px"
						height="50px"
						onClick={tossPay}
						borderRadius="6px"
						fontSize="16px"
						fontWeight="regular"
					>
						카드 결제
					</LightPurpleButton>
				)}
				<KakaoPayButton onClick={kakaoClick}>
					<KakaoPayImg />
					카카오페이
				</KakaoPayButton>
			</ButtonBox>
			<ClauseContainer>
				<Clauses>{constants.firstPayClause}</Clauses>
				<Clauses>{constants.secondPayClause}</Clauses>
			</ClauseContainer>
			{isPayModal && (
				<AddressModal setIsOpen={setPayModal} modalIsOpen={isPayModal}>
					<PayFrame src={url} title="결제창" />
					<GobackButton onClick={() => window.history.back()}>
						전 페이지로 돌아가기
					</GobackButton>
					<Link
						to={
							subscription
								? '/mypage/order/subscription'
								: '/mypage/order/normal'
						}
					>
						<LightPurpleButton width="150px" height="40px" fontSize="13px">
							주문내역 보러가기
						</LightPurpleButton>
					</Link>
				</AddressModal>
			)}
		</PayPageContainer>
	);
}

const ButtonBox = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 110px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 44px;
	&.sub {
		justify-content: center;
	}
`;

const KakaoPayButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: #ffeb00;
	width: 220px;
	height: 50px;
	border-radius: 6px;
	border: none;
	font-size: 16px;
	font-weight: var(--regular);
	color: rgba(0, 0, 0 0.85);
	cursor: pointer;
	padding-right: 15px;
	transition: 0.3s all;
	&:hover {
		font-weight: var(--bold);
		background-color: #ffdb0d;
	}
`;
const KakaoPayImg = styled.img.attrs({
	src: Kakao,
})`
	height: 40px;
	width: 40px;
	padding: 9px 7px 7px 8px;
`;
const ClauseContainer = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 44px;
`;

const Clauses = styled.p`
	color: var(--gray-300);
	font-size: 11px;
	line-height: 13px;
`;

const PayFrame = styled.iframe`
	width: 300px;
	height: 500px;
`;

const GobackButton = styled.button`
	margin-bottom: 8px;
	margin-top: 20px;
	width: 150px;
	height: 40px;
	border: 0.5px solid var(--gray-300);
	border-radius: 6px;
	box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.05);
	background-color: white;
	text-align: center;
	cursor: pointer;
	transition: 0.5s ease;
	&:hover {
		border: 0.5px solid var(--gray-200);
		background-color: var(--gray-100);
	}
`;
