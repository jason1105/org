import {Component, OnInit} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import {TYPES} from "../common/org-management.const";
/**
 * Created by lv-wei on 2017-05-19.
 */

@Component({
  selector: 'cts-org-mgmt',
  templateUrl: 'org-management.component.html'
})
export class OrgManagementComponent implements OnInit {

  constructor(private orgManagementService:OrgManagementService){}

  ngOnInit(): void {
  }

}
