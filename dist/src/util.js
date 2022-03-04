"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomString = void 0;
const STRING_SOURCE = "1234567890qwertyuiopasdfghjklzxcvbnm";
function getRandomString(len) {
    let result = "";
    for (let i = 0; i < len; i++) {
        result += STRING_SOURCE[random(0, STRING_SOURCE.length)];
    }
    return result;
}
exports.getRandomString = getRandomString;
function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//# sourceMappingURL=util.js.map