import {Component, OnDestroy, OnInit, AfterViewInit} from "@angular/core";


import echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');

import ECharts = echarts.ECharts;
import Option = echarts.Option;

@Component({
    selector: 'jhi-chart',
    templateUrl: './chart.component.html'
})
export class ChartComponent implements OnInit, OnDestroy, AfterViewInit {

    currentAccount: any;
    private myChart: ECharts;
    private _option: Option;
    private resizeListener: EventListener;


    constructor() {

    }

    setOption(option: Option) {
        this._option = option;
        if (!this.myChart) {
            this.myChart = echarts.init(document.getElementById('chart'));
        }
        if (this._option) {
            this.myChart.setOption(this._option);
        }

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.myChart.resize();
        }, 100);

        this.resizeListener = () => {
            if (this.myChart) {
                this.myChart.resize();
            }
        };
        window.addEventListener("resize", this.resizeListener);
    }


    loadAll() {

    }

    ngOnInit() {
        this.loadAll();
    }

    ngOnDestroy() {
        if (this.myChart) {
            this.myChart.dispose();
        }
        window.removeEventListener("resize", this.resizeListener);
    }

    private onError(error) {
    }
}
