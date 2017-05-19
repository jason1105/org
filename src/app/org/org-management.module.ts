import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {OrgManagementComponent} from "./org-management.component";
import {FormsModule} from "@angular/forms";
/**
 * Created by lv-wei on 2017-05-19.
 */
@NgModule({
  declarations: [
    OrgManagementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [OrgManagementComponent],
  exports: [OrgManagementComponent]
})
export class OrgManagementModule { }
