import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import MainLayout from './components/MainLayout'

import Login from './features/auth/Login';
import Register from './features/auth/Register';
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'

import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';

import Home from './features/home/Home';
import SearchResult from './features/home/SearchResult';

import StatusPage from './features/status/StatusPage';
import EditStatus from './features/status/EditStatus';

import Profile from './features/profile/Profile';
import EditProfile from './features/profile/EditProfile';

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
              <Route path="home" element={<MainLayout />}>
                <Route index element={<Home />} />
              </Route>
              <Route path="search/:keyword" element={<MainLayout />}>
                <Route index element={<SearchResult />} />
              </Route>
              <Route path=":username" element={<MainLayout />}>
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
                <Route path="edit">
                  <Route index element={<EditProfile />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes >
  );
}

export default App;