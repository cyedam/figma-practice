// 메뉴 내용. Figma의 데스크탑메뉴, 모바일메뉴 문구를 그대로 옮겼다.
// 이동할 주소가 정해지면 항목에 href를 추가한다. 예: { label: '온라인접수', href: '/apply' }

export const DESKTOP_MENUS = [
  {
    title: '수원화성',
    items: [
      { label: '화성행궁 야간개장' },
      { label: '수원화성 공연·체험' },
      { label: '수원화성 소개' },
      { label: '화성행궁 소개' },
      { label: '화령전 소개' },
      { label: '수원화성 태평성대' },
      { label: '미디어·아트 융합 전시' },
    ],
  },
  {
    title: '축제정보',
    items: [
      { label: '수원 국가유산 야행' },
      { label: '수원화성 미디어아트' },
      { label: '수원화성문화재' },
      { label: '정조대왕능행차' },
      { label: '수원연극축제' },
    ],
  },
  {
    title: '복합문화공간',
    items: [{ label: '수원SK아트리움' }, { label: '111CM' }, { label: '지동예술샘터' }],
  },
  {
    title: '공연장',
    items: [{ label: '수원야외음악당' }, { label: '만석야외음악당' }, { label: '정조테마공연장' }],
  },
  {
    title: '장르특화공간',
    items: [{ label: '수원시미디어센터' }, { label: '푸른지대창작샘터' }, { label: '실험목장 AGIT' }],
  },
  {
    title: '전통공간',
    items: [{ label: '수원전통문화관' }, { label: '무형유산전수회관' }],
  },
  {
    title: '도서관',
    items: [{ label: '슬기샘도서관' }, { label: '지혜샘도서관' }, { label: '바른샘도서관' }],
  },
  {
    title: '통합 온라인접수',
    items: [{ label: '온라인접수' }, { label: '접수내역확인' }],
  },
  {
    title: '소개',
    items: [
      { label: '인사말' },
      { label: '연혁 및 설립배경' },
      { label: '조직 및 담당업무' },
      { label: 'CI소개' },
    ],
  },
  {
    title: '기획',
    items: [
      { label: '비전 및 경영전략' },
      { label: 'ESG경영' },
      { label: '청렴·윤리경영' },
      { label: '인권경영' },
      { label: '디지털경영' },
    ],
  },
]

// hasChildren: Figma에서 + 아이콘이 있는 항목
export const MOBILE_MENUS = [
  {
    title: '수원화성관광',
    items: [
      { label: '관람안내' },
      { label: '수원화성', hasChildren: true },
      { label: '문화관광 해설안내' },
      { label: '수원호스텔' },
    ],
  },
  {
    title: '축제행사교육',
    items: [{ label: '축제정보', hasChildren: true }, { label: '행사정보' }, { label: '교육정보' }],
  },
  {
    title: '문화사업',
    items: [
      { label: '문화사업안내' },
      { label: '지원사업 안내' },
      { label: '문화도시 수원' },
      { label: '수원문화지도' },
    ],
  },
  {
    title: '문화시설',
    items: [
      { label: '복합문화공간', hasChildren: true },
      { label: '공연장', hasChildren: true },
      { label: '장르특화공간', hasChildren: true },
      { label: '전통공간', hasChildren: true },
      { label: '도서관', hasChildren: true },
      { label: '시설물 대관 안내' },
    ],
  },
  {
    title: '열린공간',
    items: [
      { label: '재단소식' },
      { label: '프레스룸' },
      { label: '자료실' },
      { label: '통합 온라인접수', hasChildren: true },
      { label: '열린의견' },
      { label: '경영공시' },
    ],
  },
  {
    title: '문화기부ssac',
    items: [
      { label: '싹ssac 소개' },
      { label: '싹ssac 후원하기' },
      { label: '싹ssac 새소식' },
      { label: '싹ssac 후원회원' },
    ],
  },
  {
    title: '재단소식',
    items: [
      { label: '소개', hasChildren: true },
      { label: '기획', hasChildren: true },
      { label: '재단 오시는 길' },
    ],
  },
  {
    title: '기타',
    items: [{ label: '문화관광해설사' }],
  },
]
