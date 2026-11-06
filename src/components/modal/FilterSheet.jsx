import { Fragment } from 'react'
import Button from '../button/Button'
import CheckboxGroup from '../input/CheckboxGroup'
import Modal from './Modal'
import './FilterSheet.css'

/**
 * 상세검색 시트 (Figma: 모달의 모바일 상세)
 * groups: 체크박스 묶음 목록. [{ key, title, options }]
 * values: 묶음별로 선택된 글자 목록. { status: ['접수중'] }
 * onChange: 선택이 바뀌면 바뀐 values를 받아 실행한다.
 * applyLabel, onApply: 맨 아래 버튼
 * label: 화면 낭독기가 읽는 이름
 * open, onClose: 열림 여부와 닫을 때 실행할 동작
 */
function FilterSheet({ open, onClose, groups, values, onChange, applyLabel, onApply, label }) {
  return (
    <Modal open={open} onClose={onClose} sheet label={label}>
      <div className="filter-sheet">
        <span className="modal__grabber" aria-hidden="true" />
        <div className="filter-sheet__view">
          {groups.map((group, index) => (
            <Fragment key={group.key}>
              {index > 0 && <hr className="filter-sheet__divider" />}
              <CheckboxGroup
                title={group.title}
                options={group.options}
                values={values[group.key] ?? []}
                onChange={(next) => onChange({ ...values, [group.key]: next })}
              />
            </Fragment>
          ))}
          <div className="filter-sheet__action">
            <Button variant="main-l" onClick={onApply}>
              {applyLabel}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default FilterSheet
