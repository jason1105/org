import {Component} from "@angular/core";
import "../../../node_modules/angular-ui-tree/dist/angular-ui-tree.js"
/**
 * Created by lv-wei on 2017-05-19.
 */

@Component({
  selector: 'cts-org-mgmt',
  templateUrl: './org-management.component.html'
})
export class OrgManagementComponent {

  public data: any[] = [
    {
      "id": 1,
      "title": "node1",
      "nodes": [
        {
          "id": 11,
          "title": "node1.1",
          "nodes": [
            {
              "id": 111,
              "title": "node1.1.1",
              "nodes": []
            }
          ]
        },
        {
          "id": 12,
          "title": "node1.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 2,
      "title": "node2",
      "nodrop": true,
      "nodes": [
        {
          "id": 21,
          "title": "node2.1",
          "nodes": []
        },
        {
          "id": 22,
          "title": "node2.2",
          "nodes": []
        }
      ]
    },
    {
      "id": 3,
      "title": "node3",
      "nodes": [
        {
          "id": 31,
          "title": "node3.1",
          "nodes": []
        }
      ]
    }
  ];

  getData() {
    return this.data;
  }
}
