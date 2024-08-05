import APIService from "../../utils/Class/API";
import { ICredentials } from "../../utils/Interfaces/ICredentials";
import { login, logout } from "../slices/AuthSlice";
import { AppDispatch } from "../store";

export const loginUserByCredentials = (credentials: ICredentials) =>
    async (dispatch: AppDispatch) => {
        try {
            const responseToken = await APIService.GetTokenByCredentials(credentials)
            if (responseToken.ok) {
                localStorage.setItem('token', responseToken.response?.access_token!)
                const responseUser = await APIService.GetUserAuthByToken()

                if (responseUser.ok) {
                    dispatch(login(responseUser.response!));
                }
            }
        } catch (error) {
            console.error('Login failed:', error);
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
            dispatch(logout());
        }
    };
