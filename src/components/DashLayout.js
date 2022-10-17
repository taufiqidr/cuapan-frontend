import { Outlet } from 'react-router-dom'
import Divider from './Divider'
import RightSidebar from './RightSidebar'
// import DashHeader from './DashHeader'
// import DashFooter from './DashFooter'
import Sidebar from './Sidebar'

const DashLayout = () => {
  return (
    <main className='d-flex'>
      {/* <DashHeader /> */}
      <Sidebar />
      <Divider />
      <Outlet />
      <Divider />
      <RightSidebar />

      {/* <DashFooter /> */}
    </main>
  )
}
export default DashLayout