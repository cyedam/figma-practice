import './ProgramInfo.css'

/**
 * 프로그램 정보 목록 (Figma: 프로그램의 리스트)
 * target: 대상자
 * startDate, endDate: 접수 시작일, 마감일
 * selection: 선정방법
 * capacity: 모집정원 (숫자)
 * reservation: 예약방법
 * fee: 이용요금
 * team, phone: 담당팀, 담당 연락처
 */
function ProgramInfo({
  target,
  startDate,
  endDate,
  selection,
  capacity,
  reservation,
  fee,
  team,
  phone,
}) {
  return (
    <dl className="program-info">
      <dt>대상자</dt>
      <dd>{target}</dd>
      <dt>접수기간</dt>
      <dd>
        {startDate} － {endDate}
      </dd>
      <dt>선정방법</dt>
      <dd>{selection}</dd>
      <dt>모집정원</dt>
      <dd>{capacity}명</dd>
      <dt>예약방법</dt>
      <dd>{reservation}</dd>
      <dt>이용요금</dt>
      <dd>{fee}</dd>
      <div className="program-info__contact">
        <dt>문의처</dt>
        <dd>
          {team} ({phone})
        </dd>
      </div>
    </dl>
  )
}

export default ProgramInfo
