import Button from '../button/Button'
import './ActionBox.css'

/**
 * 안내와 버튼이 있는 회색 박스 (Figma: 박스)
 * title, description: 제목과 설명문. 설명문이 없으면 숨긴다.
 * actions: 버튼 목록. [{ label, onClick }]
 *   1개면 글자 옆에, 2개면 글자 아래에 놓인다. (Figma: 원버튼, 투버튼)
 */
function ActionBox({ title, description, actions }) {
  const layoutClass = actions.length > 1 ? 'action-box--stacked' : 'action-box--inline'

  return (
    <div className={`action-box ${layoutClass}`}>
      <div className="action-box__text">
        <p className="action-box__title">{title}</p>
        {description && <p className="action-box__description">{description}</p>}
      </div>
      <div className="action-box__actions">
        {actions.map((action) => (
          <Button key={action.label} variant="sub-s" onClick={action.onClick}>
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default ActionBox
