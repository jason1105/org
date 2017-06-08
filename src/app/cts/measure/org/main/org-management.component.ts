import {Component, OnInit, ViewChild} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import {TYPES, LOG_LEVEL} from "../common/org-management.const";
import {OrgManagementOrgTreeComponent} from "./org-management-orgTree.component";
import {OrgManagementDeviceTreeComponent} from "./org-management-deviceTree.component";
import {OrgManagementUserTreeComponent} from "./org-management-userTree.component";
import {Log} from "ng2-logger";
/**
 * Created by lv-wei on 2017-05-19.
 */

@Component({
  selector: 'cts-org-mgmt',
  templateUrl: 'org-management.component.html'
})
export class OrgManagementComponent implements OnInit {

  log = Log.create("OrgManagementComponent", ...LOG_LEVEL);

  @ViewChild(OrgManagementOrgTreeComponent)
  private orgTreeComponent: OrgManagementOrgTreeComponent;

  @ViewChild(OrgManagementDeviceTreeComponent)
  private deviceTreeComponent: OrgManagementDeviceTreeComponent;

  @ViewChild(OrgManagementUserTreeComponent)
  private userTreeComponent: OrgManagementUserTreeComponent;

  constructor(private orgManagementService:OrgManagementService){}

  ngOnInit(): void {
    // userTreeComponent.reload()
  }

  private reload(event) {
    this.log.data("[EVENT]", "reload()");
    this.orgTreeComponent.ngOnInit();
  }

  private viewTreeData(event) {
    this.log.data("[EVENT]", "viewTreeData()");
    this.orgTreeComponent.viewTreeData(event);
  }

}
