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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var NGMeta = (function () {
    function NGMeta(document, rootRenderer) {
        this.document = document;
        this.rootRenderer = rootRenderer;
        this.isScrollEnabled = false;
        this.body = this.document.body;
        this.head = this.document.head;
        var type = new core_1.RenderComponentType("", "", 0, core_1.ViewEncapsulation.None, [], null);
        this.renderer = rootRenderer.renderComponent(type);
    }
    NGMeta.prototype.setCanonical = function (canonicalURL) {
        try {
            this.removeTag("[rel=\"canonical\"]");
            var canonical = this.renderer.createElement(this.head, "link");
            this.renderer.setElementAttribute(canonical, "rel", "canonical");
            this.renderer.setElementAttribute(canonical, "href", canonicalURL);
        }
        catch (e) { }
    };
    NGMeta.prototype.setTitle = function (title) {
        try {
            this.document.title = title;
        }
        catch (e) { }
    };
    NGMeta.prototype.setMeta = function (attribute, type, content) {
        try {
            if (typeof attribute === "string" && typeof type === "string" && typeof content === "string") {
                this.removeTag("[" + attribute + "=\"" + type + "\"]");
                var meta = this.renderer.createElement(this.head, "meta");
                this.renderer.setElementAttribute(meta, attribute, type);
                this.renderer.setElementAttribute(meta, "content", content);
            }
        }
        catch (e) { }
    };
    NGMeta.prototype.scrollToTop = function (duration) {
        if (duration <= 0)
            return false;
        if (this.isScrollEnabled) {
            var difference = 0 - this.body.scrollTop;
            var perTick_1 = difference / duration * 10;
            setTimeout(function () {
                this.body.scrollTop = this.body.scrollTop + perTick_1;
                if (this.body.scrollTop === 0)
                    return;
                this.scrollToTop(duration - 10);
            }, 10);
            return true;
        }
        return false;
    };
    NGMeta.prototype.setScrollEnabled = function (scroll) {
        this.isScrollEnabled = scroll;
        return this.isScrollEnabled;
    };
    NGMeta.prototype.setHead = function (tagData) {
        try {
            if (typeof tagData.title === "string") {
                this.setTitle(tagData.title);
            }
            if (tagData.name instanceof Array) {
                for (var _i = 0, _a = tagData.name; _i < _a.length; _i++) {
                    var detail = _a[_i];
                    this.setMeta("description", detail.type, detail.content);
                }
            }
            if (tagData.property instanceof Array) {
                for (var _b = 0, _c = tagData.property; _b < _c.length; _b++) {
                    var detail = _c[_b];
                    this.setMeta("property", detail.type, detail.content);
                }
            }
            if (tagData.name instanceof Array) {
                for (var _d = 0, _e = tagData.name; _d < _e.length; _d++) {
                    var detail = _e[_d];
                    this.setMeta(detail.attribute, detail.type, detail.content);
                }
            }
            if (typeof tagData.canonical === "string") {
                this.setCanonical(tagData.canonical);
            }
            if (location.href.search("#") === -1) {
                this.scrollToTop(1500);
            }
        }
        catch (e) {
            throw e;
        }
    };
    NGMeta.prototype.removeTag = function (tagSelector) {
        try {
            var head = this.document.head;
            var tag = this.document.querySelector(tagSelector);
            head.removeChild(tag);
        }
        catch (e) { }
    };
    NGMeta = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(platform_browser_1.DOCUMENT)), 
        __metadata('design:paramtypes', [Object, core_1.RootRenderer])
    ], NGMeta);
    return NGMeta;
}());
exports.NGMeta = NGMeta;
