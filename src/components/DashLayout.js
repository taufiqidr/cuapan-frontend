import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import Sidebar from './Sidebar'

const DashLayout = () => {
  return (
    <div className="container">
      <div className='row'>
        <Sidebar />
        <Outlet />
        <RightSidebar />
      </div>
    </div>

  )
}
export default DashLayout