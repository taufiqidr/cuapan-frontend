import { Outlet } from 'react-router-dom'
import Divider from './Divider'
import RightSidebar from './RightSidebar'
import Sidebar from './Sidebar'

const DashLayout = () => {
  return (
    <main className='d-flex'>
      <Sidebar />
      <Divider />
      <Outlet />
      <Divider />
      <RightSidebar />
    </main>
  )
}
export default DashLayout