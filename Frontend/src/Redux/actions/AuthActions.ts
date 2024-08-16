import APIService from "../../utils/Class/API";
import { ICredentials } from "../../utils/Interfaces/ICredentials";
import { setLogin, setLogout, setError } from "../slices/AuthSlice";
import { AppDispatch } from "../store";

export const loginUserByCredentials = (credentials: ICredentials) =>
    async (dispatch: AppDispatch) => {
        try {
            const responseToken = await APIService.GetTokenByCredentials(credentials)
            if (responseToken.ok) {
                localStorage.setItem('token', responseToken.response?.access_token!)
                const responseUser = await APIService.GetUserAuthByToken()

                if (responseUser.ok) {
                    dispatch(setLogin(responseUser.response!));
                } else {
                    dispatch(setError(responseUser.error!!));
                }
            } else {
                dispatch(setError(responseToken.error!!));
            }
        } catch (error) {
            console.log("fallo")
            if (error instanceof Error)
                dispatch(setError(error.message));
        }
    };

export const logOutAction = () =>
    async (dispatch: AppDispatch) => {
        try {
            localStorage.removeItem('token');
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            APIService.setToken("")
            dispatch(setLogout());
        }
    };

export const clearAuthError = () =>
    async (dispatch: AppDispatch) => {
        dispatch(setError(null))
    }