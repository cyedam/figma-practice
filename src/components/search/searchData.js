// 상세검색 항목. Figma의 검색영역 문구를 그대로 옮겼다.

export const SEARCH_FILTER_GROUPS = [
  {
    key: 'status',
    title: '접수 상태',
    options: ['접수중', '대기 신청', '접수종료'],
  },
  {
    key: 'target',
    title: '이용 대상',
    options: [
      '제한없음',
      '유아',
      '어린이',
      '청소년',
      '성인',
      '장애인',
      '국가유공자',
      '여성',
      '가족',
      '초등학생',
      '중학생',
      '고등학생',
      '대학생',
    ],
  },
  {
    key: 'method',
    title: '예약 방법',
    options: ['인터넷', '전화', '현장방문'],
  },
  {
    key: 'capacity',
    title: '수용 인원',
    options: ['제한없음', '10명 미만', '10명 이상', '20명 이상', '30명 이상', '100명 이상'],
  },
  {
    key: 'fee',
    title: '이용 요금',
    options: ['무료', '유료'],
  },
]
