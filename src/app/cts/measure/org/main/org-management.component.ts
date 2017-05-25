import {Component, OnInit} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import {TYPES} from "../common/org-management.types";
/**
 * Created by lv-wei on 2017-05-19.
 */

@Component({
  selector: 'cts-org-mgmt',
  templateUrl: 'org-management.component.html'
})
export class OrgManagementComponent implements OnInit {

  users: any = [];
  devices: any = [];

  // ==================tree config====================

  // config tree of user list
  usersTreeConfig: any = Object.assign({
      dnd: {
        always_copy: true,
        copy: false
      },
      core: {
        check_callback: (operation, node, node_parent, node_position, more) => {
          // console.log("[CHECK_CALLBACK]", node, node_parent);
          return false;
        }
      }
    }, TYPES);

  // handle event for plugins
  usersTreePluginEvent: any = [{
    event: "dnd_move.vakata",
    handler: (data, element) => {}
  },{
    event: "dnd_stop.vakata",
    handler:(data, element) => {}
  }];

  // config tree of devices list
  devicesTreeConfig: any = Object.assign(
    {
      dnd: {copy: false},
      core: {
        check_callback: (operation, node, node_parent, node_position, more) => {
          console.log("[CHECK_CALLBACK]", node, node_parent);
          return false;
        }
      }
    }, TYPES);

  constructor(private orgManagementService:OrgManagementService){}

  ngOnInit(): void {
    this.orgManagementService.getUsers().subscribe((users) => {this.users = users;});
    this.orgManagementService.getDevices().subscribe((devices) => {this.devices = devices;});
  }

}
