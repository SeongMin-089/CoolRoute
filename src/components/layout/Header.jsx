import { Link } from 'react-router-dom'
import MainNav from '../navigation/MainNav'
import MobileMenu from '../navigation/MobileMenu'

function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link to="/" className="site-header__logo">
          CoolRoute
        </Link>
        <MainNav />
        <div className="site-header__actions">
          <Link to="/login" className="site-header__login">
            Login
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
}

export default Header
