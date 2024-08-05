import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { IUser } from "../Interfaces/IUser";
import { ICredentials } from "../Interfaces/ICredentials";
import { IApiResponse } from "../Interfaces/IApiResponse";
import ApiResponseFactory from "./ApiResponseFactory";
import IToken from "../Interfaces/IToken";
import ITodo from "../Interfaces/ITodo";

class _APIService {
    private _backend_URL: string;
    /**Only use for Debug*/
    private _logger: boolean;
    private _token: string = "";

    constructor() {

        this._backend_URL = "http://localhost:80/api";
        this._logger = true;
    }

    public setToken(token: string) {
        this._token = token;
    }

    private get HeaderWithAuthorization(): AxiosRequestConfig {
        return {
            headers: {
                Pragma: 'no-cache',
                Expires: '0',
                Cache: 'no-cache',
                Authorization: `Bearer ${this._token}`
            }
        }
    }
    private handleError<T>(error: AxiosError | Error | string): IApiResponse<T> {
        if (error instanceof Error) {
            if (error instanceof AxiosError) {
                const innerError = error.response?.data?.message
                if (this._logger) console.log(`Error in _API: ${error.message}`)
                return ApiResponseFactory.createFailure<T>(innerError || error.message)
            } else {
                if (this._logger) console.log(`Error in _API: ${error.message}`)
                return ApiResponseFactory.createFailure<T>(error)
            }
        }
        if (this._logger) console.log(`Error in _API: ${error}`)
        return ApiResponseFactory.createFailure<T>(error)
    }

    public async GetTokenByCredentials(Credentials: ICredentials): Promise<IApiResponse<IToken>> {
        try {
            const response = await axios.post(`${this._backend_URL}/login`, Credentials)
                .then((res: AxiosResponse<IToken>) => res.data);

            this.setToken(response.access_token)
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to GetUserByCredentials')
        }
    }

    public async GetUserAuthByToken(): Promise<IApiResponse<IUser>> {
        try {
            const response = await axios.get(`${this._backend_URL}/users`, this.HeaderWithAuthorization)
                .then((res: AxiosResponse<IUser>) => res.data);
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to GetUserByCredentials')
        }
    }
    public async CreateUser(user: IUser): Promise<IApiResponse<IUser>> {
        try {
            const response = (await axios.post(`${this._backend_URL}/users`, user, this.HeaderWithAuthorization).
                then((res: AxiosResponse<IUser>) => res.data))
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                return this.handleError(error)
            } else if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to CreateUser')
        }
    }

    public async GetTodosUser(complete?: boolean): Promise<IApiResponse<ITodo[]>> {
        try {
            let query = ""
            if (complete!! || complete === false) {
                query = `?complete=${complete ? true : false}`
            }
            const response = await axios.get(`${this._backend_URL}/todos${query}`, this.HeaderWithAuthorization)
                .then((res: AxiosResponse<ITodo[]>) => res.data);
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to GetTodosUser')
        }
    }

    public async CreateTodo(todo: ITodo): Promise<IApiResponse<ITodo>> {
        try {
            const response = (await axios.post(`${this._backend_URL}/todos`, todo, this.HeaderWithAuthorization).
                then((res: AxiosResponse<ITodo>) => res.data))
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                return this.handleError(error)
            } else if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to CreateTodo')
        }
    }
    public async DeleteTodo(idTodo: number): Promise<IApiResponse<ITodo>> {
        try {
            const response = (await axios.delete(`${this._backend_URL}/todos/${idTodo}`, this.HeaderWithAuthorization).
                then((res: AxiosResponse<ITodo>) => res.data))
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                return this.handleError(error)
            } else if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to DeleteTodo')
        }
    }
    public async UpdateTodos(todos: ITodo[]): Promise<IApiResponse<ITodo[]>> {
        try {
            const response = (await axios.put(`${this._backend_URL}/todos`, { todos }, this.HeaderWithAuthorization).
                then((res: AxiosResponse<ITodo[]>) => res.data))
            return ApiResponseFactory.createSuccess(response);
        } catch (error) {
            if (error instanceof AxiosError) {
                return this.handleError(error)
            } else if (error instanceof Error)
                return this.handleError(error)
            else
                return this.handleError('Failed in _API to UpdateTodos')
        }
    }
}

const APIService = new _APIService();
export default APIService;