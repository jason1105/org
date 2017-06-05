import {Component, Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {TermService} from "../../../entities/term/term.service";
import {Log} from "ng2-logger";
import {LOG_LEVEL, APPID} from "./common/org-management.const";
import {Term} from "../../../entities/term/term.model";
import {OrgTreeModel} from "./common/org-management-orgTree.model";
import {TermRelationships} from "../../../entities/term-relationships/term-relationships.model";
import {TermRelationshipsService} from "../../../entities/term-relationships/term-relationships.service";
import {UserServiceSpec} from "../../../shared/user/user.service.spec";
import {User} from "../../../shared/user/user.model";
import {DeviceServiceSpec} from "../../../entities/device/device.service.spec";
import {TermRelationshipsServiceSpec} from "../../../entities/term-relationships/term-relationships.service.spec";
/**
 * Created by lv-wei on 2017-05-23.
 */

@Injectable()
export class OrgManagementService {

  constructor(private termService: TermService,
              private userServiceSpec: UserServiceSpec,
              private deviceServiceSpec: DeviceServiceSpec,
              private termRelationshipsServiceSpec: TermRelationshipsServiceSpec
) {
}


  log = Log.create("OrgManagementService", ...LOG_LEVEL);

  /**
   * 取得当前用户所能管理的组织结构，并将结构转换为jsTree格式
   *
   * @param root
   * @returns {any}
   */
  getOrgs(root?: string): Observable<OrgTreeModel[]> {
    return Observable.create(observer => {
      // 取得Term表的数据，用于构建组织树中的组织
      this.termService.query("").subscribe(
        (terms) => {
          this.log.data("getTerms: ", terms);
          observer.next(terms.json().map((term: Term) => {
            let orgTreeModel:OrgTreeModel = {...new OrgTreeModel(), ...term};
            orgTreeModel.text = orgTreeModel.name;
            return orgTreeModel;
          }));
        }
      );
    });
  }

  updateOrg(node: OrgTreeModel): Observable<OrgTreeModel> {
    // todo
    // 没有的场合，增加；已有的场合，更新

    return Observable.create(observer => {
      let orgTreeModel: OrgTreeModel = new OrgTreeModel();

      if (node.id) {
        this.termService.update(node).subscribe(
          (term) => {
            this.log.data("Update term: ", term);
            orgTreeModel = {...OrgTreeModel, ...term};
            orgTreeModel.text = orgTreeModel.name;
            observer.next(orgTreeModel);
          });

      } else {
        this.termService.create(node).subscribe(
          (term) => {
            this.log.data("Create term: ", term);
            orgTreeModel = {...OrgTreeModel, ...term};
            orgTreeModel.text = orgTreeModel.name;
            observer.next(orgTreeModel);
          });
      }

    });
  }

  delOrg(node: OrgTreeModel): Observable<boolean> {
    this.log.data("[SERVICE]", "delOrg");

    return Observable.create(observer => {

      // todo 删除Term表中的数据
      // todo 删除TermRelationship表中的数据

      observer.next(true);
    });
  }


  /**
   * 取得组织节点下的用户或者设备
   * @param root
   * @returns {any}
   */
  getRelativeLeaf(termId?: string): Observable<OrgTreeModel[]> {

    this.log.data("Term id:", termId);

    return Observable.create((observer) => {

      // 取得该节点下的用户和设备
      this.termRelationshipsServiceSpec.query(termId).subscribe(
        (res) => {
          this.log.data("getTermRelationships: ", res.json().length);

          // 返回由用户或者设备构成的OrgTreeModel列表
          observer.next(

            // 组装OrgTreeModel列表
            res.json().map((termRel: TermRelationships) => {
              this.log.data("TermRelationship:", termRel);

              let text = "";
              let observable: Observable<OrgTreeModel>;

              let orgTreeModel: OrgTreeModel = new OrgTreeModel();
              orgTreeModel.id = termRel.objectId;
              orgTreeModel.parent = termRel.termId;
              orgTreeModel.type = termRel.objectType;

              // 取得Observable对象
              if ("user" == termRel.objectType) {
                observable = this.userServiceSpec.find(termRel.objectId).map((user) => {
                  orgTreeModel.text = user.firstName + user.lastName;
                  return orgTreeModel;
                });
              } else if ("device" == termRel.objectType) {
                observable = this.deviceServiceSpec.find(termRel.objectId).map((device) => {
                  orgTreeModel.text = JSON.parse(device.conf).sysinfo.diname || device.sn;
                  return orgTreeModel;
                });
              } else {
                this.log.data("Unexcepted leaf's type.", termRel.objectType);
                orgTreeModel = Observable.of(null);
              }

              // observable.subscribe((object: any) => {
              //   this.log.data("Object:", object);
              //   let orgTreeModel: OrgTreeModel = new OrgTreeModel();
              //   orgTreeModel.id = termRel.objectId;
              //   orgTreeModel.parent = termRel.termId;
              //   orgTreeModel.type = termRel.objectType;
              //   orgTreeModel.text = "";
              //
              //   // 叶子节点是用户的场合
              //   if ("user" == termRel.objectType) {
              //     orgTreeModel.text = object.firstName + object.lastName;
              //   }
              //   // 叶子节点是设备的场合
              //   else if ("device" == termRel.objectType) {
              //     orgTreeModel.text = JSON.parse(object.conf).sysinfo.diname || object.sn;
              //   }
              //   // 未知叶子节点类型
              //   else {
              //     this.log.data("Unexcepted leaf's type.", termRel.objectType);
              //     orgTreeModel = null;
              //   }
              //
              //   this.log.data("Translat to TreeNode =>", orgTreeModel);
              //   return orgTreeModel;
              // });

            })
          );
        }
      )
    });
  }

  getUsers(root?:string): Observable<OrgTreeModel[]> {

    // todo 取得用户名称
    let users = [{"text": "王一", "type": "user"}, {"text": "张二", "type": "user"}];
    return Observable.create(observer => {
      observer.next(users);
    });
  }

  getDevices(root?:string): Observable<any[]> {

    // todo
    let devices = [{"text": "原平端直缓点", "type": "device"}, {"text": "原平端缓圆点", "type": "device"}];
    return Observable.create(observer => {
      observer.next(devices);
    });
  }

  addOrgRelationships(parentId:string, objectId:string , objectType?:string): Observable<boolean>{
    this.log.data("[SERVICE]", "addOrgRelationships");
    let rel = new TermRelationships()
    rel.appId = APPID;
    rel.termId = parentId;
    rel.objectType = objectType;
    rel.objectId = objectId;

    // todo
    return Observable.create((observer) => {
      observer.next(true);
    });
  }

  delOrgRelationships(parentId:string, objectId:string , objectType?:string): Observable<boolean>{
    this.log.data("[SERVICE]", "delOrgRelationships");
    let rel = new TermRelationships()
    rel.appId = APPID;
    rel.termId = parentId;
    rel.objectType = objectType;
    rel.objectId = objectId;

    // todo
    return Observable.create((observer) => {
      observer.next(true);
    });
  }
  // addOrgRelationships(): Observable<boolean>{return null;};
}
