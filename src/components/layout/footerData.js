import bestFamily from '../../assets/images/footer-bestfamily.png'
import logoGray from '../../assets/images/footer-logo-gray.png'
import related01 from '../../assets/images/footer-related-01.jpg'
import related02 from '../../assets/images/footer-related-02.png'
import related03 from '../../assets/images/footer-related-03.png'
import related04 from '../../assets/images/footer-related-04.png'
import related05 from '../../assets/images/footer-related-05.png'
import related06 from '../../assets/images/footer-related-06.png'
import related07 from '../../assets/images/footer-related-07.png'
import related08 from '../../assets/images/footer-related-08.jpg'
import related09 from '../../assets/images/footer-related-09.jpg'
import related10 from '../../assets/images/footer-related-10.jpg'
import related11 from '../../assets/images/footer-related-11.jpg'
import related12 from '../../assets/images/footer-related-12.jpg'
import webAccess from '../../assets/images/footer-wa.png'

// 푸터에 쓰는 글과 이미지 (Figma: 요소-푸터섹션)
// href: 이동할 주소. 없으면 아직 동작이 없는 항목이라 회색 글씨로 보이고 누를 수 없다. (사용자 요청)

// 위 링크 줄. tone: 'yellow'와 'blue'는 강조 색, 없으면 기본 회색이다.
export const FOOTER_LINKS = [
  { label: '개인정보처리방침', tone: 'yellow' },
  { label: '영상정보처리기기운영관리방침', tone: 'blue' },
  { label: '오시는길' },
  { label: '사이트맵' },
  { label: '문화관광해설사' },
  { label: '사진으로보는문화' },
  { label: '사진 및 영상자료 요청' },
  { label: '홈페이지 홍보등록 요청' },
]

// 정보 글. 한 줄을 덩어리로 나눠 두고, 폭이 좁으면 글자가 아니라 덩어리째 다음 줄로 내린다.
export const FOOTER_INFO = [
  ['(16261) 경기도 수원시 팔달구 행궁로 11 (남창동) 수원문화재단', '사업자등록번호 135-82-15727'],
  ['대표전화번호 : 031-290-3600', '대표팩스번호 : 031-290-3520'],
]

// 저작권 문구는 덩어리로 나누지 않고 보통 글처럼 줄을 바꾼다.
export const FOOTER_COPYRIGHT = 'COPYRIGHT SUWON CULTURAL FOUNDATION. ALL RIGHTS RESERVED.'

export const FOOTER_LOGO = { src: logoGray, alt: '수원문화재단' }

export const FOOTER_MARKS = [
  { src: bestFamily, alt: '가족친화 인증기업', className: 'footer__mark' },
  { src: webAccess, alt: '웹 접근성 품질인증 마크', className: 'footer__mark footer__mark--wa' },
]

// 유관기관 배너 (Figma: 푸터배너 배너뷰-00 ~ 11)
export const RELATED_BANNERS = [
  { src: related01, alt: '수원광교박물관' },
  { src: related02, alt: '수원시청' },
  { src: related03, alt: '수원시의회' },
  { src: related04, alt: '수원시 장안구' },
  { src: related05, alt: '수원시 권선구' },
  { src: related06, alt: '수원시 팔달구' },
  { src: related07, alt: '수원시 영통구' },
  { src: related08, alt: '수원시 도서관사업소' },
  { src: related09, alt: '수원시 박물관사업소' },
  { src: related10, alt: '수원시립미술관' },
  { src: related11, alt: '수원화성박물관' },
  { src: related12, alt: '수원박물관' },
]
