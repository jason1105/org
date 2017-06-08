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
import {Response} from "@angular/http";
import {DeviceService} from "../../../entities/device/device.service";
import {Device} from "../../../entities/device/device.model";
import {UserService} from "../../../shared/user/user.service";
/**
 * Created by lv-wei on 2017-05-23.
 */

@Injectable()
export class OrgManagementService {

  constructor(private termService: TermService,
              private userServiceSpec: UserServiceSpec,
              private userService: UserService,
              private deviceServiceSpec: DeviceServiceSpec,
              private deviceService: DeviceService,
              private termRelationshipsServiceSpec: TermRelationshipsServiceSpec,
              private termRelationshipsService : TermRelationshipsService
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
    // 取得Term表的数据，用于构建组织树中的组织
    return this.termService.query("")
      .map((res: Response) => {
        this.log.data("getTerms: ", res);
        return res.json();
      })
      .map((terms: Term[]) => {
        return terms.map((term) => {
          let orgTreeModel: OrgTreeModel = {...new OrgTreeModel(), ...term};
          orgTreeModel.text = orgTreeModel.name;
          orgTreeModel.objId = orgTreeModel.id;
          return orgTreeModel;
        });
      })
      ;
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
    this.log.data("getRelativeLeaf", "Term id:", termId);
    return this.termRelationshipsService.query()
      .map((res) => {
        this.log.data("getRelativeLeaf", "response:", res);
        return res.json()
      })
      .map((termRels, index) => {
        return termRels.map((termRel) => {
          // this.log.data("Leaf", termRel)
          let orgTreeModel: OrgTreeModel = new OrgTreeModel();
          orgTreeModel.id = termRel.id;
          orgTreeModel.parent = termRel.termId;
          orgTreeModel.type = termRel.objectType;

          // 取得Observable对象
          if ("user" == termRel.objectType) {
            return this.userServiceSpec.find(termRel.objectId).map((user) => {
              this.log.data("User", user);
              orgTreeModel.text = user.firstName + user.lastName;
              return orgTreeModel;
            });
          } else if ("device" == termRel.objectType) {
            return this.deviceServiceSpec.find(termRel.objectId).map((device) => {
              this.log.data("device", device);
              orgTreeModel.text = JSON.parse(device.conf).sysinfo.diname || device.sn;
              orgTreeModel.objId = device.id;
              return orgTreeModel;
            });
          } else {
            this.log.data("Unexcepted leaf's type.", termRel.objectType);
            return Observable.of(null);
          }
        });
      })
      .map((obsArray, index) => {
        return Observable.forkJoin(obsArray);
      })
      .flatMap((x) => {
        return x;
      });

  }

  getUsers(root?:string): Observable<OrgTreeModel[]> {
    this.log.data("getUsers() start");

    // 取得Term表的数据，用于构建组织树中的组织
    return this.userService.query("")
      .map((res: Response) => {
        this.log.data("getUsers(): ", res);
        return res.json();
      })
      .map((users: User[]) => {
        return users.map((user) => {
          let orgTreeModel: OrgTreeModel = {...new OrgTreeModel(), ...user};
          orgTreeModel.text = user.firstName + user.lastName;
          orgTreeModel.parent = "#";
          orgTreeModel.type = "user";
          return orgTreeModel;
        });
      });

  }

  getDevices(root?: string): Observable<OrgTreeModel[]> {

    // 取得Term表的数据，用于构建组织树中的组织
    return this.deviceService.query("")
      .map((res: Response) => {
        this.log.data("getDevices: ", res);
        return res.json();
      })
      .map((devices: Device[]) => {
        return devices.map((device) => {
          let orgTreeModel: OrgTreeModel = {...new OrgTreeModel(), ...device};
          orgTreeModel.text = JSON.parse(device.conf).sysinfo.diname || device.sn;
          orgTreeModel.parent = "#";
          orgTreeModel.type = "device";
          orgTreeModel.objId = device.id;
          return orgTreeModel;
        });
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
