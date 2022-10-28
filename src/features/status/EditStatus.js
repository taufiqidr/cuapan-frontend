import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import ErrorPage from '../../components/ErrorPage'
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import EditStatusView from './EditStatusView'
import { useGetStatusesQuery } from '../slice/statusesApiSlice'

const EditStatus = () => {
    useTitle('Edit Status')
    const { id } = useParams()
    const { username } = useAuth()

    const { status } = useGetStatusesQuery("statusesList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[id]
        }),
    })
    if (!status) return <Loading />

    if (status.username !== username) {
        return <ErrorPage message={'No Access'} />
    }
    const content = <EditStatusView status={status} username={username} />

    return content
}

export default EditStatus