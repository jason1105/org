import {OrgTreeModel, NodeType} from "../common/org-management-orgTree.model";
import * as $ from 'jquery';

/**
 * Created by lv-wei on 2017-06-01.
 */
export const CREATE_CONTEXT_ITEMS_FUNCTION: any = function () {
  /**
   * 定制右键菜单
   */
    // 取得默认的右键菜单项
  let tmp = $.jstree.defaults.contextmenu.items();

  // create hanlder
  tmp.create.action = () => {
    this.log.data("[EVENT] Context Menu -> create");
    let ref = this.tree;
    let sel = ref.get_selected();
    if (!sel.length) {
      return false;
    }
    sel = sel[0];

    // 建立新节点的实例
    var newNode = new OrgTreeModel();
    newNode.name = "New Node";
    newNode.text = newNode.name;
    newNode.appId = "CTS";
    newNode.type = NodeType.ORGANIZATION;

    // 将新节点插入数据库
    this.orgManagementService.updateOrg(newNode).subscribe(
      (retNode) => {
        this.log.data("Create node successful.", retNode);

        // 在树中加入节点
        sel = ref.create_node(sel, retNode);

        // 将节点置为可选状态
        if (sel) {
          ref.edit(sel);
        }
      }
    );
  };

  // tmp.remove.action = () => {
  //   this.log.data("[EVENT]", "Context Menu -> remove");
  // };

  // 删除右键菜单中的移动和拷贝
  delete tmp.ccp;
  return tmp;
};

