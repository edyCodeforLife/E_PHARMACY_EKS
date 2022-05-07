const { createProxyMiddleware } = require('http-proxy-middleware');
const app = require('express')();
const expressStaticGzip = require('express-static-gzip');

function isMobile(ua) {
	return /mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
		ua
	);
}

app.use(function (req, res, next) {
	res.removeHeader('x-powered-by');
	next();
});

// app.use('/', createProxyMiddleware({ target: 'http://0.0.0.0:8881', changeOrigin: true }));
// app.use('/m', createProxyMiddleware({ target: 'http://0.0.0.0:8882', changeOrigin: true }));

// app.use(
// 	'/',
// 	createProxyMiddleware({
// 		target: 'http://0.0.0.0:8881',
// 		changeOrigin: true,
// 		pathRewrite: function (path, req) {
// 			var ua = req.get('User-Agent');
// 			var isMob = isMobile(ua);
// 			var newPath = path.replace(new RegExp('^/'), isMob ? '/m/' : '/');
// 			// if (path.indexOf('/static/') > -1) return path;
// 			return newPath;
// 		},
// 		router: function (req) {
// 			var ua = req.get('User-Agent');
// 			var isMob = isMobile(ua);
// 			if (isMob) return 'http://0.0.0.0:8882';
// 			return 'http://0.0.0.0:8881';
// 		},
// 	})
// );

app.use(
	expressStaticGzip('.next/prod/', {
		index: false,
		enableBrotli: true,
		orderPreference: ['br', 'gz'],
	})
);

app.listen(4000);
