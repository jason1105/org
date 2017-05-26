import {BrowserModule} from "@angular/platform-browser";
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {OrgManagementComponent} from "./main/org-management.component";
import {OrgManagementService} from "./org-management.service";
import {TreeComponent} from "./tree/tree.component";
import {OrgManagementOrgTreeComponent} from "./main/org-management-orgTree.component";
import {OrgManagementDeviceTreeComponent} from "./main/org-management-deviceTree.component";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./InMemoryData";
import {TermService} from "../../../entities/term/term.service";


/**
 * Created by lv-wei on 2017-05-19.
 */
@NgModule({
  declarations: [
    OrgManagementComponent,
    OrgManagementOrgTreeComponent,
    OrgManagementDeviceTreeComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [OrgManagementService, TermService],
  bootstrap: [OrgManagementComponent],
  exports: [OrgManagementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrgManagementModule { }
