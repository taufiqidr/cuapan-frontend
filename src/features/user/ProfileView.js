import React, { useState } from 'react'

const ProfileView = ({ user }) => {
    const [username] = useState(user.username)

    return (
        <h1>{username}</h1>
    )
}

export default ProfileView