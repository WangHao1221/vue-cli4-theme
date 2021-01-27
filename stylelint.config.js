module.exports = {
    ignoreFiles: ["**/*.js", "src/assets/less/global.less", "src/assets/less/frame.less", "src/assets/less/theme.less"],
    extends: ["stylelint-config-standard", "stylelint-config-prettier"],
    rules: {
        "no-empty-source": null,
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: ["extend", "mixin"]
            }
        ]
    }
};