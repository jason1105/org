import {Component, OnInit} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import * as $ from 'jquery';
import {Log} from "ng2-logger";
import {
  TYPES, LOG_LEVEL, DEFAULT_NEW_ID
} from "../common/org-management.const";
import {OrgTreeModel} from "../common/org-management-orgTree.model";
import {CREATE_CONTEXT_ITEMS_FUNCTION} from "./org-management-orgTree.conf";
import {MissionService} from "../common/org-management-missionService.service";


/**
 * Created by lv-wei on 2017-05-25.
 */
@Component({
  selector: 'org-tree',
  templateUrl: 'org-management-orgTree.component.html'
})
export class OrgManagementOrgTreeComponent implements OnInit {

  constructor(
    private orgManagementService: OrgManagementService,
    private missionService: MissionService){

  }

  log = Log.create("OrgManagementOrgTreeComponent", ...LOG_LEVEL);
  tree: any;
  treeConfig: any;
  treePluginEvent: any;
  treeEvent: any;
  treeData:any[];
  prepared: boolean = false;


  /**
   * check callback中拷贝节点和移动节点handler
   *
   * @param operation
   * @param node
   * @param node_parent
   * @param node_position
   * @param more
   * @returns {boolean}
   */
  copyAndMoveNode: any = (operation, node, node_parent, node_position, more) => {

    // 移动目标不是组织结构的场合，禁止
    if (node_parent.type != 'org') {
      //$("#vakata-dnd").html($("#vakata-dnd").html());
      return false;
    }

    // 用户或者设备不能在组织节点中重复存在
    for (var i = 0; i < node_parent.children.length; i++) {
      var childObj = this.tree.get_node(node_parent.children[i]);
      this.log.data("Children of target:", childObj);
      if ((childObj.type == node.type) && (childObj.text == node.text)) {
        this.log.data("[STOP]");
        return false;
      }
    }

    // todo
    // 组织结构的场合，更新Term数据表；用户和设备的场合，更新TermRelationships数据表
    return true;
  };

    /**
   * 定义check callback处理函数
   * @type {{copy_node: any; move_node: any}}
   */
  check_callback_funcs: any = {
    "copy_node": this.copyAndMoveNode,
    "move_node": this.copyAndMoveNode,
  };

  ngOnInit(): void {

    // 初始化树
    this.initTree();

    // 读取组织结构中的数据
    this.orgManagementService.getOrgs().subscribe((terms) => {
      this.log.data("Terms:", terms.length);

      // 赋值给树
      this.treeData = terms;

      // 准备完毕，可以显示组件了
      this.prepared = true;
    });

  }

  abc = (event) => {
    this.log.data("[EVENT] add_org");
  };

  /**
   * 初始化树组件
   */
  initTree = ():void => {
    this.treeConfig = Object.assign({
      dnd: {
        copy: false,
        is_draggable: function () {
          return true;
        }
      },
      contextmenu: {items:CREATE_CONTEXT_ITEMS_FUNCTION.call(this)},
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
      handler: (event, obj) => {
        this.log.data('[EVENT]', "dnd_stop.vakata");
        //let localNode = this.tree.get_node(obj.element.id);
        //console.log(localNode);
      }
    }];

    this.treeEvent = [{
      event: "create_node.jstree",
      handler: (e, obj) => {
        this.log.data('[EVENT]', "create_node.jstree");
      }
    },{
      event: "rename_node.jstree",
      handler: (e, obj) => {
        this.log.data("[EVENT]", "rename_node.jstree");
      }
    },{
      event: "changed.jstree",
      handler: (e, obj) => {
        this.log.data("[EVENT]", "changed.jstree");
      }

    }];
  };


  /**
   * 事件处理函数，当树构建完成后，触发此方法
   * @param tree
   */
  onOrgTreeCreated: any = (tree: any) => {
    this.log.data("[EVENT]", "onOrgTreeCreated", tree);
    this.tree = tree; // 取得当前树
  }

  viewTreeData: any = (event) => {
    this.log.data("[EVENT]", "查看组织架构", event, this.tree.get_json());
  };

}
