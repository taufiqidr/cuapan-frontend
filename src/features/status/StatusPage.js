import { useParams } from 'react-router-dom'
import ErrorPage from '../../components/ErrorPage'
import useTitle from '../../hooks/useTitle'
import { useGetStatusesQuery } from '../slice/statusesApiSlice'

import StatusPageView from './StatusPageView'

const StatusPage = () => {
    useTitle('Status')

    const { id } = useParams()

    const { status } = useGetStatusesQuery("statusesList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[id]
        }),
    })

    if (!status) return <ErrorPage message={'Status Not Found'} />

    const content = <StatusPageView status={status} />

    return content
}

export default StatusPage