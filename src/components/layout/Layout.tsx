import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import QuickMenu from '../common/QuickMenu'
import ScrollToHash from '../common/ScrollToHash'

function Layout() {
  return (
    <div className="app-layout">
      <ScrollToHash />
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
