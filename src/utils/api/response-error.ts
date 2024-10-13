import { ApiResponse } from '@/typing/common';

class ApiResponseError<T> extends Error {
    /**
     * @param {string} message - The error message.
     * @param {ApiResponse<T>} res - The response object.
     */
    response: ApiResponse<T>;

    constructor(message: string, res: ApiResponse<T>) {
        super(message);
        this.response = res;
    }
}
export default ApiResponseError;
