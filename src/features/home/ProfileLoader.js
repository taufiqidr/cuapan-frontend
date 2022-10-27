import React from 'react'
import { useParams } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import Profile from './Profile'
import { useGetUsersQuery } from './usersApiSlice'

const ProfileLoader = () => {
    const { username } = useParams()
    useTitle(`Profile: ${username}`)

    const {
        data: users
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    const { entities } = users
    let arr = []
    Object.keys(entities).forEach(function (key, index) {
        arr.push(entities[key])
    });

    const user = arr.filter(user => user.username === username)[0]
    const content = <Profile user={user} />

    return content
}

export default ProfileLoader