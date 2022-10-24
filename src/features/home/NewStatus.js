import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useAddNewStatusMutation } from "./statusesApiSlice"

const NewStatus = () => {

    const [addNewStatus, {
        isLoading,
        isSuccess,
    }] = useAddNewStatusMutation()
    const { username } = useAuth()

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })
    const user = users.filter((user) => user.username === username)[0]

    const navigate = useNavigate()

    const [text, setText] = useState('')
    const [userId] = useState(user._id)

    useEffect(() => {
        if (isSuccess) {
            setText('')
            navigate('/home')
        }
    }, [isSuccess, navigate])

    const onTextChanged = e => setText(e.target.value)

    const canSave = [text, userId].every(Boolean) && !isLoading

    const onSaveStatusClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewStatus({ user: userId, text })
        }
    }

    const content = (
        <div className="mt-2 mb-3 me-2 ms-2 border-bottom border-secondary">
            <form className="form" onSubmit={onSaveStatusClicked}>
                <textarea
                    className="form-control bg-dark text-light textarea"
                    rows={3}
                    placeholder='Write something'
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="text-end mb-2 m-auto">
                    <button
                        className="btn btn-primary text-light"
                        disabled={!canSave}
                    >Post</button>
                </div>
            </form>
        </div>
    )

    return content
}

export default NewStatus