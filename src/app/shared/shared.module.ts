import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {DatePipe} from '@angular/common';

import {
    TreeComponent,
    ChartComponent
} from './';
// import {AgGridModule} from "ag-grid-angular";

// import {CtsGatewaySharedCommonModule} from "../../shared/shared-common.module";


@NgModule({
    imports: [

    ],
    declarations: [
        TreeComponent,
        ChartComponent
    ],
    providers: [],
    entryComponents: [],
    exports: [
        TreeComponent,
        ChartComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CtsMeasureSharedModule {
}
