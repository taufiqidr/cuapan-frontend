import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import StatusesList from './features/statuses/StatusesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditStatus from './features/statuses/EditStatus'
import NewStatus from './features/statuses/NewStatus'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/roles'
import useTitle from './hooks/useTitle';
import Register from './features/auth/Register';
import Home from './features/home/Home';
import StatusPage from './features/home/StatusPage';
import Profile from './features/user/Profile';

function App() {
  useTitle('Cuapan')

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected Routes */}
        < Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
            <Route element={<Prefetch />}>
              <Route path="home" element={<DashLayout />}>
                <Route index element={<Home />} />
                {/* add something */}
                <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path=":id" element={<EditUser />} />
                    <Route path="new" element={<NewUserForm />} />
                  </Route>
                </Route>
                <Route path="statuses">
                  <Route index element={<StatusesList />} />
                  <Route path=":id" element={<EditStatus />} />
                  <Route path="new" element={<NewStatus />} />
                </Route>
              </Route>{/* End Dash */}
              <Route path=":username" element={<DashLayout />}>
                <Route index element={<Profile />} />
                <Route path=":id" element={<StatusPage />} />
              </Route>
            </Route>
          </Route>
        </Route>{/* End Protected Routes */}

      </Route>
    </Routes >
  );
}

export default App;