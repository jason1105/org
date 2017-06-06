import {Component, OnInit, OnDestroy} from "@angular/core";
import {Log} from "ng2-logger";
import {LOG_LEVEL, TYPES} from "../common/org-management.const";
import {OrgManagementService} from "../org-management.service";
import {MissionService} from "../common/org-management-missionService.service";
import {Subscription} from "rxjs";
/**
 * Created by lv-wei on 2017-05-26.
 */
@Component({
  selector: 'device-tree',
  templateUrl: 'org-management-deviceTree.component.html'
})
export class OrgManagementDeviceTreeComponent implements OnInit, OnDestroy {

  constructor(private orgManagementService: OrgManagementService,
              private missionService: MissionService) {
    // missionAnnounced保存的是组织结构树中删除的设备类型的节点，这些节点需要放回
    this.announced = missionService.missionAnnounced$.subscribe(
      (node) => {
        this.log.data("[MESSAGE]", node);
        this.addNode(node);
      }
    )
  }

  log = Log.create("OrgManagementDeviceTreeComponent", ...LOG_LEVEL);

  tree: any;
  treeConfig: any;
  treePluginEvent: any;
  treeData:any;
  announced:Subscription;

  addNode = (node):void => {
    this.tree.create_node("#", node);
  };

  // The function use for copy_node and move_node of check_callback
  copyAndMove: any = (operation, node, node_parent, node_position, more) => {
    return true;
  };

  check_callback_funcs: any = {
    "move_node": () => {
      /*
      禁止移动设备列表中的设备
       */
      return false;
    }
  };

  ngOnInit(): void {
    this.treeConfig = Object.assign({
      dnd: {
        copy: false,
        always_copy: false
      },
      core: {
        check_callback: (operation, node, node_parent, node_position, more) => {
          //console.log("[CHECK_CALLBACK]", operation, node, node_parent);
          this.log.data("[CHECK_CALLBACK]", operation, node, node_parent);
          if (this.check_callback_funcs[operation]) {
            return this.check_callback_funcs[operation].call(this, operation, node, node_parent, node_position, more)
          } else {
            return true;
          }
        }
      }
    }, TYPES);

    this.treePluginEvent = [{
      event: "dnd_stop.vakata",
      handler:(event, obj) => {
        // console.log("[EVENT] dnd_stop.vakata", event, obj );
        // let localNode = this.tree.get_node(obj.element.id);
        // console.log(localNode);
      }
    }];

    this.orgManagementService.getDevices().subscribe((devices) => {this.treeData = devices;});
  }

  onOrgTreeCreated: any = (tree: any) => {
    console.log("[EVENT]", "onOrgTreeCreated", tree);
    this.tree = tree;
  }

  ngOnDestroy(): void {
    this.announced.unsubscribe();
  }

}
