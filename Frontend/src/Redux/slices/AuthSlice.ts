import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../utils/Interfaces/IUser';


export interface IAuthState {
    isAuthenticated: boolean,
    user: IUser | null,
    error: string | null
};
const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    error: null
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
        },
        setLogout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    }

})

export const { setLogin, setLogout, setError } = authSlice.actions;
export default authSlice.reducer;