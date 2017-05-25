import {Component, OnInit} from "@angular/core";
import {TYPES} from "../common/org-management.types";
import {OrgManagementService} from "../org-management.service";

/**
 * Created by lv-wei on 2017-05-25.
 */
@Component({
  selector: 'org-tree',
  templateUrl: 'org-management-orgTree.component.html'
})
export class OrgManagementOrgTreeComponent implements OnInit {

  constructor(private orgManagementService: OrgManagementService){}

  tree: any;
  treeConfig: any;
  treePluginEvent: any;
  treeData:any;


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
          console.log("[CHECK_CALLBACK]", node, node_parent);
          return true;
        }
      }
    }, TYPES);

    this.treePluginEvent = [{
      event: "dnd_stop.vakata",
      handler:(event, data) => {
        console.log("[EVENT] dnd_stop.vakata", event, data );
        let localNode = data.element.id;
      }
    }];

    this.orgManagementService.getTerms().subscribe((terms) => {this.treeData = terms;});
  }

  onOrgTreeCreated: any = (tree: any) => {
    console.log("[EVENT] onOrgTreeCreated", tree);
    this.tree = tree;
  }
}
