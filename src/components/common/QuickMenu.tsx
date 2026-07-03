import { Link } from 'react-router-dom'

const quickMenuItems = [
  {
    label: '도입 상담',
    icon: '/quick-consult.svg',
    activeIcon: '/quick-consult-active.svg',
    to: '/contact',
  },
  {
    label: '이메일 문의',
    icon: '/quick-email.svg',
    activeIcon: '/quick-email-active.svg',
    to: '/contact',
  },
]

function QuickMenu() {
  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <aside className="quick-menu" aria-label="Quick menu">
      {quickMenuItems.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="quick-menu__button"
          aria-label={item.label}
        >
          <img
            className="quick-menu__icon quick-menu__icon--default"
            src={item.icon}
            alt=""
            aria-hidden="true"
          />
          <img
            className="quick-menu__icon quick-menu__icon--active"
            src={item.activeIcon}
            alt=""
            aria-hidden="true"
          />
        </Link>
      ))}

      <button
        type="button"
        className="quick-menu__button"
        aria-label="맨 상단 이동"
        onClick={handleTopClick}
      >
        <img
          className="quick-menu__icon quick-menu__icon--default"
          src="/quick-top.svg"
          alt=""
          aria-hidden="true"
        />
        <img
          className="quick-menu__icon quick-menu__icon--active"
          src="/quick-top-active.svg"
          alt=""
          aria-hidden="true"
        />
      </button>
    </aside>
  )
}

export default QuickMenu
