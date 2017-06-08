import {Injectable} from "@angular/core";
import {Subject, Observable, Observer} from "rxjs";
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

  private topics = {};

  subscribe = function (topic, handler) {
    if (!this.topics[topic]) {
      // console.log("----------11--");
      this.topics[topic] = new Topic();
    }

    this.topics[topic].subscribe(handler);

    // console.log("----------1--", this.topics);
  };

  sendMsg = function (topic, msg) {
    if (!this.topics[topic]) {
      // console.log("----------22--");
      this.topics[topic] = new Topic();
    }

    // console.log("----------2--", this.topics);
    this.topics[topic].next(msg);

  };

}

class Topic {

  _observer = {};
  observable = function(_this){
    return Observable.create(function (observer) {

      _this._observer = observer;
      // console.log("------------1", _this, _this._observer);
    });
  }(this);


  subscribe = function (handler) {
    this.observable.subscribe(handler);
  };

  next = function (msg) {
    // console.log("------------2", this, this._observer);
    this._observer.next(msg);
  };
}
