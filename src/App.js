import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
import Register from './features/auth/Register';
import Home from './features/home/Home';
import StatusPage from './features/home/StatusPage';
import Profile from './features/home/Profile';
import EditStatus from './features/home/EditStatus';
// import EditProfile from './features/user/EditProfile';

function App() {
  useTitle('Cuapan App')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        < Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route index element={<Public />} />
            <Route element={<Prefetch />}>
              <Route path="home" element={<DashLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path=":username" element={<DashLayout />}>
                <Route index element={<Profile />} />
                <Route path="status">
                  <Route index element={<Profile />} />
                  <Route path=":id">
                    <Route index element={<StatusPage />} />
                    <Route path="edit">
                      <Route index element={<EditStatus />} />
                    </Route>
                  </Route>
                </Route>
                {/* <Route path="edit" element={<EditProfile />} /> */}
              </Route>

              {/* <Route path="status" element={<DashLayout />}>
                <Route index element={<Home />} />
                <Route path=":id" element={<StatusPage />} />
              </Route> */}

            </Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;