import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {OrgManagementComponent} from "./org-management.component";
import {FormsModule} from "@angular/forms";
import {CtsMeasureSharedModule} from "../../shared/shared.module";


/**
 * Created by lv-wei on 2017-05-19.
 */
@NgModule({
  declarations: [
    OrgManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CtsMeasureSharedModule
  ],
  providers: [],
  bootstrap: [OrgManagementComponent],
  exports: [OrgManagementComponent]
})
export class OrgManagementModule { }
