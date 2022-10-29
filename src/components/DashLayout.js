import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import Sidebar from './Sidebar'

const DashLayout = () => {
  return (
    <div className="container-fluid">
      <div className='row'>
        <div className="col-3">
          <Sidebar />
        </div>
        <div className="col-6 ">
          <main>
            <Outlet />
          </main>
        </div>
        <div className="col-3">
          <RightSidebar />
        </div>
      </div>
    </div>

  )
}
export default DashLayout