import './BottomActions.css'

/**
 * 화면 맨 아래 버튼 영역 (Figma: 버튼모음)
 * children: 버튼. 개수에 맞춰 폭을 나눠 채운다.
 */
function BottomActions({ children }) {
  return <div className="bottom-actions">{children}</div>
}

export default BottomActions
