import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'
import ProfileView from './ProfileView'
import { useGetUsersQuery } from './usersApiSlice'

const Profile = () => {
    useTitle('Profile')

    const { username } = useParams()

    const { user } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            user: data
        }),
    })

    console.log(user);

    if (!user) return <Loading />

    const content = <ProfileView user={user} />

    return content
}

export default Profile