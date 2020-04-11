module.exports = {
  plugins: ["inline-json-import"],
  presets: [["@babel/preset-env", { modules: false }], "minify"],
}
