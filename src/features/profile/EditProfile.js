import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import EditProfileView from './EditProfileView'
import { useGetUsersQuery } from '../slice/usersApiSlice'

const EditProfile = () => {
    const { username } = useAuth()
    const { username: username_params } = useParams()
    const navigate = useNavigate()

    useTitle(`Edit Profile: ${username}`)

    useEffect(() => {
        if (username !== username_params) {
            console.log('cant edit other user profile');
            navigate('/home');
        }
    }, [username, username_params, navigate])

    const {
        data: users,
        isSuccess: successUser,
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (successUser) {
        const { entities: userent } = users
        let arr = []
        Object.keys(userent).forEach(function (key, index) {
            arr.push(userent[key])
        });
        const user = arr.filter(user => user.username === username)[0]
        content = <EditProfileView user={user} />
    }

    return content

}

export default EditProfile