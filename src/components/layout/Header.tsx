import { Link } from 'react-router-dom'
import MainNav from '../navigation/MainNav'
import MobileMenu from '../navigation/MobileMenu'

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand">
          <span className="site-header__logo-mark" aria-hidden="true">
            <img src="/logo-icon.svg" alt="" />
          </span>
          <span className="site-header__logo-text">CoolRoute</span>
        </Link>
        <MainNav />
        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__icon-button"
            aria-label="검색"
          >
            <img src="/header-search.svg" alt="" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="site-header__icon-button"
            aria-label="다크 모드"
          >
            <img src="/header-moon.svg" alt="" aria-hidden="true" />
          </button>
          <Link to="/login" className="site-header__login">
            로그인
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
