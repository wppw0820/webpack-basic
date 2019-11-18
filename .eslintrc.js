module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  'plugins': ['html'],
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  "rules": {
    "quotes": [1, "single", "avoid-escape"]
  }

};