const env = require("./env-config");

module.exports = {
  presets: ["next/babel", "@zeit/next-typescript/babel"],
  plugins: [["transform-define", env], ["styled-components", { ssr: true, displayName: true, preprocess: false }]]
};
