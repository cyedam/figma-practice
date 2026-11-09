// 프로그램 목록과 안내 문구. Figma 완성본의 내용을 그대로 옮겼다.
import moonlight from '../assets/images/banner-landscape-01.png'
import room1 from '../assets/images/program-111cm-room1.png'
import room2 from '../assets/images/program-111cm-room2.png'
import edu from '../assets/images/program-111cm-edu.png'
import lab from '../assets/images/program-111cm-lab.png'
import studio from '../assets/images/program-111cm-studio.png'
import groupTour from '../assets/images/program-group-tour.jpg'
import alley from '../assets/images/program-haenggung-alley.jpg'
import heritageHall from '../assets/images/program-heritage-hall.jpg'
import heritageOutdoor from '../assets/images/program-heritage-outdoor.jpg'
import hiddenTour from '../assets/images/program-hidden-tour.jpg'
import jeongjoPractice from '../assets/images/program-jeongjo-practice.jpg'
import jeongjoStage from '../assets/images/program-jeongjo-stage.jpg'
import jeongjoYard from '../assets/images/program-jeongjo-yard.jpg'
import manseok from '../assets/images/program-manseok-outdoor.jpg'
import minhwa from '../assets/images/program-minhwa.jpg'
import modernAlley from '../assets/images/program-modern-alley.jpg'
import silverGrass from '../assets/images/program-silver-grass.jpg'
import suwonOutdoor from '../assets/images/program-suwon-outdoor.jpg'
import upcycling from '../assets/images/program-upcycling.jpg'

export const MOONLIGHT_IMAGE = moonlight

// 신청 화면의 프로그램 정보 (Figma: 태블릿·데스크탑 접수탭의 프로그램 카드)
export const MOONLIGHT_INFO = {
  target: '미취학 아동 및 만 75세 이상 불가',
  startDate: '2026.04.27',
  endDate: '2026.11.01',
  selection: '선착순',
  capacity: '회당 20',
  reservation: '인터넷',
  fee: '무료',
  team: '관광부 관광육성팀',
  phone: '031-290-3624',
}

// value는 프로그램 제목 앞의 [구분]과 같다. all은 전체다.
export const PROGRAM_CATEGORIES = [
  { value: 'all', label: '전체' },
  { value: '교육프로그램', label: '교육프로그램 접수' },
  { value: '체험프로그램', label: '체험프로그램 접수' },
  { value: '문화관광해설', label: '문화관광해설 접수' },
  { value: '행궁동 왕의 골목여행 해설', label: '행궁동 왕의 골목여행 해설 접수' },
  { value: '근대여행 골목길 해설투어', label: '근대여행 골목길 해설투어 접수' },
  { value: '수원전통문화관', label: '수원전통문화관 접수' },
  { value: '시설물 대관 온라인', label: '시설물 대관 온라인 접수' },
  { value: '복합문화공간 111CM 대관', label: '복합문화공간 111CM 대관 접수' },
  { value: '기타프로그램', label: '기타프로그램 접수' },
]

// 같은 담당 부서가 반복되어 묶어 둔다.
const CULTURE_CITY = { team: '문화도시센터 지역문화팀', phone: '031-290-3545', target: '성인' }
const TOUR_3624 = { team: '관광부 관광육성팀', phone: '031-290-3624' }
const TOUR_3623 = { team: '관광부 관광육성팀', phone: '031-290-3623' }
const JEONGJO = { team: '정조테마공연장TF팀', phone: '031-290-3573' }
const HERITAGE = { team: '예술교육팀', phone: '031-5191-4613' }
const OUTDOOR = { team: '운영관리팀', phone: '031-245-1491' }
const STAGE_TARGET = '공연 및 행사 진행 기관/단체 등'
const AMATEUR = '수원 아마추어 예술인 및 예술단체'
const CM111 = {
  team: '문화도시센터 111CM TF팀',
  phone: '031-269-3764',
  target: '전체',
  startDate: '2026.09.01',
  endDate: '2026.10.31',
  fee: 'paid',
}
const YEAR_ROUND = { startDate: '2026.01.01', endDate: '2026.12.31' }

// status: open(접수중), waitlist(대기신청), closed(접수마감) / fee: free(무료), paid(유료)
// available: 신청 화면이 있는 프로그램. 없으면 목록에서 회색 글씨로 보이고 버튼을 누를 수 없다. (사용자 요청: 달빛, 성곽 투어만 신청 가능)
// buttonLabel을 적지 않으면 상태별 기본 이름(접수, 대기, 마감)을 쓴다.
export const PROGRAMS = [
  { ...CULTURE_CITY, title: '[교육프로그램] 업사이클링 모시공예 창작수업', startDate: '2026.07.14', endDate: '2026.08.26', status: 'closed', fee: 'free', image: upcycling },
  { ...CULTURE_CITY, title: '[체험프로그램] 민화 드로잉 클래스 참여자 모집', startDate: '2026.07.06', endDate: '2026.08.23', status: 'closed', fee: 'free', image: minhwa },
  { ...TOUR_3624, title: "[문화관광해설] [특별해설] 수원화성 미개방 공간 '히든 투어' -닫힌 문이 열리면", startDate: '2026.09.21', endDate: '2026.10.11', target: '회당 20인', status: 'closed', fee: 'paid', image: hiddenTour },
  { ...TOUR_3624, title: '[문화관광해설] [화성행궁 야간개장] 문화관광해설사와 함께하는 <달빛, 성곽 투어>', startDate: '2026.04.27', endDate: '2026.11.01', target: '미취학 아동, 만 75세 이상 참여 불가', status: 'open', fee: 'free', image: moonlight, available: true },
  { ...TOUR_3624, ...YEAR_ROUND, title: '[문화관광해설] 2026년 수원화성 단체문화관광해설 예약', target: '20인 이상 단체', status: 'open', fee: 'free', image: groupTour },
  { ...TOUR_3623, title: '[문화관광해설] 가을빛 여정 - 억새길 투어', startDate: '2026.09.09', endDate: '2026.10.26', target: '최대 15인까지 운영', status: 'waitlist', buttonLabel: '대기신청', fee: 'free', image: silverGrass },
  { ...TOUR_3623, ...YEAR_ROUND, title: '[행궁동 왕의 골목여행 해설] 2026 행궁동 왕의 골목여행 사전예약', target: '미취학 아동 제외', status: 'open', fee: 'free', image: alley },
  { ...TOUR_3623, title: '[근대여행 골목길 해설투어] 2026 수원 근대 골목여행', startDate: '2026.06.10', endDate: '2026.12.31', target: '8세 이상', status: 'open', fee: 'free', image: modernAlley },
  { ...JEONGJO, title: '[시설물 대관 온라인] 정조테마공연장-연습실', startDate: '2026.04.08', endDate: '2026.12.31', target: '일반 시민', status: 'open', fee: 'paid', image: jeongjoPractice },
  { ...HERITAGE, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원시무형유산전수회관-전시관', target: '작가, 단체 및 기관 등', status: 'open', fee: 'paid', image: heritageHall },
  { ...HERITAGE, title: '[시설물 대관 온라인] 수원시무형유산전수회관-야외공연장', startDate: '2026.03.01', endDate: '2026.10.31', target: '일반시민, 예술인 및 예술단체 등', status: 'open', fee: 'free', image: heritageOutdoor },
  { ...JEONGJO, title: '[시설물 대관 온라인] 정조테마공연장-어울무대', startDate: '2026.08.01', endDate: '2026.11.30', target: AMATEUR, status: 'open', fee: 'free', image: jeongjoStage },
  { ...JEONGJO, title: '[시설물 대관 온라인] 정조테마공연장-어울마당', startDate: '2026.08.01', endDate: '2026.11.30', target: AMATEUR, status: 'open', fee: 'paid', image: jeongjoYard },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-제1소연습실', target: '전체', status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-제2소연습실', target: '전체', status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-제3소연습실', target: '전체', status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-일반연습실', target: '전체', status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-지하연습실', target: '전체', status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, ...YEAR_ROUND, title: '[시설물 대관 온라인] 만석야외음악당 대관신청-연습실', target: '전체', status: 'open', fee: 'paid', image: manseok },
  { ...OUTDOOR, title: '[시설물 대관 온라인] 수원야외음악당 대관신청-공연장', startDate: '2026.01.01', endDate: '2026.10.31', target: STAGE_TARGET, status: 'open', fee: 'paid', image: suwonOutdoor },
  { ...OUTDOOR, title: '[시설물 대관 온라인] 만석야외음악당 대관신청-공연장', startDate: '2026.01.01', endDate: '2026.10.31', target: STAGE_TARGET, status: 'open', fee: 'paid', image: manseok },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 다목적실1', status: 'open', image: room1 },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 다목적실2', status: 'open', image: room2 },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 창작활동교육실', status: 'open', image: edu },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 창의예술실험실', status: 'open', image: lab },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 스튜디오1', status: 'open', image: studio },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 스튜디오2', status: 'open', image: studio },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 스튜디오3', status: 'waitlist', image: studio },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 스튜디오4', status: 'open', image: studio },
  { ...CM111, title: '[복합문화공간 111CM 대관] 복합문화공간 111CM 스튜디오5', status: 'waitlist', image: studio },
]

export const NOTICE_INFO = `- 수원화성문화제 기간(10/4~10/11)은 화성행궁 야간개장이 전일 진행됩니다.
- 해당 프로그램은 기상악화, 국가유산 정비 등의 사유로 코스 변경 또는 취소될 수 있습니다.
- 미취학 아동 및 만 75세 이상은 해설 프로그램 참여 불가함을 알려드립니다.
- 예약 취소 시 방문일로부터 3일 이전에 취소해주세요.
- 프로그램은 관리자 확인(승인)이 된 상태에서만 진행 가능하니, 신청 상태를 반드시 확인해주세요.
1) 수원문화재단 홈페이지-열린공간-통합온라인접수-접수내역확인
2) 성명, 연락처, 비밀번호 또는 예약번호, 비밀번호 입력 후 조회 가능
- 문의사항 : 031-290-3624(관광육성팀)
1) 평일 09:00~18:00 (점심시간 제외)
2) 주말 별도 응대 없음`

export const NOTICE_CAUTION = `- 수원화성문화제 기간(10/4~10/11)은 화성행궁 야간개장이 전일 진행됩니다.
- 예약 취소의 경우 반드시 3일전까지 취소해야 합니다. 노쇼로 인해 다른 관광객들이 불편을 겪지 않도록 관리해주세요.
- 해당 프로그램은 야간 산행코스가 포함되어 있어, 미취학 아동 및 만75세 이상은 참여가 제한됩니다. 이점 양해 부탁드립니다.
- 국가유산 정비로 인해 일부 코스가 변경되었습니다.
1) 26년 5월 : 신풍루 - 봉수당 - 낙남헌 - 성신사 - 서장대
2) 26년 6월 ~ 11월 : 신풍루 - 봉수당 - 낙남헌 - 미로한정 - 성신사 - 서장대`

export const NOTICE_CAUTION_BOLD = ['야간 산행코스가 포함', '미취학 아동 및 만75세 이상은 참여가 제한']
export const NOTICE_PRIVACY_BOLD = ['[개인정보의 처리 목적 및 보유기간]']

export const NOTICE_PRIVACY = `[개인정보의 처리 목적 및 보유기간]
본 웹사이트에서는 온라인 접수에 필요한 정보만을 수집하고 있습니다. 처리한 개인정보는 목적 이외의 용도로는 사용하지 않으며, 이용 목적이 변경될 시에는 사전 동의를 구할 예정입니다.
가. 필수항목 : 성명 , 휴대전화번호, 유선전화번호, 단체명 등
나. 선택항목 : 생년월일, 이메일, 보호자명 등
다. 수집방법 : 온라인 신청시 해당 내용 입력
라. 보유기간 : 3년, 5년
마. 관련법령 : 신용정보의 수집/처리 및 이용 등에 관한 기록 : 3년 / 대금결제 및 재화 등의 공급에 관한 기록 : 5년

[개인정보처리의 위탁]
원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.

<홈페이지 유지보수>
위탁받는자 : ㈜니트로아이
위탁하는 업무의 내용 : 홈페이지 유지보수
위탁 기간 : 계약 종료 시`

// Figma 완성본의 예시 신청 내역이다. 실제 개인정보가 아니다.
export const SAMPLE_RESERVATION_NUMBER = 'AI20261012'
export const SAMPLE_RESERVATION_ROWS = [
  { label: '예약일자', value: '10월 16일 18:00' },
  { label: '예약자명', value: '홍길동' },
  { label: '연락처', value: '01012341234' },
  { label: '예약인원', value: '2' },
  { label: '결제금액', value: '무료' },
]
