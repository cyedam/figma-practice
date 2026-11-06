import './ListBox.css'

/**
 * 제목과 내용 목록 (Figma: 리스트박스)
 * rows: 표시할 줄. [{ label, value }] 형태이며 Figma에서는 5줄이다.
 */
function ListBox({ rows }) {
  return (
    <dl className="list-box">
      {rows.map((row) => (
        <div className="list-box__row" key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default ListBox
