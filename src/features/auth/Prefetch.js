import { store } from '../../app/store'
import { statusesApiSlice } from '../slice/statusesApiSlice'
import { usersApiSlice } from '../slice/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {

    useEffect(() => {
        store.dispatch(statusesApiSlice.util.prefetch('getStatuses', 'statusesList', { force: true }))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', { force: true }))
    }, [])

    return <Outlet />
}
export default Prefetch