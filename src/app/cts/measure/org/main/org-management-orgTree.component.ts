import {Component, OnInit} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import * as $ from 'jquery';
import {Log} from "ng2-logger";
import {TYPES, LOG_LEVEL} from "../common/org-management.const";


/**
 * Created by lv-wei on 2017-05-25.
 */
@Component({
  selector: 'org-tree',
  templateUrl: 'org-management-orgTree.component.html'
})
export class OrgManagementOrgTreeComponent implements OnInit {

  constructor(private orgManagementService: OrgManagementService){}

  log = Log.create("OrgManagementOrgTreeComponent", ...LOG_LEVEL);
  tree: any;
  treeConfig: any;
  treePluginEvent: any;
  treeData:any;


  check_callback_funcs: any = {
    "copy_node": (operation, node, node_parent, node_position, more) => {

      // 移动目标不是组织结构的场合，禁止
      if (node_parent.type != 'org') {
        //$("#vakata-dnd").html($("#vakata-dnd").html());
        return false;
      }

      // 用户或者设备不能在组织节点中重复存在
      for (var i = 0; i < node_parent.children.length; i++) {
        var childObj = this.tree.get_node(node_parent.children[i]);
        console.log("Child of target:", childObj);
        if ((childObj.type == node.type) && (childObj.text == node.text)) {
          console.log("[STOP]");
          return false;
        }
      }

      return true;
    }
  };

  ngOnInit(): void {
    this.treeConfig = Object.assign({
      dnd: {
        copy: false,
        is_draggable: function () {
          return true;
        }
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
        console.log("[EVENT] dnd_stop.vakata", event, obj );
        let localNode = this.tree.get_node(obj.element.id);
        console.log(localNode);
      }
    }];

    this.orgManagementService.getTerms().subscribe((terms) => {this.treeData = terms;});
  }


  onOrgTreeCreated: any = (tree: any) => {
    console.log("[EVENT] onOrgTreeCreated", tree);
    this.tree = tree;
  }
}
