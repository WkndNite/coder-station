import request from "./request";

export function getIssues(params) {
	return request({
		url: "/api/issue",
		method: "GET",
		params: {
			...params,
		},
	});
}
