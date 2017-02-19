"use strict";
require("./polyfills.browser");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_module_1 = require("./app/app.module");
exports.platformRef = platform_browser_dynamic_1.platformBrowserDynamic();
function main() {
    return exports.platformRef.bootstrapModule(app_module_1.AppModule)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
// support async tag or hmr
switch (document.readyState) {
    case 'interactive':
    case 'complete':
        main();
        break;
    case 'loading':
    default:
        document.addEventListener('DOMContentLoaded', function () { return main(); });
}
//# sourceMappingURL=main.browser.js.map