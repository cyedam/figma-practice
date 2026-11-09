import { useState } from 'react'
import { useNavigate } from 'react-router'
import ProgramCard from '../components/card/ProgramCard'
import SearchArea from '../components/search/SearchArea'
import SearchCount from '../components/search/SearchCount'
import { PROGRAM_CATEGORIES, PROGRAMS } from './programData'
import ScreenLayout from './ScreenLayout'
import './ProgramListScreen.css'

const BUTTON_BY_STATUS = {
  open: { label: '접수', variant: 'main-s' },
  waitlist: { label: '대기', variant: 'special-urgent-s' },
  closed: { label: '마감', variant: 'sub-s', disabled: true },
}

// 상세검색 글자를 프로그램 값으로 바꾼다.
const STATUS_BY_LABEL = { 접수중: 'open', '대기 신청': 'waitlist', 접수종료: 'closed' }
const FEE_BY_LABEL = { 무료: 'free', 유료: 'paid' }

function matches(program, { category, keyword, filters }) {
  if (category !== 'all' && !program.title.startsWith(`[${category}]`)) return false
  if (keyword && !program.title.includes(keyword.trim())) return false
  const statuses = (filters.status ?? []).map((label) => STATUS_BY_LABEL[label])
  if (statuses.length > 0 && !statuses.includes(program.status)) return false
  const fees = (filters.fee ?? []).map((label) => FEE_BY_LABEL[label])
  if (fees.length > 0 && !fees.includes(program.fee)) return false
  return true
}

// 프로그램 목록 (Figma: 모바일-온라인접수, 온라인접수-01~09)
function ProgramListScreen() {
  const navigate = useNavigate()
  const [query, setQuery] = useState({ category: 'all', keyword: '', filters: {} })
  const results = PROGRAMS.filter((program) => matches(program, query))
  const isDefault = query.category === 'all' && !query.keyword

  return (
    <ScreenLayout backTo="/" activeTab="/programs">
      <div className="program-list__search">
        <SearchArea
          categoryOptions={PROGRAM_CATEGORIES}
          onCategoryChange={(category) => setQuery({ ...query, category })}
          onSearch={setQuery}
        />
      </div>
      <div className="program-list">
        <SearchCount category={isDefault ? '전체' : '검색결과'} count={results.length} />
        <div className="program-list__cards">
          {results.map((program) => {
            const button = BUTTON_BY_STATUS[program.status]
            return (
              <ProgramCard
                key={program.title}
                imageSrc={program.image}
                imageAlt={program.title}
                status={program.status}
                fee={program.fee}
                title={program.title}
                startDate={program.startDate}
                endDate={program.endDate}
                target={program.target}
                team={program.team}
                phone={program.phone}
                buttonLabel={program.buttonLabel ?? button.label}
                buttonVariant={button.variant}
                buttonDisabled={button.disabled}
                inactive={!program.available}
                onButtonClick={() =>
                  navigate(program.status === 'waitlist' ? '/apply?mode=waitlist' : '/apply')
                }
              />
            )
          })}
        </div>
      </div>
    </ScreenLayout>
  )
}

export default ProgramListScreen
