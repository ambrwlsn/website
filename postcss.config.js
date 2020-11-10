module.exports = {
    plugins: [
      require('postcss-import'),
      require('postcss-clean'),
      require('cssnano')({
        preset: 'default',
      }),
    ],
  }