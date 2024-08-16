import { IApiResponse } from "../Interfaces/IApiResponse";

class __ApiResponseFactory<T> {

    createSuccess<T>(response: T): IApiResponse<T> {
        return { ok: true, response };
    }

    createFailure<T>(error: string): IApiResponse<T>
    createFailure<T>(error: Error): IApiResponse<T>
    createFailure<T>(error: string | Error): IApiResponse<T> {
        if (error instanceof Error) {
            return {
                ok: false,
                error: error.message
            };
        }
        return { ok: false, error }
    }
}
const ApiResponseFactory = new __ApiResponseFactory();
export default ApiResponseFactory;