import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"

const CheckLogin = () => {
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

    useEffect(() => {
        if (!persist) { // persist: no
            navigate('/home')
        } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
            navigate('/home')
        } else if (token && isUninitialized) { //persist: yes, token: yes
            navigate('/home')
        }
    }, [persist, isSuccess, trueSuccess, token, isUninitialized, navigate])
    let content
    if (isLoading) { //persist: yes, token: no
        content = <Outlet />
    } else if (isError) { //persist: yes, token: no
        content = <Outlet />
    }

    return content
}
export default CheckLogin