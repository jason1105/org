import {OnInit, OnDestroy, Component} from "@angular/core";
import {TYPES, LOG_LEVEL} from "../common/org-management.const";
import {OrgManagementService} from "../org-management.service";
import {Log} from "ng2-logger";
/**
 * Created by lv-wei on 2017-06-06.
 */
@Component({
  selector: 'user-tree',
  templateUrl: 'org-management-deviceTree.component.html'
})
export class OrgManagementUserTreeComponent implements OnInit, OnDestroy {

  log = Log.create("OrgManagementUserTreeComponent", ...LOG_LEVEL);

  tree: any;
  treeConfig: any;
  treePluginEvent: any;
  treeData:any;
  prepared: boolean = false;

  // handle event for plugins
  usersTreePluginEvent: any = [{
    event: "dnd_move.vakata",
    handler: (data, element) => {}
  },{
    event: "dnd_stop.vakata",
    handler:(data, element) => {}
  }];

  constructor(private orgManagementService:OrgManagementService){}

  ngOnInit(): void {
    this.initTreeConf();
    this.initTreeData();
  }

  ngOnDestroy(): void {
  }

  private initTreeConf: () => void = function (): void {
    // config tree of user list
    this.treeConfig = Object.assign({
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
  }

  private initTreeData: () => void = (): void => {

    this.orgManagementService.getUsers().subscribe((users) => {
      this.log.data("initTreeData()", "Get nodes:", users);
      this.treeData = users;
      // 准备完毕，可以显示组件了
      this.prepared = true;
    });
  }

  onOrgTreeCreated: any = (tree: any) => {
    this.log.data("[EVENT]", "onOrgTreeCreated", tree);
    this.tree = tree;
  }
}
