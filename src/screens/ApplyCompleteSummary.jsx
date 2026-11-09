import ListBox from '../components/card/ListBox'
import Tab from '../components/menu/Tab'
import { SAMPLE_RESERVATION_NUMBER } from './programData'
import './ApplyCompleteSummary.css'

/**
 * 신청 완료 안내와 신청 내역 (Figma: 접수완료의 안내문구·신청내역, 데스크탑-최종확인모달)
 * 신청 완료 화면과 데스크탑 완료 모달이 함께 쓴다.
 * rows: 신청 내역. [{ label, value }]
 * titleId: 제목 요소의 id. 모달에서 제목으로 읽히게 할 때 준다.
 */
function ApplyCompleteSummary({ rows, titleId }) {
  return (
    <>
      <div className="complete-summary__message">
        <span className="complete-summary__icon" aria-hidden="true" />
        <h1 className="complete-summary__title" id={titleId}>
          신청하신 사항이
          <br />
          정상적으로 등록되었습니다.
        </h1>
      </div>
      <div className="screen__summary">
        <Tab as="h2" variant="location-2depth" className="screen__summary-title">
          예약번호 {SAMPLE_RESERVATION_NUMBER}
        </Tab>
        <ListBox rows={rows} />
      </div>
    </>
  )
}

export default ApplyCompleteSummary
