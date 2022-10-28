import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import Loading from "../../components/Loading"

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)
    const navigate = useNavigate()
    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { // React 18 Strict Mode

            const verifyRefreshToken = async () => {
                try {
                    //const response = 
                    await refresh()
                    //const { accessToken } = response.data
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            if (!token && persist) verifyRefreshToken()
        }
        return () => effectRan.current = true
        // eslint-disable-next-line
    }, [])

    let content
    if (!persist) { // persist: no
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        content = <Loading />
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='alert alert-danger'>
                {`${error?.data?.message} - `}
                Redirecting you to login page
            </p>
        )
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        content = <Outlet />
    }

    return content
}
export default PersistLogin