// import { Link } from 'react-router-dom'
import { useGetStatusesQuery } from "../statuses/statusesApiSlice"
import useAuth from '../../hooks/useAuth'
import useTitle from '../../hooks/useTitle'
import PulseLoader from 'react-spinners/PulseLoader'
import Status from "./Status"
import './welcome.css'
import NewStatus from "./NewStatus"

const Welcome = () => {
  // const date = new Date()
  // const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)
  const { username } = useAuth()
  useTitle(`Home: ${username}`)

  const {
    data: statuses,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetStatusesQuery('statusesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  })

  let content

  if (isLoading) content = (
    <div className="d-flex flex-column flex-shrink-0 feed bg-dark" >
      <div className="d-flex flex-shrink-0 p-3 link-dark border-bottom border-secondary">
        <h3 className="text-center text-light">Home</h3>
      </div>
      <div className="m-auto">
        <PulseLoader color={"#FFF"} />
      </div>
    </div>
  )
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = statuses
    let filteredIds = [...ids]

    const tableContent = ids?.length && filteredIds.map(statusId => <Status key={statusId} statusId={statusId} />).sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    }).reverse()

    content = (
      <div className="d-flex flex-column flex-shrink-0 feed" >
        <div className="p-1 border-bottom border-secondary">
          <h3 className="text-center text-light">Home</h3>
        </div>
        <NewStatus />
        <div className="list-group list-group-flush scrollarea">
          {tableContent}
        </div>
      </div>
    )
  }

  return content
}
export default Welcome