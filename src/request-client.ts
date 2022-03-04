import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosResponseHeaders,
} from "axios";
import { getRandomString } from "./util";

export class RequestClient {
    private readonly client: AxiosInstance;

    constructor(
        options: AxiosRequestConfig<any> = {},
        baseUrl: string = "https://asked.kr"
    ) {
        this.client = axios.create({ ...options, baseURL: baseUrl });
    }

    public async signUp(form?: AccountForm): Promise<RequestResult<string>> {
        let accountForm = form || {
            email: `${getRandomString(10)}@riarisans.net`,
            id: getRandomString(11),
            nickname: getRandomString(10),
            password: getRandomString(14),
        };
        let encoded = new URLSearchParams({
            reg_name: accountForm.nickname,
            reg_email: accountForm.email,
            reg_id: accountForm.id,
            reg_pw: accountForm.password,
        }).toString();

        try {
            let result = await this.client.post<any, AxiosResponse<string>>(
                "/sing_up.php",
                encoded,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
                    },
                }
            );

            if (result.headers["set-cookie"]![1]?.includes("blid")) {
                return {
                    success: true,
                    result: this.getFirstCookie(result.headers),
                };
            }
        } catch {}
        return { success: false };
    }

    public async follow(
        cookie: string,
        id: string
    ): Promise<RequestResult<void>> {
        let encoded = new URLSearchParams({
            num: id,
        }).toString();

        try {
            let result = await this.client.post<any, AxiosResponse<string>>(
                "/query.php?query=22",
                encoded,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "User-Agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
                        Cookie: cookie,
                    },
                }
            );

            if (result.data.includes("success")) {
                return {
                    success: true,
                };
            }
        } catch {}
        return { success: false };
    }

    private getFirstCookie(rawHeaders: AxiosResponseHeaders) {
        return rawHeaders["set-cookie"]![0].split(" ")[0];
    }

    public static create() {
        return new RequestClient({ timeout: 3000 });
    }
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
