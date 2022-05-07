/** @type {import('next').NextConfig} */
/* eslint-disable */
const withPlugins = require('next-compose-plugins');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const isMobile = process.env.IS_MOBILE || 'no';
const withImages = require('next-images')
const dev = process.env.NODE_ENV !== 'production';
// const sassPath = isMobile === "yes" ? "/_styles-mobile.module.scss" : "/_styles-web.module.scss";
const sassPath = "/_styles-web.module.scss";
// const importSpecificCss =
// 	isMobile === 'yes' ? '@import "./styles-mobile";' : '@import "./styles-web";';
// const importSpecificStaticPath =
// 	isMobile === 'yes' ? `$staticPath: /m/;` : `$staticPath: / ;`;

// module.exports = {
//   reactStrictMode: true,
//   swcMinify: true,
//   experimental: {
//     concurrentFeatures: true,
//     serverComponents: true
//   }
// }

const config = withPlugins(
	[
		[
			{
				webpack(config, _) {
					config.module.rules.push({
						test: /\.(raw)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
						use: 'raw-loader',
					});

					if (config.mode === 'production') {
						if (Array.isArray(config.optimization.minimizer)) {
							config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));
						}

						if (Array.isArray(config.plugins)) {
							config.plugins.push(
								new CompressionPlugin({
									filename: '[path][base].br',
									algorithm: 'brotliCompress',
									test: /\.(js|css|html|svg)$/,
									compressionOptions: { level: 11 },
									threshold: 10240,
									minRatio: 0.8,
									deleteOriginalAssets: false,
								}),
							);
						}
					}
					if (dev) {
						config.devtool = 'cheap-module-source-map';
					}
					return config;
				},
				minified: !dev,
				distDir: dev
					? isMobile === 'yes'
						? `../.next/dev/m/`
						: `../.next/dev/`
					: isMobile === 'yes'
						? `../.next/prod/m/`
						: `../.next/prod/`,
				assetPrefix: isMobile === 'yes' ? `/m/` : `/`,
				publicRuntimeConfig: {
					isMobile,
				},
				poweredByHeader: false,
			}
		],
		{
			reactStrictMode: false,
			swcMinify: true,
			sassOptions: {
				includePaths: [path.join(__dirname, 'styles' + sassPath)]
			},
			images: {
				domains: ["localhost", "cms-bucket-alteacare.s3.ap-southeast-1.amazonaws.com"]
			},
			typescript: {
				// !! WARN !!
				// Dangerously allow production builds to successfully complete even if
				// your project has type errors.
				// !! WARN !!
				ignoreBuildErrors: true,
			},
			// experimental: {
			// 	concurrentFeatures: true,
			// 	serverComponents: true
			// },
		},
		[withImages]
	]);

module.exports = config
