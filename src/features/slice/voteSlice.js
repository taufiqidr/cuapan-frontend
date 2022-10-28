import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    dislike: false,
    like: false
}

export const voteSlice = createSlice({
    name: 'vote',
    initialState,
    reducers: {
        upvote: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.like = true
        },
        downvote: (state) => {
            state.dislike = true
        },
        closeup: (state) => {
            state.like = false
        },
        closedown: (state) => {
            state.dislike = false
        }
    },
})

// Action creators are generated for each case reducer function
export const { upvote, downvote, closeup, closedown } = voteSlice.actions

export default voteSlice.reducer