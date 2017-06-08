"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var DeviceService = (function () {
    function DeviceService(http) {
        this.http = http;
        this.resourceUrl = 'ctsdevice/api/devices';
    }
    DeviceService.prototype.create = function (device) {
        var copy = Object.assign({}, device);
        return this.http.post(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    DeviceService.prototype.update = function (device) {
        var copy = Object.assign({}, device);
        return this.http.put(this.resourceUrl, copy).map(function (res) {
            return res.json();
        });
    };
    DeviceService.prototype.find = function (id) {
        return this.http.get(this.resourceUrl + "/" + id).map(function (res) {
            return res.json();
        });
    };
    DeviceService.prototype.query = function (req) {
        var options = this.createRequestOption(req);
        return this.http.get(this.resourceUrl, options);
    };
    DeviceService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id);
    };
    DeviceService.prototype.createRequestOption = function (req) {
        var options = new http_1.BaseRequestOptions();
        if (req) {
            var params = new http_1.URLSearchParams();
            params.set('page', req.page);
            params.set('size', req.size);
            if (req.sort) {
                params.paramsMap.set('sort', req.sort);
            }
            params.set('query', req.query);
            options.search = params;
        }
        return options;
    };
    DeviceService = __decorate([
        core_1.Injectable()
    ], DeviceService);
    return DeviceService;
}());
exports.DeviceService = DeviceService;
