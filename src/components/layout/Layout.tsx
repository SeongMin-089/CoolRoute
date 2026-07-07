import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import QuickMenu from '../common/QuickMenu'

function Layout() {
  

  const isDashboardPage = location.pathname.startsWith("/dashboard");

  return (
    <div
      className={`app-layout ${isDashboardPage ? "app-layout--dashboard" : ""}`}
    >
      {!isDashboardPage && <Header />}

      <main
        className={`app-main ${isDashboardPage ? "app-main--dashboard" : ""}`}
      >
        <Outlet />
      </main>

      {!isDashboardPage && <Footer />}
      {!isDashboardPage && <QuickMenu />}
    </div>
  );
}

export default Layout;
