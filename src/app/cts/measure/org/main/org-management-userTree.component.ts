import {OnInit, OnDestroy, Component} from "@angular/core";
import {TYPES} from "../common/org-management.const";
import {OrgManagementService} from "../org-management.service";
/**
 * Created by lv-wei on 2017-06-06.
 */
@Component({
  selector: 'user-tree',
  templateUrl: 'org-management-deviceTree.component.html'
})
export class OrgManagementUserTreeComponent implements OnInit, OnDestroy {


  tree: any;
  treeData: any = [];

  // ==================tree config====================

  // config tree of user list
  treeConfig: any = Object.assign({
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

  constructor(private orgManagementService:OrgManagementService){}

  onOrgTreeCreated: any = (tree: any) => {
    console.log("[EVENT]", "onOrgTreeCreated", tree);
    this.tree = tree;
  }

  ngOnInit(): void {
    this.orgManagementService.getUsers().subscribe((users) => {this.treeData = users;});
  }

  ngOnDestroy(): void {
  }

}
