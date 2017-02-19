"use strict";
var index_1 = require("./components/index");
var index_2 = require("./services/index");
exports.rootRouterConfig = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: index_1.HomeComponent },
    { path: 'about', component: index_1.AboutComponent },
    { path: 'contact', component: index_1.ContactComponent },
    { path: 'login', component: index_1.LoginComponent },
    { path: 'logout', component: index_1.LoginComponent },
    { path: 'welcome', component: index_1.WelcomeComponent, canActivate: [index_2.AuthGuard] }
];
//# sourceMappingURL=app.routes.js.map