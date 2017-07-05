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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var NGMeta = (function () {
    function NGMeta(_document, _router) {
        var _this = this;
        this._document = _document;
        this._router = _router;
        this._dom = platform_browser_1.ɵgetDOM();
        this._scrollEnabled = true;
        this._router.events.subscribe(function (evt) {
            _this._scrollToTop(evt);
        });
    }
    Object.defineProperty(NGMeta.prototype, "canonical", {
        set: function (canonicalURL) {
            try {
                this._removeTag('[rel=\'canonical\']');
                var canonical = this._dom.createElement(this._document.head, 'link');
                this._dom.setAttribute(canonical, 'rel', 'canonical');
                this._dom.setAttribute(canonical, 'href', canonicalURL);
            }
            catch (e) { }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NGMeta.prototype, "title", {
        get: function () {
            try {
                return this._dom.getTitle(this._document);
            }
            catch (e) { }
        },
        set: function (title) {
            try {
                this._dom.setTitle(this._document, title);
            }
            catch (e) { }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NGMeta.prototype, "scrollEnabled", {
        get: function () {
            return this._scrollEnabled;
        },
        set: function (scroll) {
            this._scrollEnabled = scroll;
        },
        enumerable: true,
        configurable: true
    });
    NGMeta.prototype.createMeta = function (metaData) {
        try {
            if (typeof metaData.attribute === 'string' && typeof metaData.type === 'string' && typeof metaData.content === 'string') {
                this._removeTag("[" + metaData.attribute + "='" + metaData.type + "']");
                var meta = this._dom.createElement(this._document.head, 'meta');
                this._dom.setAttribute(meta, metaData.attribute, metaData.type);
                this._dom.setAttribute(meta, 'content', metaData.content);
            }
        }
        catch (e) { }
    };
    NGMeta.prototype.setHead = function (tagData) {
        try {
            if (typeof tagData.title === 'string') {
                this.title = tagData.title;
            }
            if (tagData.name instanceof Array) {
                for (var _i = 0, _a = tagData.name; _i < _a.length; _i++) {
                    var detail = _a[_i];
                    detail.attribute = 'name';
                    this.createMeta(detail);
                }
            }
            if (tagData.property instanceof Array) {
                for (var _b = 0, _c = tagData.property; _b < _c.length; _b++) {
                    var detail = _c[_b];
                    detail.attribute = 'property';
                    this.createMeta(detail);
                }
            }
            if (tagData.meta instanceof Array) {
                for (var _d = 0, _e = tagData.meta; _d < _e.length; _d++) {
                    var detail = _e[_d];
                    this.createMeta(detail);
                }
            }
            if (typeof tagData.canonical === 'string') {
                this.canonical = tagData.canonical;
            }
        }
        catch (e) {
            throw e;
        }
    };
    NGMeta.prototype._removeTag = function (tagSelector) {
        try {
            var tag = this._dom.querySelector(this._document.head, tagSelector);
            this._dom.removeChild(tag, this._document.head);
        }
        catch (e) { }
    };
    NGMeta.prototype._scrollToTop = function (evt) {
        if (!(evt instanceof router_1.NavigationEnd) || evt.url.includes('#') || !this.scrollEnabled) {
            return;
        }
        this._document.body.scrollTop = 0;
    };
    return NGMeta;
}());
NGMeta = __decorate([
    core_1.Injectable(),
    __param(0, core_1.Inject(platform_browser_1.DOCUMENT)),
    __metadata("design:paramtypes", [Object, router_1.Router])
], NGMeta);
exports.NGMeta = NGMeta;
