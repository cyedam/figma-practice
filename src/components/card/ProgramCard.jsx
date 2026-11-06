import Button from '../button/Button'
import Badge from './Badge'
import ProgramInfo from './ProgramInfo'
import './ProgramCard.css'

function CardImage({ imageSrc, imageAlt }) {
  return (
    <div className="program-card__image">
      {imageSrc && <img src={imageSrc} alt={imageAlt ?? ''} />}
    </div>
  )
}

/**
 * 프로그램 카드 (Figma: 프로그램의 세로카드, 이미지, 가로)
 * variant: vertical(세로카드), image(이미지), horizontal(가로)
 * imageSrc, imageAlt: 이미지 주소와 대체 글. 주소가 없으면 회색 칸만 보인다.
 * status: 접수 상태 뱃지. open(접수중), waitlist(대기신청), closed(접수마감)
 * fee: 요금 뱃지. free(무료), paid(유료)
 * showBadges: 뱃지 표시 여부
 *
 * vertical에서 쓰는 값
 * title, startDate, endDate, target, team, phone: 프로그램 정보
 * buttonLabel, onButtonClick: 버튼 이름과 누를 때 실행할 동작. 이름이 없으면 버튼을 숨긴다.
 * buttonVariant: 버튼 종류. main-s(접수), sub-s(마감), special-urgent-s(대기)
 * buttonDisabled: 버튼을 누를 수 없게 할지 여부
 *
 * horizontal에서 쓰는 값
 * info: ProgramInfo에 넘길 값
 */
function ProgramCard({
  variant = 'vertical',
  imageSrc,
  imageAlt,
  status = 'open',
  fee = 'free',
  showBadges = true,
  title,
  startDate,
  endDate,
  target,
  team,
  phone,
  buttonLabel,
  onButtonClick,
  buttonVariant = 'main-s',
  buttonDisabled = false,
  info,
}) {
  const closedClass = status === 'closed' ? ' program-card--closed' : ''
  const badges = showBadges && (
    <div className="program-card__badges">
      <Badge type={status} />
      <Badge type={fee} />
    </div>
  )

  if (variant === 'image') {
    return (
      <article className={`program-card program-card--image${closedClass}`}>
        <CardImage imageSrc={imageSrc} imageAlt={imageAlt} />
        {badges}
      </article>
    )
  }

  if (variant === 'horizontal') {
    return (
      <article className={`program-card program-card--horizontal${closedClass}`}>
        <CardImage imageSrc={imageSrc} imageAlt={imageAlt} />
        <ProgramInfo {...info} />
        {badges}
      </article>
    )
  }

  return (
    <article className={`program-card program-card--vertical${closedClass}`}>
      <div>
        <CardImage imageSrc={imageSrc} imageAlt={imageAlt} />
        <div className="program-card__text">
          <h3 className="program-card__title">{title}</h3>
          <div className="program-card__details">
            <p>
              {startDate}－{endDate}
            </p>
            <p>대상자： {target}</p>
            <div className="program-card__contact">
              <p>문의처： {team}</p>
              <p>({phone})</p>
            </div>
          </div>
        </div>
      </div>
      {buttonLabel && (
        <div className="program-card__footer">
          <Button variant={buttonVariant} disabled={buttonDisabled} onClick={onButtonClick}>
            {buttonLabel}
          </Button>
        </div>
      )}
      {badges}
    </article>
  )
}

export default ProgramCard
