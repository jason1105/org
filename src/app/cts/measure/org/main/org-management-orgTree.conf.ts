import {OrgTreeModel} from "../common/org-management-orgTree.model";
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

  // 新建一个org类型的节点
  tmp.create.action = () => {
    this.log.data("[HANDLER] Context Menu -> create");
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
    newNode.type = "org";

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

  tmp.remove.action = () => {
    this.log.data("[HANDLER]", "Context Menu -> remove");
    let ref = this.tree;
    let sel = ref.get_selected();
    if (!sel.length) {
      return false;
    }
    sel = sel[0];
    this.log.data("Wait for remove", this.tree.get_node(sel));

    if (this.tree.is_parent(sel)) {
      this.log.data("Parent can't be deleted.");
    }

    var selNode = this.tree.get_node(sel);

    if ("org" == selNode.type) {
      // 调用service删除后台Term数据，删除所有与该节点关联的TermRelationship数据
      this.orgManagementService.delOrg(selNode).subscribe(
        (ret) => {
          // 删除节点数据
          ref.delete_node(selNode);
        }
      );
    } else if ("device" == selNode.type) {
      // todo 移动节点数据到设备树，调用service删除后台TermRelationship数据
      var parentId = selNode.parent;
      var objId = selNode.id;
      this.orgManagementService.delOrgRelationships(parentId, objId).subscribe(
        (ret) => {

          // 删除节点数据
          ref.delete_node(selNode);

          // 将删除的节点放入消息服务（设备树接收到消息后会将节点加入树中）
          this.missionService.announceMission(selNode);

        }
      );

    } else if ("user" == selNode.type) {
      // 调用service删除后台TermRelationship数据
      var parentId = selNode.parent;
      var objId = selNode.id;
      this.orgManagementService.delOrgRelationships(parentId, objId).subscribe(
        (ret) => {
          // 删除节点数据
          ref.delete_node(selNode);
        }
      );
    }

  };

  // 删除右键菜单中的移动和拷贝
  delete tmp.ccp;
  return tmp;
};
