import './SearchBox.css'

/**
 * 검색 입력 칸 (Figma: 드롭다운의 공통 search)
 * label: 화면 낭독기가 읽는 이름
 * 그 밖의 속성(value, onChange, placeholder 등)은 입력 칸에 그대로 전달한다.
 */
function SearchBox({ label, className = '', ...rest }) {
  return (
    <div className={`search-box ${className}`.trim()}>
      <span className="search-box__icon" aria-hidden="true" />
      <input className="search-box__input" type="search" aria-label={label} {...rest} />
    </div>
  )
}

export default SearchBox
