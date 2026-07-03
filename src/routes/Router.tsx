import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import Home from '../pages/Home'
import Company from '../pages/Company'
import Business from '../pages/Business'
import Solution from '../pages/Solution'
import LogisticsInfo from '../pages/LogisticsInfo'
import Support from '../pages/Support'
import Recruit from '../pages/Recruit'
import Login from '../pages/login/Login'
import StoreDashboard from '../pages/dashboard/StoreDashboard'
import DriverDashboard from '../pages/dashboard/DriverDashboard'
import CenterDashboard from '../pages/dashboard/CenterDashboard'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/business" element={<Business />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/logistics-info" element={<LogisticsInfo />} />
          <Route path="/support" element={<Support />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/dashboard/store" element={<StoreDashboard />} />
          <Route path="/dashboard/driver" element={<DriverDashboard />} />
          <Route path="/dashboard/center" element={<CenterDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
