// import React from 'react'
// import Loading from '../../components/Loading'
// import useAuth from '../../hooks/useAuth'
// import useTitle from '../../hooks/useTitle'
// import NewStatus from '../home/NewStatus'
// import { useGetStatusesQuery } from './statusesApiSlice'
// // import { useGetUsersQuery } from '../users/usersApiSlice'

// const Profile = () => {
//     // const { username } = useAuth()

//     // const { users } = useGetUsersQuery("usersList", {
//     //     selectFromResult: ({ data }) => ({
//     //         users: data?.ids.map(id => data?.entities[id])
//     //     }),
//     // })

//     // const user = users.filter((user) => user.username === username)[0]

//     const { username } = useAuth()
//     useTitle(`Profile: ${username}`)

//     const {
//         data: statuses,
//         isLoading,
//         isSuccess,
//         isError,
//         error
//     } = useGetStatusesQuery('statusesList', {
//         pollingInterval: 15000,
//         refetchOnFocus: true,
//         refetchOnMountOrArgChange: true
//     })

//     let content
//     let load

//     if (isLoading) load = <Loading />
//     if (isError) load = <p className="errmsg">{error?.data?.message}</p>

//     if (isSuccess) {
//         const { ids } = statuses
//         let Ids = [...ids]

//         const tableContent = ids?.length && Ids.map(statusId => <Status key={statusId} statusId={statusId} username={statuses.entities[statusId].username} />).sort((a, b) => {
//             return new Date(b.createdAt) - new Date(a.createdAt);
//         }).reverse()

//         content = (
//             <div className="d-flex flex-column feed border-start border-end border-secondary col-6" >
//                 <div className="p-1 sticky-top bg-black">
//                     <h4 className="text-light">Home</h4>
//                 </div>
//                 <NewStatus />
//                 {load}
//                 <div className="list-group list-group-flush scrollarea">
//                     {tableContent}
//                 </div>
//             </div>
//         )
//     }

//     return content
// }

// export default Profile