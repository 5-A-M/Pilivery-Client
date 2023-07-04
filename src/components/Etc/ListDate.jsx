import styled from 'styled-components';
import dayjs from 'dayjs';

// YYYY.MM.DD
export function DotDate({ date }) {
	const tempDate = dayjs(date);
	const formattedDate = tempDate.format('YYYY-MM-DD');
	return <Date>{formattedDate}</Date>;
}

// MM월 DD일
export function KrDate({ date }) {
	const tempDate = dayjs(date);
	const formattedDate = tempDate.format('MM월 DD일');
	return <Date className="kr-date">{formattedDate}</Date>;
}

const Date = styled.time`
	color: var(--gray-300);

	&.kr-date {
		color: var(--gray-400);
	}
`;
