
import { TUser } from '@/types/user'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../store'

type Tstate = {
    user: TUser | null
    token: string | null
}

const initialState: Tstate = {
    user: null,
    token: null
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { user } = action.payload || {}

            if (!user) {
                console.error('Invalid payload received:', action.payload)
                return
            }
            state.user = user
        },
        logout: state => {
            state.user = null
            state.token = null
        }
    }
})

export const { setUser, logout } = authSlice.actions

export const selectUser = (state: RootState) => state.auth

const authReducer = authSlice.reducer
export default authReducer