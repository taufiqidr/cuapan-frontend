import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Public = () => {
  const { username } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (username) {
      navigate('/home');
    }
  }, [username, navigate])

}
export default Public