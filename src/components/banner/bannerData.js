// 배너 내용. 문구와 이미지는 Figma의 배너요소를 그대로 옮겼다.
// 이동할 주소가 정해지면 항목에 href를 추가한다.
import landscape01 from '../../assets/images/banner-landscape-01.png'
import landscape02 from '../../assets/images/banner-landscape-02.jpg'
import landscape03 from '../../assets/images/banner-landscape-03.jpg'
import landscape04 from '../../assets/images/banner-landscape-04.jpg'
import portrait01 from '../../assets/images/banner-portrait-01.jpg'
import portrait02 from '../../assets/images/banner-portrait-02.jpg'
import portrait03 from '../../assets/images/banner-portrait-03.jpg'
import portrait04 from '../../assets/images/banner-portrait-04.jpg'

export const BANNERS = [
  {
    id: 'moonlight-tour',
    title: '[화성행궁 야간개장] 문화관광해설사와 함께하는 <달빛, 성곽 투어>',
    mobileTitle: '문화관광해설사와 함께하는\n<달빛, 성곽 투어>',
    description:
      '화성행궁 야간개장 기간에만 진행되는 특별 문화관광해설 프로그램입니다.\n평소 관람할 수 없었던 야간의 화성행궁과 성곽을 수원시 문화관광해설사의 해설과 함께 즐겨보세요!',
    landscape: landscape01,
    portrait: portrait01,
  },
  {
    id: 'rhythm-rearrangement',
    title: '장단의 재배치 Ⅰ: 수궁',
    mobileTitle: '장단의 재배치 Ⅰ : 수궁',
    description:
      '한국 타악의 새로운 가능성을 펼쳐온 타악·연희 예술가, 김소라.\n\n이번 작품은 그녀의 아홉 번째 신작이자 컨템포러리 시리즈로, 무용·미디어아트·라이브드로잉·즉흥·클래식 등 다양한 장르와의 협업을 통해 확장해 온 예술적 스펙트럼을 판소리 고전과 접목한 새로운 시도다.',
    landscape: landscape02,
    portrait: portrait02,
  },
  {
    id: 'gayageum-concert',
    title: '김수인 현을 타다',
    mobileTitle: '김수인 현을 타다',
    description:
      '전통의 깊이와 현대의 감성을 아우르는 국악인 김수인\n깊은 울림의 선율과 섬세한 소리가 어우러지는 가야금 병창\n\n가야금의 맑고 따뜻한 선율 위에 김수인의 깊이 있는 소리가 더해져 전통음악의 진한 울림을 선사합니다.',
    landscape: landscape03,
    portrait: portrait03,
  },
  {
    id: 'artist-for-a-day',
    title: '푸른지대창작샘터 시민예술교육 <일일 작가되어보기>',
    mobileTitle: '푸른지대창작샘터 시민예술교육\n<일일 작가되어보기>',
    description:
      '푸른지대창작샘터 입주작가와 함께 사물, 아날로그 영화, 시간과 기억, 게임, 회화, 민화 등 다양한 예술 분야를 경험하는 시민예술교육 프로그램입니다.',
    landscape: landscape04,
    portrait: portrait04,
  },
]
