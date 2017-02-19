"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var index_1 = require("../../services/index");
var WelcomeComponent = (function () {
    function WelcomeComponent(userService) {
        this.userService = userService;
    }
    WelcomeComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    WelcomeComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUsers()
            .subscribe(function (data) { return _this.user = data; }, function (error) { return _this.errorMessage = error; });
    };
    return WelcomeComponent;
}());
WelcomeComponent = __decorate([
    core_1.Component({
        selector: 'welcome',
        styleUrls: ['./welcome.component.css'],
        templateUrl: './welcome.html'
    }),
    __metadata("design:paramtypes", [index_1.UserService])
], WelcomeComponent);
exports.WelcomeComponent = WelcomeComponent;
//# sourceMappingURL=welcome.component.js.map