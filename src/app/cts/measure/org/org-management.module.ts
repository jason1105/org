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
import {MissionService} from "./common/org-management-missionService.service";
import {TermRelationshipsService} from "../../../entities/term-relationships/term-relationships.service";
import {UserService} from "../../../shared/user/user.service";
import {UserServiceSpec} from "../../../shared/user/user.service.spec";
import {DeviceServiceSpec} from "../../../entities/device/device.service.spec";
import {TermRelationshipsServiceSpec} from "../../../entities/term-relationships/term-relationships.service.spec";
import {OrgManagementUserTreeComponent} from "./main/org-management-userTree.component";


/**
 * Created by lv-wei on 2017-05-19.
 */
@NgModule({
  declarations: [
    OrgManagementComponent,
    OrgManagementOrgTreeComponent,
    OrgManagementDeviceTreeComponent,
    OrgManagementUserTreeComponent,
    TreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],
  providers: [OrgManagementService,
    TermService,
    MissionService,
    TermRelationshipsService,
    UserService,
    UserServiceSpec,
    DeviceServiceSpec,
    TermRelationshipsServiceSpec],
  bootstrap: [OrgManagementComponent],
  exports: [OrgManagementComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OrgManagementModule {
}
