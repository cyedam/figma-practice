import { useSyncExternalStore } from 'react'

// 화면 폭이 1440px 이상이면 true를 돌려준다. 폭이 바뀌면 다시 그린다.
// CSS만으로 바꿀 수 없을 때(데스크탑에서 다른 동작을 할 때) 쓴다.
const DESKTOP_QUERY = '(min-width: 1440px)'

function subscribe(onChange) {
  const media = window.matchMedia(DESKTOP_QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

function getSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches
}

function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot)
}

export default useIsDesktop
