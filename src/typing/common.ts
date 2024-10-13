import { ApiReturnCode } from '@/const/api/api';

export type ApiResponse<T> = {
    data: T;
    count: number;
    isSuccess: boolean;
    code: ApiReturnCode;
    message: string;
    errors: Array<{
        id: string;
        errorObj: Record<string, string>;
    }>;
};

interface IPromiseResult {
    Title?: string;
    Message?: string;
    Icon?: 'success' | 'error' | 'warning' | 'info' | 'question';
    CallBack?: Function;
    IsSuccess: boolean;
    Redirect?: string;
    Data?: any;
}

interface IPromiseResultData<T> extends IPromiseResult {
    Data: T;
}

interface IApiResult {
    IsSuccess: boolean;
    Code: number;
    Description: string;
    Validation: { [key: number]: string };
}

interface IApiGenericsResult<T> {
    IsSuccess: boolean;
    Code: number;
    Description: string;
    Validation: { [key: number]: string };
    Data: T;
}

interface IGeneralResult {
    IsSuccess: boolean;
    Validation: { [key: string]: string };
}

interface IGeneralResultData<T> extends IGernalResult {
    Data: T;
}
