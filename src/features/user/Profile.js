import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'
import ProfileView from './ProfileView'
import { useGetUsersQuery } from './usersApiSlice'

const Profile = () => {
    useTitle('Profile')

    const { username } = useParams()

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    const user = users.filter((user) => user.username === username)[0]

    if (!user) return <Loading />

    const content = <ProfileView user={user} />

    return content
}

export default Profile