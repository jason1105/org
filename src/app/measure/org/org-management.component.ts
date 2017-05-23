import {Component} from "@angular/core";
/**
 * Created by lv-wei on 2017-05-19.
 */

@Component({
  selector: 'cts-org-mgmt',
  templateUrl: 'org-management.component.html'
})
export class OrgManagementComponent {

  public data: any = [
    {
      'text' : 'Root node 2',
      'state' : {
        'opened' : true,
        'selected' : true
      },
      'children' : [
        { 'text' : 'Child 1' },
        'Child 2'
      ]
    },
    {
      'text' : 'Root node 2',
      'state' : {
        'opened' : true,
        'selected' : true
      },
      'children' : [
        { 'text' : 'Child 1' },
        'Child 2'
      ]
    }
  ];

  getData() {
    return this.data;
  }
}
