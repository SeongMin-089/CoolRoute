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
import StoreOrderManagement from '../pages/dashboard/subpages/StoreOrderManagement'
import StoreDeliveryStatus from '../pages/dashboard/subpages/StoreDeliveryStatus'
import StoreDisposalManagement from '../pages/dashboard/subpages/StoreDisposalManagement'
import DriverDeliveryList from '../pages/dashboard/subpages/DriverDeliveryList'
import DriverReturnPickup from '../pages/dashboard/subpages/DriverReturnPickup'
import DriverUndeliveredManagement from '../pages/dashboard/subpages/DriverUndeliveredManagement'
import CenterInventoryManagement from '../pages/dashboard/subpages/CenterInventoryManagement'
import CenterOrderProcessing from '../pages/dashboard/subpages/CenterOrderProcessing'
import CenterInboundOutboundHistory from '../pages/dashboard/subpages/CenterInboundOutboundHistory'
import CenterWarehouseTemperature from '../pages/dashboard/subpages/CenterWarehouseTemperature'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/store" element={<StoreDashboard />} />
        <Route
          path="/dashboard/store/orders"
          element={<StoreOrderManagement />}
        />
        <Route
          path="/dashboard/store/delivery"
          element={<StoreDeliveryStatus />}
        />
        <Route
          path="/dashboard/store/disposal"
          element={<StoreDisposalManagement />}
        />
        <Route path="/dashboard/driver" element={<DriverDashboard />} />
        <Route
          path="/dashboard/driver/deliveries"
          element={<DriverDeliveryList />}
        />
        <Route
          path="/dashboard/driver/returns"
          element={<DriverReturnPickup />}
        />
        <Route
          path="/dashboard/driver/undelivered"
          element={<DriverUndeliveredManagement />}
        />
        <Route path="/dashboard/center" element={<CenterDashboard />} />
        <Route
          path="/dashboard/center/inventory"
          element={<CenterInventoryManagement />}
        />
        <Route
          path="/dashboard/center/orders"
          element={<CenterOrderProcessing />}
        />
        <Route
          path="/dashboard/center/inout"
          element={<CenterInboundOutboundHistory />}
        />
        <Route
          path="/dashboard/center/temperature"
          element={<CenterWarehouseTemperature />}
        />
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/business" element={<Business />} />
          <Route path="/solution" element={<Solution />} />
          <Route path="/logistics-info" element={<LogisticsInfo />} />
          <Route path="/support" element={<Support />} />
          <Route path="/recruit" element={<Recruit />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
