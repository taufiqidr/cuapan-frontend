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
    const [register, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRegisterMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)

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
    const errClass = isError ? "errmsg" : "offscreen"





    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await register({ username, password })
        }
    }

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading
    const canSavebutton = canSave ? 'w-100 btn btn-lg btn-primary' : 'w-100 btn btn-lg btn-secondary'


    const content = (

        <section>
            <PublicHeader />
            <main className="form-signin w-100 m-auto">
                <p className={errClass}>{error?.data?.message}</p>


                <form onSubmit={onSaveUserClicked}>
                    <h1 className="h3 mb-3 fw-normal">Register a new account</h1>
                    <div className="form-floating">

                        <input
                            className="form-control"
                            id="username"
                            name="username"
                            type="text"
                            autoComplete="off"
                            value={username}
                            onChange={onUsernameChanged}
                        />
                        <label htmlFor="username">Username:</label>
                    </div>
                    <div className="form-floating">
                        <input
                            className="form-control"
                            id="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={onPasswordChanged}
                        />
                        <label htmlFor="password">Password:</label>
                    </div>
                    <button className={canSavebutton} disabled={!canSave}>Sign Up</button>
                </form>
            </main>
            <PublicFooter />
        </section>
    )
    return content
}

export default Register