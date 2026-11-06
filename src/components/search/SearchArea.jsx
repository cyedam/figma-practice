import { useId, useState } from 'react'
import Button from '../button/Button'
import Dropdown from '../input/Dropdown'
import SearchBox from './SearchBox'
import FilterSheet from '../modal/FilterSheet'
import useIsMobile from '../../hooks/useIsMobile'
import CheckboxGroup from '../input/CheckboxGroup'
import { SEARCH_FILTER_GROUPS } from './searchData'
import './SearchArea.css'

const DEFAULT_CATEGORIES = [{ value: 'all', label: '전체' }]

/**
 * 검색영역 (Figma: 검색영역)
 * categoryOptions: 드롭다운 항목. [{ value, label }]
 * onCategoryChange: 드롭다운에서 고르면 고른 value를 받아 실행한다.
 * defaultDetailOpen: 처음에 상세검색을 펼쳐 둘지 여부 (Figma: active)
 * onSearch: 검색하면 { category, keyword, filters }를 받아 실행한다.
 *   filters는 { status: ['접수중'], fee: [] } 처럼 묶음별로 선택된 글자 목록이다.
 * 상세검색은 태블릿부터 검색창 아래에 펼쳐지고, 모바일에서는 시트로 열린다.
 * 시트의 '검색' 버튼은 시트를 닫고 검색을 실행한다.
 */
function SearchArea({
  categoryOptions = DEFAULT_CATEGORIES,
  onCategoryChange,
  defaultDetailOpen = false,
  onSearch,
}) {
  const [category, setCategory] = useState(categoryOptions[0]?.value ?? '')
  const [keyword, setKeyword] = useState('')
  const [filters, setFilters] = useState({})
  const [detailOpen, setDetailOpen] = useState(defaultDetailOpen)
  const isMobile = useIsMobile()
  const panelId = useId()

  function handleSubmit(event) {
    event.preventDefault()
    onSearch?.({ category, keyword, filters })
  }

  function handleSheetSearch() {
    setDetailOpen(false)
    onSearch?.({ category, keyword, filters })
  }

  return (
    <>
      <form className="search-area" role="search" onSubmit={handleSubmit}>
        <div className="search-area__bar">
          <div className="search-area__fields">
            <div className="search-area__category">
              <Dropdown
                label="검색 구분"
                options={categoryOptions}
                value={category}
                onChange={(value) => {
                  setCategory(value)
                  onCategoryChange?.(value)
                }}
              />
            </div>
            <SearchBox
              label="검색어"
              placeholder="검색어를 입력하세요."
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
            />
          </div>
          <div className="search-area__buttons">
            <Button variant="main-l" type="submit">
              검색
            </Button>
            <Button
              variant="special-l"
              icon
              aria-expanded={isMobile ? undefined : detailOpen}
              aria-controls={isMobile ? undefined : panelId}
              aria-haspopup={isMobile ? 'dialog' : undefined}
              onClick={() => setDetailOpen(!detailOpen)}
            >
              상세검색
            </Button>
          </div>
        </div>
        {!isMobile && detailOpen && (
          <div className="search-area__panel" id={panelId}>
            {SEARCH_FILTER_GROUPS.map((group) => (
              <CheckboxGroup
                key={group.key}
                title={group.title}
                options={group.options}
                values={filters[group.key] ?? []}
                onChange={(values) => setFilters({ ...filters, [group.key]: values })}
              />
            ))}
          </div>
        )}
      </form>
      {isMobile && (
        <FilterSheet
          open={detailOpen}
          onClose={() => setDetailOpen(false)}
          label="상세검색"
          groups={SEARCH_FILTER_GROUPS}
          values={filters}
          onChange={setFilters}
          applyLabel="검색"
          onApply={handleSheetSearch}
        />
      )}
    </>
  )
}

export default SearchArea
