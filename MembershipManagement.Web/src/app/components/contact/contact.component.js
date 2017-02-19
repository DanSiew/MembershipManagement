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
var contact_1 = require("../../models/contact");
var ContactComponent = (function () {
    function ContactComponent() {
        this.model = new contact_1.Contact();
    }
    ContactComponent.prototype.fullNameToUpperCase = function (value) {
        if (value.length > 0) {
            this.model.fullName = value.charAt(0).toUpperCase() + value.slice(1);
        }
        else {
            this.model.fullName = value;
        }
    };
    ContactComponent.prototype.submitForm = function (form) {
    };
    return ContactComponent;
}());
ContactComponent = __decorate([
    core_1.Component({
        selector: 'app-contact',
        templateUrl: './contact.html',
        styleUrls: ['./contact.css']
    }),
    __metadata("design:paramtypes", [])
], ContactComponent);
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map