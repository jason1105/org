import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
/**
 * Created by lv-wei on 2017-06-01.
 */
@Injectable()
export class MissionService {
  // Observable string sources
  private missionAnnouncedSource = new Subject<any>();
  private missionConfirmedSource = new Subject<any>();

  // Observable string streams
  missionAnnounced$ = this.missionAnnouncedSource.asObservable();
  missionConfirmed$ = this.missionConfirmedSource.asObservable();

  // Service message commands
  announceMission(mission: any) {
    this.missionAnnouncedSource.next(mission);
  }
  confirmMission(astronaut: any) {
    this.missionConfirmedSource.next(astronaut);
  }
}
