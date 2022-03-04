import { AxiosRequestConfig } from "axios";
export declare class RequestClient {
    private readonly client;
    constructor(options?: AxiosRequestConfig<any>, baseUrl?: string);
    signUp(form?: AccountForm): Promise<RequestResult<string>>;
    follow(cookie: string, userId: number): Promise<RequestResult<void>>;
    addComment(id: string, comment: string, makarong?: string): Promise<{
        success: boolean;
    }>;
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
