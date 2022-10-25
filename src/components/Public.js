import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Public = () => {
  const { username } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (username) {
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    }

  }, [username, navigate])

}
export default Public