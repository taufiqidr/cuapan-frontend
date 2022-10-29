import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from '../../components/Bar'
import { useUpdateStatusMutation } from '../slice/statusesApiSlice'

const EditStatusView = ({ status, username }) => {
    const [updateStatus, {
        isLoading,
        isSuccess,
    }] = useUpdateStatusMutation()

    const navigate = useNavigate()

    const [text, setText] = useState(status.text)
    const [userId, setUserId] = useState(status.user)

    useEffect(() => {

        if (isSuccess) {
            setText('')
            setUserId('')
            navigate(`/${username}`)
        }

    }, [isSuccess, username, navigate])

    const onTextChanged = e => setText(e.target.value)

    const canSave = text && !isLoading

    const onSaveStatusClicked = async (e) => {
        if (canSave) {
            await updateStatus({ id: status.id, user: userId, text })
        }
    }

    return (
        <div  >
            <Bar title={'Edit Status'} />
            <div className="mt-2 mb-3 me-2 ms-2 border-bottom border-secondary">
                <form className='form' onSubmit={e => e.preventDefault()}>
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
                            onClick={onSaveStatusClicked}
                        >Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditStatusView