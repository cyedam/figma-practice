import './SearchCount.css'

/**
 * 검색 결과 건수 (Figma: 검색집계)
 * category: 구분 이름 (예: 전체, 검색결과)
 * count: 건수. 01처럼 두 자리로 보여 준다.
 * 건수가 바뀌면 화면 낭독기가 읽도록 role="status"를 쓴다.
 */
function SearchCount({ category = '전체', count = 0 }) {
  return (
    <p className="search-count" role="status">
      <span>{category}</span>
      <span>
        <strong className="search-count__number">{String(count).padStart(2, '0')}</strong>건
      </span>
    </p>
  )
}

export default SearchCount
