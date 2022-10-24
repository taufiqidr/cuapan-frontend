import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import Sidebar from './Sidebar'

const DashLayout = () => {
  return (
    <div className='row'>
      <Sidebar />
      <Outlet />
      <RightSidebar />
    </div>
  )
}
export default DashLayout