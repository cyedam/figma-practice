import { useEffect, useLayoutEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

// 화면(방문 기록 한 칸)마다 마지막으로 보던 세로 위치
const savedPositions = new Map()
// 지금 보고 있는 화면의 기록 이름. 스크롤 위치는 이 이름으로 기억한다.
let currentKey = null

function savePosition() {
  if (currentKey) savedPositions.set(currentKey, window.scrollY)
}

/**
 * 화면 이동 때 스크롤 위치를 정한다. (사용자 요청)
 * - 버튼이나 링크로 다른 화면에 가면: 맨 위부터 보인다.
 * - 브라우저 뒤로·앞으로 가기: 그 화면에서 보던 위치로 돌아간다.
 *   브라우저가 스스로 되돌리면 위치가 어긋나서, 위치를 직접 기억해 두고 되돌린다.
 */
function useScrollToTop() {
  const location = useLocation()
  const navigationType = useNavigationType()

  // 브라우저가 위치를 마음대로 되돌리지 않게 하고, 스크롤할 때마다 위치를 기억한다.
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    window.addEventListener('scroll', savePosition, { passive: true })
    return () => window.removeEventListener('scroll', savePosition)
  }, [])

  // 화면을 그리기 전에 옮겨서, 다른 위치가 잠깐 보였다가 움직이는 깜빡임이 없게 한다.
  // 먼저 기록 이름을 새 화면으로 바꿔서, 옮기면서 생기는 스크롤이 이전 화면 위치를 덮어쓰지 않게 한다.
  useLayoutEffect(() => {
    currentKey = location.key
    const saved = navigationType === 'POP' ? savedPositions.get(location.key) : undefined
    window.scrollTo(0, saved ?? 0)
  }, [location.key, navigationType])
}

export default useScrollToTop
