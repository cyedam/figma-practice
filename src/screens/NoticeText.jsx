/**
 * 안내 글에서 일부 문구만 굵게 보여 준다.
 * text: 전체 글
 * bold: 굵게 보여 줄 문구 목록
 */
function NoticeText({ text, bold = [] }) {
  if (bold.length === 0) return text

  // 굵은 문구를 기준으로 글을 나눈다. 나눈 조각 중 홀수 번째가 굵은 문구다.
  const pattern = new RegExp(`(${bold.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`)
  return text
    .split(pattern)
    .map((part, index) => (index % 2 === 1 ? <strong key={index}>{part}</strong> : part))
}

export default NoticeText
