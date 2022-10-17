import { useState, useEffect } from "react"
import { useUpdateStatusMutation, useDeleteStatusMutation } from "./statusesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditStatusForm = ({ status, users }) => {

    const { isAdmin } = useAuth()

    const [updateStatus, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateStatusMutation()

    const [deleteStatus, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteStatusMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(status.title)
    const [text, setText] = useState(status.text)
    const [completed, setCompleted] = useState(status.completed)
    const [userId, setUserId] = useState(status.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/statuses')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveStatusClicked = async (e) => {
        if (canSave) {
            await updateStatus({ id: status.id, user: userId, title, text, completed })
        }
    }

    const onDeleteStatusClicked = async () => {
        await deleteStatus({ id: status.id })
    }

    const created = new Date(status.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(status.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    let deleteButton = null
    if (isAdmin) {
        deleteButton = (
            <button
                className="icon-button"
                title="Delete"
                onClick={onDeleteStatusClicked}
            >
                <FontAwesomeIcon icon={faTrashCan} />
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Status #{status.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveStatusClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div>
                </div>
                <label className="form__label" htmlFor="status-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="status-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="status-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="status-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="status-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="status-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="status-username">
                            ASSIGNED TO:</label>
                        <select
                            id="status-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditStatusForm