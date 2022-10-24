import React, { useEffect, useState } from 'react'
import { ArrowLeft } from 'react-bootstrap-icons'
import { Link, useNavigate } from 'react-router-dom'
import { useUpdateUserMutation } from './usersApiSlice'

const USER_REGEX = /^[A-z]{3,20}$/

const EditProfileView = ({ user }) => {
    const [id] = useState(user.id)
    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [email, setEmail] = useState(user.email)
    const [name, setName] = useState(user.name)
    const [day, setDay] = useState(new Date(user.dob).getDate().toString())
    const [month, setMonth] = useState(new Date(user.dob).getMonth().toString())
    const [year, setYear] = useState(new Date(user.dob).getFullYear().toString())
    const [dob, setDob] = useState(user.dob)
    const [updateUser, {
        isLoading,
        isSuccess,
    }] = useUpdateUserMutation()

    const navigate = useNavigate()
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setDob(`${day}-${month}-${year}`)
    }, [day, month, year])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setEmail('')
            setName('')
            setDay('')
            setMonth('')
            setYear('')
            navigate(`{/${user.username}}`)
        }
    }, [isSuccess, navigate, user.username])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onNameChanged = e => setName(e.target.value)

    const onDayChanged = e => setDay(e.target.value)
    const onMonthChanged = e => setMonth(e.target.value)
    const onYearChanged = e => setYear(e.target.value)

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateUser({ id: user.id, username, email, name, dob })
        }
    }

    const canSave = [validUsername, email, name, dob].every(Boolean) && !isLoading
    const canSavebutton = canSave ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-secondary'

    let days = []
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let years = []
    for (let i = 1; i <= 31; i++) {
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
        <div className="d-flex flex-column feed border-start border-end border-secondary col-6" >
            <div className="p-1 border-bottom border-secondary">
                <h3 className="text-start text-light">
                    <Link to="/home">
                        <span className='me-2'>
                            <ArrowLeft />
                        </span>
                    </Link>
                    Edit Profile
                </h3>
            </div>
            <form onSubmit={onSaveUserClicked}>
                <div className="mb-3">
                    <input type="hidden" value={id} />
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
                            <option>Day</option>
                            {optionsDay}
                        </select>
                        <select name="month" id="month" value={months[month]} onChange={onMonthChanged} className="form-select flex-column me-2">
                            <option>Month</option>
                            {optionsMonth}
                        </select>
                        <select name="year" id="year" value={year} onChange={onYearChanged} className="form-select flex-column">
                            <option>Year</option>
                            {optionsYear}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="mb-3">
                    <button className={canSavebutton} disabled={!canSave}>Sign Up</button>
                </div>
            </form>
        </div>
    )

    return content
}

export default EditProfileView