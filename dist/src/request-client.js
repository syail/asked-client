"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestClient = void 0;
const axios_1 = __importDefault(require("axios"));
const util_1 = require("./util");
class RequestClient {
    constructor(options = {}, baseUrl = "https://asked.kr") {
        this.client = axios_1.default.create({ ...options, baseURL: baseUrl });
    }
    async signUp(form) {
        var _a;
        let accountForm = form || {
            email: `${(0, util_1.getRandomString)(10)}@riarisans.net`,
            id: (0, util_1.getRandomString)(11),
            nickname: (0, util_1.getRandomString)(10),
            password: (0, util_1.getRandomString)(14),
        };
        let encoded = new URLSearchParams({
            reg_name: accountForm.nickname,
            reg_email: accountForm.email,
            reg_id: accountForm.id,
            reg_pw: accountForm.password,
        }).toString();
        try {
            let result = await this.client.post("/sing_up.php", encoded, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
                },
            });
            if ((_a = result.headers["set-cookie"][1]) === null || _a === void 0 ? void 0 : _a.includes("blid")) {
                return {
                    success: true,
                    result: this.getFirstCookie(result.headers),
                };
            }
        }
        catch (_b) { }
        return { success: false };
    }
    async follow(cookie, id) {
        let encoded = new URLSearchParams({
            num: id,
        }).toString();
        try {
            let result = await this.client.post("/query.php?query=22", encoded, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
                    Cookie: cookie,
                },
            });
            if (result.data.includes("success")) {
                return {
                    success: true,
                };
            }
        }
        catch (_a) { }
        return { success: false };
    }
    getFirstCookie(rawHeaders) {
        return rawHeaders["set-cookie"][0].split(" ")[0];
    }
    static create() {
        return new RequestClient({ timeout: 3000 });
    }
}
exports.RequestClient = RequestClient;
//# sourceMappingURL=request-client.js.map