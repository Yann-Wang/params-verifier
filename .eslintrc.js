module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": "airbnb-base",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 4, {"SwitchCase": 1}],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "comma-dangle": ["error", "never"]
    }
};