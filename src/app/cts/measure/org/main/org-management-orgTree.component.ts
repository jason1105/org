import {Component, OnInit} from "@angular/core";
import {OrgManagementService} from "../org-management.service";
import * as $ from 'jquery';
import {Log} from "ng2-logger";
import {TYPES, LOG_LEVEL} from "../common/org-management.const";
import {OrgTreeModel} from "../common/org-management-orgTree.model";


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
  treeData:any[];
  prepared: boolean = false;


  copyAndMove: any = (operation, node, node_parent, node_position, more) => {

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
  };

  check_callback_funcs: any = {
    "copy_node": this.copyAndMove,
    "move_node": this.copyAndMove

  };

  ngOnInit(): void {
    this.initTree();
    this.orgManagementService.getTerms().subscribe((terms) => {
      this.log.data("Terms:", terms.length);

      this.treeData = terms;
      this.prepared = true;
    });
  }

  abc = (event) => {
    this.log.data("[EVENT] add_org");
  };

  initTree = ():void => {
    this.treeConfig = Object.assign({
      dnd: {
        copy: false,
        is_draggable: function () {
          return true;
        }
      },
      contextmenu: {
        items: () => {

          // 取得默认的右键菜单项
          let tmp = $.jstree.defaults.contextmenu.items();

          // 新建一个org类型的节点
          tmp.create.action = () => {
            let ref = this.tree;
            let sel = ref.get_selected();
            if (!sel.length) {
              return false;
            }
            sel = sel[0];
            sel = ref.create_node(sel, {"type": "org"});
            if (sel) {
              ref.edit(sel);
            }
          };

          // 删除右键菜单中的移动和拷贝
          delete tmp.ccp;
          return tmp;
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
      handler: (event, obj) => {
        //console.log("[EVENT] dnd_stop.vakata", event, obj );
        //let localNode = this.tree.get_node(obj.element.id);
        //console.log(localNode);
      }
    }];
  };


  onOrgTreeCreated: any = (tree: any) => {
    console.log("[EVENT] onOrgTreeCreated", tree);
    this.tree = tree; // 取得当前树
    //this.log.data("ContextMenu:" + this.tree.defaults.contextmenu);
    // todo，为每个节点绑定delete和add事件
    // term.text = term.text + "&nbsp;&nbsp;<i class='fa fa-trash-o aria-hidden='true'' (click)='abc($event)'></i>&nbsp;<i class='fa fa-plus-square-o' aria-hidden='true'></i>";
  }

  onClickAddTreeNode: any = (event: any) => {

  }

  viewTreeData: any = (event) => {
    this.log.data("[EVENT] 查看组织架构", event);
    this.log.data(this.tree.get_json());
  };

}
