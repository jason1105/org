"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var echarts = require("echarts/lib/echarts");
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
var ChartComponent = (function () {
    function ChartComponent(jhiLanguageService, alertService, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.principal = principal;
    }
    ChartComponent.prototype.setOption = function (option) {
        this._option = option;
        if (!this.myChart) {
            this.myChart = echarts.init(document.getElementById('chart'));
        }
        if (this._option) {
            this.myChart.setOption(this._option);
        }
    };
    ChartComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.myChart.resize();
        }, 100);
        this.resizeListener = function () {
            if (_this.myChart) {
                _this.myChart.resize();
            }
        };
        window.addEventListener("resize", this.resizeListener);
    };
    ChartComponent.prototype.loadAll = function () {
    };
    ChartComponent.prototype.ngOnInit = function () {
        this.loadAll();
    };
    ChartComponent.prototype.ngOnDestroy = function () {
        if (this.myChart) {
            this.myChart.dispose();
        }
        window.removeEventListener("resize", this.resizeListener);
    };
    ChartComponent.prototype.onError = function (error) {
        this.alertService.error(error.error, error.message, null);
    };
    return ChartComponent;
}());
ChartComponent = __decorate([
    core_1.Component({
        selector: 'jhi-chart',
        templateUrl: './chart.component.html'
    })
], ChartComponent);
exports.ChartComponent = ChartComponent;
