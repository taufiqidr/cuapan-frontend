import { isLeapYear } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Bar from '../../components/Bar'
import { useUpdateUserMutation } from '../slice/usersApiSlice'

const USER_REGEX = /^[A-z]{3,20}$/

const EditProfileView = ({ user }) => {
    const [id] = useState(user.id ? user.id : '')
    const [username, setUsername] = useState(user.username ? user.username : '')
    const [validUsername, setValidUsername] = useState(false)
    const [email, setEmail] = useState(user.email ? user.email : '')
    const [name, setName] = useState(user.name ? user.name : '')
    const [description, setDescription] = useState(user.description ? user.description : '')
    const [day, setDay] = useState(user.dob ? new Date(user.dob).getDate() : '')
    const [month, setMonth] = useState(user.dob ? new Date(user.dob).getMonth() : '')
    const [year, setYear] = useState(user.dob ? new Date(user.dob).getFullYear() : '')
    const [dob, setDob] = useState(user.dob ? user.dob : '')

    const [updateUser, {
        isLoading,
        isSuccess,
    }] = useUpdateUserMutation()

    const navigate = useNavigate()
    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setDob(new Date(Date.UTC(year, month, day)))
    }, [day, month, year])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setEmail('')
            setName('')
            setDay('')
            setMonth('')
            setYear('')
            navigate(`/${user.username}`)
        }
    }, [isSuccess, navigate, user.username])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onEmailChanged = e => setEmail(e.target.value)
    const onNameChanged = e => setName(e.target.value)
    const onDescriptionChanged = e => setDescription(e.target.value)

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await updateUser({ id: user.id, username, email, name, description, dob })
        }
    }

    const canSave = [validUsername, email, name, dob].every(Boolean) && !isLoading
    const canSavebutton = canSave ? 'btn btn-lg btn-primary' : 'btn btn-lg btn-secondary'

    let days = []
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let years = []

    const onDayChanged = e => {
        setDay(e.target.value)
    }
    const onMonthChanged = e => {
        setMonth(months.indexOf(e.target.value))
    }
    const onYearChanged = e => {
        setYear(e.target.value)
    }

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
        <div  >
            <Bar title={'Edit Profile'} />
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
                    <label htmlFor="description" className='form-label text-light'>Description:</label>
                    <textarea
                        className="textarea form-control bg-black text-light border shadow-none"
                        rows={6}
                        placeholder='Write your description'
                        id="description"
                        name="description"
                        value={description}
                        onChange={onDescriptionChanged}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dob" className='form-label text-light'>Date of birth:</label>
                    <div className="d-flex">
                        <select name="day" id="day" value={day} onChange={onDayChanged} className="form-select flex-column me-2 p-1">
                            <option disabled className='text-muted'>Day</option>
                            {optionsDay}
                        </select>
                        <select name="month" id="month" value={months[month]} onChange={onMonthChanged} className="form-select flex-column me-2">
                            <option disabled className='text-muted'>Month</option>
                            {optionsMonth}
                        </select>
                        <select name="year" id="year" value={year} onChange={onYearChanged} className="form-select flex-column">
                            <option disabled className='text-muted'>Year</option>
                            {optionsYear}
                        </select>
                    </div>
                </div>
                <div className="mb-3">
                    {dob === 'Invalid Date' && <p className='alert alert-danger'>Invalid Date</p>}
                    {/* {console.log(validDob)} */}
                </div>
                <hr />
                <div className="mb-3">
                    <button className={canSavebutton} disabled={!canSave}>Save</button>
                </div>
            </form>
        </div>
    )
    return content
}

export default EditProfileView