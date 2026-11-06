import './ProgramNotice.css'

/**
 * 소제목과 설명문 (Figma: 프로그램의 기타정보)
 * title: 소제목
 * children: 설명문
 */
function ProgramNotice({ title, children }) {
  return (
    <section className="program-notice">
      <div className="program-notice__header">
        <h3 className="program-notice__title">{title}</h3>
      </div>
      <div className="program-notice__body">{children}</div>
    </section>
  )
}

export default ProgramNotice
