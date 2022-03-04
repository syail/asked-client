import { AxiosRequestConfig } from "axios";
export declare class RequestClient {
    private readonly client;
    constructor(options?: AxiosRequestConfig<any>, baseUrl?: string);
    signUp(form?: AccountForm): Promise<RequestResult<string>>;
    follow(cookie: string, id: string): Promise<RequestResult<void>>;
    private getFirstCookie;
    static create(): RequestClient;
}
interface AccountForm {
    nickname: string;
    email: string;
    id: string;
    password: string;
}
interface RequestResult<T> {
    success: boolean;
    result?: T;
}
export {};
