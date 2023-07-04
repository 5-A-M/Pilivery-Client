import styled from 'styled-components';
import { Logo } from '../../assets/Icons';

function Footer() {
	return (
		<FooterContainer>
			<Wrap>
				<Top>
					<Title as="a" href="#">
						서비스 소개
					</Title>
					<Title as="a" href="#">
						Figma
					</Title>
				</Top>
				<Body>
					<BoxLeft>
						<Text>젠킨스 배포 테스트 115</Text>
						<Text>
							사업자 번호: 123-45-678900 , 통신판매업신고번호:
							2022-서울강남-123456
						</Text>
						<Text>고객센터: 1234-1234</Text>
						<Text>E-mail: pillivery@pillivery.com</Text>
						<Copyright>© Copyright ⓒ 2023 Pillivery</Copyright>
					</BoxLeft>
					<BoxRight>
						<Logo />
						<Pil>Pillivery</Pil>
					</BoxRight>
				</Body>
			</Wrap>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	background-color: var(--gray-500);
	width: 100%;
	height: 365px;
	display: flex;
	justify-content: center;
	align-items: center;
	* {
		color: var(--gray-300);
	}
`;

const Wrap = styled.div`
	width: 1100px;
	height: 290px;
	display: grid;
`;

const Top = styled.div`
	margin-top: 5px;
	display: flex;
`;

const Title = styled.div`
	font-size: 16px;
	font-weight: var(--bold);
	margin-left: 90px;
`;

const Body = styled.div`
	border-top: 1px solid white;
	height: 180px;
	display: flex;
	justify-content: space-between;
	padding-top: 60px;
`;

const Text = styled.div`
	color: var(--gray-300);
	font-weight: var(--regular);
	margin-bottom: 7px;
	font-size: 14px;
`;

const BoxLeft = styled.div`
	flex-direction: column;
	display: flex;
	justify-content: center;
	margin-left: 40px;
`;

const BoxRight = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-right: 200px;
	margin-bottom: 10px;
	svg {
		margin-right: 12px;
		* {
			fill: var(--gray-200);
		}
	}
`;

const Pil = styled.div`
	font-weight: var(--bold);
	font-size: 18px;
`;

const Copyright = styled.div`
	font-weight: var(--light);
	font-size: 13px;
	margin-top: 30px;
	/* margin-left: 200px; */
`;

export default Footer;
