const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
	app.use(
		"/res",
		createProxyMiddleware({
			target: "http://localhost:7001/res",
			changeOrigin: true,
		})
	);
};
