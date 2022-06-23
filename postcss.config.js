const postcssPresetEnv = require("postcss-preset-env");
const postcssNormalize = require("postcss-normalize");
const postcssInlineSvg = require("postcss-inline-svg");

module.exports = {
	plugins: [postcssPresetEnv, postcssNormalize({ forceImport: "sanitize.css" }), postcssInlineSvg]
};
