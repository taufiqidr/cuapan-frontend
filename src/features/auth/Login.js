import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import PublicHeader from '../../components/PublicHeader'
import PublicFooter from '../../components/PublicFooter'
import './login.css';

const Login = () => {
  useTitle('Login')

  const userRef = useRef()
  const errRef = useRef()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [persist, setPersist] = usePersist()

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [username, password])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ username, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setUsername('')
      setPassword('')
      navigate('/dash')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response');
      } else if (err.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current.focus();
    }
  }

  const handleUserInput = (e) => setUsername(e.target.value)
  const handlePwdInput = (e) => setPassword(e.target.value)
  const handleToggle = () => setPersist(prev => !prev)

  const errClass = errMsg ? "text-danger text-center" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"} />

  const content = (
    <>
      <PublicHeader />
      <main className="form-signin m-auto">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h1 className="text-light">Sign in</h1>
          </div>
          <div className="mb-3">
            <label htmlFor="username" className='form-label text-light'>Username:</label>
            <input
              className="form-control"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              placeholder='enter your username'
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className='form-label text-light'>Password:</label>
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              placeholder='enter your password'
              required
            />
          </div>
          <div className="mb-3">
            <button className=" btn btn-lg btn-primary">Sign In</button>
          </div>
          <div className="checkbox mb-3">
            <label htmlFor="persist" className='form-label text-light'>
              <input
                type="checkbox"
                className='me-3'
                id="persist"
                onChange={handleToggle}
                checked={persist}
              />
              Trust This Device
            </label>
          </div>
        </form>
      </main>
      <PublicFooter />
    </>
  )

  return content
}
export default Login