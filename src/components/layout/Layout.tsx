import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import QuickMenu from '../common/QuickMenu'

function Layout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
      <QuickMenu />
    </div>
  )
}

export default Layout
