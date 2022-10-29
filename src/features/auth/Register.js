import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useTitle from '../../hooks/useTitle'
import PublicHeader from '../../components/PublicHeader'
import PublicFooter from '../../components/PublicFooter'
import { useRegisterMutation } from "./authApiSlice"
import PublicLoading from '../../components/PublicLoading'
import { isLeapYear } from 'date-fns'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const Register = () => {
    useTitle('Register new user')

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [day, setDay] = useState('')
    const [month, setMonth] = useState('')
    const [year, setYear] = useState('')
    const [dob, setDob] = useState('')

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
        setDob(new Date(Date.UTC(year, month, day)))
    }, [day, month, year])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setEmail('')
            setPassword('')
            setName('')
            setDay('')
            setMonth('')
            setYear('')
            navigate('/login')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onNameChanged = e => setName(e.target.value)

    const errClass = isError ? "text-danger text-center" : "offscreen"

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await register({ username, email, password, name, dob })
        }
    }

    if (isLoading) {
        return <PublicLoading />
    }

    const canSave = [validUsername, validPassword, email, name, dob].every(Boolean) && !isLoading
    const canSavebutton = canSave ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-secondary'

    let days = []
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let years = []

    const onDayChanged = e => setDay(e.target.value)
    const onMonthChanged = e => setMonth(months.indexOf(e.target.value))
    const onYearChanged = e => setYear(e.target.value)
    const day_31 = [0, 2, 4, 6, 7, 9, 11]
    const day_30 = [3, 5, 8, 10]
    let max_day = 1
    if (day_31.includes(month)) {
        max_day = 31
    }
    else if (day_30.includes(month)) {
        max_day = 30
    } else if (month === 1) {
        if (isLeapYear(new Date(year))) max_day = 29
        else max_day = 28
    }
    for (let i = 1; i <= max_day; i++) {
        days.push(i)
    }
    for (let i = 1920; i <= 2010; i++) {
        years.push(i)
    }

    const optionsDay = days.map(
        day => {
            return (
                <option
                    key={day}
                    value={day}
                > {day}</option >
            )
        }
    )

    const optionsMonth = months.map(
        month => {
            return (
                <option
                    key={month}
                    value={month}
                > {month}</option >
            )
        }
    )
    const optionsYear = years.map(
        year => {
            return (
                <option
                    key={year}
                    value={year}
                > {year}</option >
            )
        }
    ).reverse()

    const content = (
        <>
            <PublicHeader />
            <main className="form-signin m-auto">
                {isLoading && <PublicLoading />}
                <p className={errClass}>{error?.data?.message}</p>
                <div className="mb-3">
                    <h1 className="text-light">Register</h1>
                </div>
                <form onSubmit={onSaveUserClicked}>
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
                        <label htmlFor="email" className='form-label text-light'>Email:</label>
                        <input
                            className="form-control"
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            value={email}
                            placeholder='name@email.com'
                            onChange={onEmailChanged}
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
                    <hr />
                    <div className="mb-3">
                        <label htmlFor="name" className='form-label text-light'>Name:</label>
                        <input
                            className="form-control"
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="off"
                            value={name}
                            placeholder='enter your name'
                            onChange={onNameChanged}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dob" className='form-label text-light'>Date of birth:</label>
                        <div className="d-flex">
                            <select name="day" id="day" value={day} onChange={onDayChanged} className="form-select flex-column me-2 p-1">
                                <option disabled className='text-muted'>Day</option>
                                {optionsDay}
                            </select>
                            <select name="month" id="month" value={month} onChange={onMonthChanged} className="form-select flex-column me-2">
                                <option disabled className='text-muted'>Month</option>
                                {optionsMonth}
                            </select>
                            <select name="year" id="year" value={year} onChange={onYearChanged} className="form-select flex-column">
                                <option disabled className='text-muted'>Year</option>
                                {optionsYear}
                            </select>
                        </div>
                    </div>
                    <hr />
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