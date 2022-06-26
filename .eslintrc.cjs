module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
  },
  "extends": [
    "google",
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "rules": {
    "quotes": ["error", "double", {"avoidEscape": true}],
    "camelcase": ["error"],
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "camelcase": "off",
      },
    },
  ],
};
