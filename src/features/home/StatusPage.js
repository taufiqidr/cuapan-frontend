import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../../components/Loading'
import useTitle from '../../hooks/useTitle'
import { useGetStatusesQuery } from './statusesApiSlice'
import StatusPageView from './StatusPageView'

const StatusPage = () => {
    useTitle('Status')

    const { id } = useParams()

    const { status } = useGetStatusesQuery("statusesList", {
        selectFromResult: ({ data }) => ({
            status: data?.entities[id]
        }),
    })

    if (!status) return <Loading />

    const content = <StatusPageView status={status} />

    return content
}

export default StatusPage