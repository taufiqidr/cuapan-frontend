import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import PublicHeader from '../../components/PublicHeader'
import PublicFooter from '../../components/PublicFooter'

import { useRegisterMutation } from "./authApiSlice"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {
    useTitle('Register new user')

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation()

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            navigate('/login')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const errClass = isError ? "text-danger text-center" : "offscreen"

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await register({ username, password })
        }
    }

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading
    const canSavebutton = canSave ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-secondary'

    const content = (
        <>
            <PublicHeader />
            <main className="form-signin m-auto">
                <p className={errClass}>{error?.data?.message}</p>
                <form onSubmit={onSaveUserClicked}>
                    <div className="mb-3">
                        <h1 className="text-light">Register</h1>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className='form-label text-light'>Username:</label>
                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            placeholder='enter a new username'
                            onChange={onUsernameChanged}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='form-label text-light'>Password:</label>
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            placeholder='enter a new password'
                            onChange={onPasswordChanged}
                        />
                    </div>
                    <div className="mb-3">
                        <button className={canSavebutton} disabled={!canSave}>Sign Up</button>
                    </div>
                </form>
            </main>
            <PublicFooter />
        </>
    )
    return content
}

export default Register