import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const statusesAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.likes === b.likes) ? 0 : a.likes ? 1 : -1
})

const initialState = statusesAdapter.getInitialState()

export const statusesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStatuses: builder.query({
            query: () => ({
                url: '/statuses',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const loadedStatuses = responseData.map(status => {
                    status.id = status._id
                    return status
                });
                return statusesAdapter.setAll(initialState, loadedStatuses)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Status', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Status', id }))
                    ]
                } else return [{ type: 'Status', id: 'LIST' }]
            }
        }),
        addNewStatus: builder.mutation({
            query: initialStatus => ({
                url: '/statuses',
                method: 'POST',
                body: {
                    ...initialStatus,
                }
            }),
            invalidatesTags: [
                { type: 'Status', id: "LIST" }
            ]
        }),
        updateStatus: builder.mutation({
            query: initialStatus => ({
                url: '/statuses',
                method: 'PATCH',
                body: {
                    ...initialStatus,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Status', id: arg.id }
            ]
        }),
        deleteStatus: builder.mutation({
            query: ({ id }) => ({
                url: `/statuses`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Status', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetStatusesQuery,
    useAddNewStatusMutation,
    useUpdateStatusMutation,
    useDeleteStatusMutation,
} = statusesApiSlice

// returns the query result object
export const selectStatusesResult = statusesApiSlice.endpoints.getStatuses.select()

// creates memoized selector
const selectStatusesData = createSelector(
    selectStatusesResult,
    statusesResult => statusesResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllStatuses,
    selectById: selectStatusById,
    selectIds: selectStatusIds
    // Pass in a selector that returns the statuses slice of state
} = statusesAdapter.getSelectors(state => selectStatusesData(state) ?? initialState)