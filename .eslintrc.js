module.exports = {
  "env": {
    "node": true,
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2017,
    "sourceType": "module"
  },
  "parser": "babel-eslint",
  "rules": {
    "no-console": "warn",
    "no-unused-vars": "warn",
    "indent": "off",
    "linebreak-style": [
      "error", "unix"
    ],
    "quotes": [
      "error", "single"
    ],
    "semi": ["error", "never"]
  }
};
