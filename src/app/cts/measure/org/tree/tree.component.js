"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tree_conf_1 = require("./tree.conf");
var util_1 = require("util");
var TreeComponent = (function () {
    function TreeComponent(jhiLanguageService, alertService, principal) {
        this.jhiLanguageService = jhiLanguageService;
        this.alertService = alertService;
        this.principal = principal;
        this.onCheckedChange = new core_1.EventEmitter();
        this.conf = tree_conf_1.treeConf;
    }
    TreeComponent.prototype.ngOnInit = function () {
        require('jstree');
        this.loadAll();
    };
    TreeComponent.prototype.ngAfterViewInit = function () {
    };
    TreeComponent.prototype.ngOnDestroy = function () {
    };
    Object.defineProperty(TreeComponent.prototype, "data", {
        set: function (data) {
            this._data = data;
            this.initTree();
        },
        enumerable: true,
        configurable: true
    });
    TreeComponent.prototype.initTree = function () {
        var _this = this;
        if (!util_1.isNullOrUndefined(this._data)) {
            this.conf.core.data = this._data;
            $('#tree').jstree(this.conf).on('changed.jstree', function () {
                var treeIns = $('#tree').jstree(true);
                _this.onCheckedChange.emit({
                    'bottomChecked': treeIns.get_bottom_checked('full'),
                    'topChecked': treeIns.get_top_checked('full'),
                    'checked': treeIns.get_checked('full')
                });
            }).on('ready.jstree', function () {
                var treeIns = $('#tree').jstree(true);
            });
        }
    };
    TreeComponent.prototype.changeChecked = function (data) {
    };
    TreeComponent.prototype.loadAll = function () {
    };
    TreeComponent.prototype.onError = function (error) {
        this.alertService.error(error.error, error.message, null);
    };
    return TreeComponent;
}());
__decorate([
    core_1.Output()
], TreeComponent.prototype, "onCheckedChange", void 0);
__decorate([
    core_1.Input()
], TreeComponent.prototype, "data", null);
TreeComponent = __decorate([
    core_1.Component({
        selector: 'jhi-tree',
        templateUrl: './tree.component.html'
    })
], TreeComponent);
exports.TreeComponent = TreeComponent;
