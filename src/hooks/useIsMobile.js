import { useSyncExternalStore } from 'react'

// 화면 폭이 768px 미만이면 true를 돌려준다. 폭이 바뀌면 다시 그린다.
// CSS만으로 바꿀 수 없을 때(모바일에서 다른 컴포넌트를 보여 줄 때) 쓴다.
const TABLET_QUERY = '(min-width: 768px)'

function subscribe(onChange) {
  const media = window.matchMedia(TABLET_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSnapshot() {
  return !window.matchMedia(TABLET_QUERY).matches
}

function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot)
}

export default useIsMobile
