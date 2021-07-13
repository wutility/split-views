module.exports = {
  port: 8000,
  files: [
    './**/*.{html,css,js}'
  ],
  watchOptions: {
    ignored: "node_modules"
  },
  server: {
    "baseDir": "./"
  }
}