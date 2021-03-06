module.exports = {
  "name": "",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "axios": "^0.19.0",
    "crypto-js": "^3.1.9-1",
    "cube-ui": "~1.12.26",
    "postcss-design-convert": "^1.1.3",
    "vue": "^2.6.10",
    "vue-router": "^3.1.3",
    "vuex": "^3.1.1",
    "vuex-along": "^1.2.7"
  },
  "devDependencies": {
    "@babel/plugin-syntax-dynamic-import": "^7.2.0",
    "@vue/cli-plugin-babel": "^3.9.0",
    "@vue/cli-service": "^3.9.0",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "node-sass": "^4.12.0",
    "postcss-px-to-viewport": "^1.1.0",
    "sass-loader": "^7.1.0",
    "stylus": "^0.54.5",
    "stylus-loader": "^3.0.2",
    "uglifyjs-webpack-plugin": "^2.1.3",
    "vue-cli-plugin-cube-ui": "^0.2.5",
    "vue-template-compiler": "^2.6.10"
  },
  "transformModules": {
    "cube-ui": {
      "transform": "cube-ui/src/modules/${member}",
      "kebabCase": true
    }
  }
};