import { createSlice } from '@reduxjs/toolkit'

export interface IntialValue {
    value: {
        username: ''
    }
}
const initialState: IntialValue = {
    value: { username: '' }
}
export const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            console.log(action.payload)
            const { username } = action.payload
            state.value = { username }
        },
        resetCredentials: (state) => {
            state.value = { username: '' }
        },
    },
})

export const { setCredentials, resetCredentials } = authSlice.actions

export default authSlice.reducer