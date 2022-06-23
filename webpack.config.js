const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProgressPlugin } = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const ObsoleteWebpackPlugin = require("obsolete-webpack-plugin");

const path = require("path");

let mode = "development";
if (process.env.NODE_ENV === "production") {
	mode = "production";
}

// eslint-disable-next-line no-console
console.log(`Webpack mode: ${mode.toUpperCase()}`);

const cssLoaders = loader => {
	const loaders = [{ loader: "css-loader" }, "postcss-loader", { loader: "sass-loader" }];
	if (mode === "development") {
		loaders.unshift("style-loader");
	} else {
		loaders.unshift(MiniCssExtractPlugin.loader);
	}

	if (loader) loaders.push(...loader);

	return loaders;
};

const jsLoaders = () => {
	const loaders = [
		{
			loader: "babel-loader"
		}
	];
	return loaders;
};

const plugins = () => {
	const mainPlugins = [
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css"
		}),
		new HtmlWebpackPlugin({
			template: "./src/index.html"
		}),
		new ObsoleteWebpackPlugin({
			name: "outdatedBrowser",
			promptOnNonTargetBrowser: true,
			template: `
			<div>Your browser is not supported.</div>
			`
		}),
		new ProgressPlugin(),
		new CleanWebpackPlugin(),
		new TerserPlugin(),
		new ESLintPlugin()
	];
	return mainPlugins;
};

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: "all"
		},
		minimize: true,
		minimizer: [
			new HtmlMinimizerPlugin({
				minimizerOptions: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					collapseInlineTagWhitespace: true,
					removeComments: true,
					useShortDoctype: true,
					maxLineLength: 140
				}
			}),
			new CssMinimizerPlugin({
				minify: CssMinimizerPlugin.cleanCssMinify,
				minimizerOptions: {
					level: 2
				}
			})
		]
	};

	return config;
};

module.exports = {
	mode,
	entry: {
		main: ["./src/js/main.js"]
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "dist")
		// clean: true
	},
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.html$/i,
				loader: "html-loader"
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: cssLoaders()
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/images/[hash][ext][query]"
				}
			},
			{
				test: /\.(svg)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/svgs/[hash][ext][query]"
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: "asset/resource",
				generator: {
					filename: "assets/fonts/[hash][ext][query]"
				}
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: jsLoaders()
			}
		]
	},
	devtool: mode === "development" ? "source-map" : false,
	optimization: optimization(),
	target: "browserslist",
	devServer: {
		port: 2020,
		open: true,
		hot: mode === "development"
	},
	stats: {
		preset: mode === "development" ? "normal" : "errors-warnings"
	},
	performance: {
		maxEntrypointSize: 1000000,
		maxAssetSize: 1000000,
		hints: "warning"
	}
};
