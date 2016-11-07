module.exports = {
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true
  },
  "globals": {
    "fetch": true
  },
  "rules": {
    "react/require-extension": "off",
    // "linebreak-style": ["error", "windows"],
    "linebreak-style": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-no-bind": 0,
    "react/forbid-prop-types": 0,
    "react/js-filename-extension": 0,
    "comma-dangle": 0,
    "no-use-before-define": 0,
    "consistent-return": 0,
    "semi": [2, "never"],
    "quotes": [1, "backtick"],
    "strict": 0,
    "max-len": [
      "error",
      120,
      2,
      {
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignoreTrailingComments": true
      }
    ],
    "no-param-reassign": ["error", { "props": false }],
    "no-static-element-interactions": 0
  }
}
