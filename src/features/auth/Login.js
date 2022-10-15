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

const Login = () => {
  useTitle('Employee Login')

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

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <PulseLoader color={"#FFF"} />

  const content = (

    <section>
      <PublicHeader />
      <main className="form-signin w-100 m-auto">
        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form onSubmit={handleSubmit}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">

            <input
              className="form-control"
              type="text"
              id="username"
              ref={userRef}
              value={username}
              onChange={handleUserInput}
              autoComplete="off"
              required
            />
            <label htmlFor="username">Username:</label>
          </div>
          <div className="form-floating">
            <input
              className="form-control"
              type="password"
              id="password"
              onChange={handlePwdInput}
              value={password}
              required
            />
            <label htmlFor="password">Password:</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary">Sign In</button>

          <div className="checkbox mb-3">
            <label htmlFor="persist">
              <input
                type="checkbox"
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
    </section>
  )

  return content
}
export default Login