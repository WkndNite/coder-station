import request from "./request";

export function getCaptcha() {
    return request({
        url: "/res/captcha",
        method: "GET",
    });
}

export function userHasExist(loginId) {
    return request({
        url: `/api/user/userIsExist/${loginId}`,
        method: "GET",
    });
}

export function register(data) {
    return request({
        url: "/api/user",
        method: "POST",
        data,
    });
}