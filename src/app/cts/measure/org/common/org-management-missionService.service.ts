import {Injectable} from "@angular/core";
import {Subject, Observable, Observer, Subscription} from "rxjs";
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
      this.topics[topic] = new Topic();
    }

    this.topics[topic].subscribe(handler);
  };

  unsubscribe = function (topic) {

    if (this.topics[topic]) {
      this.topics[topic].unsubscribe();
      delete this.topics[topic];
    }
  };

  sendMsg = function (topic, msg) {

    if (!this.topics[topic]) {
      this.topics[topic] = new Topic();
    }

    this.topics[topic].next(msg);
  };
}

class Topic {

  private _observer: Observer<any>;
  private _subscription: Subscription;

  private _observable = function(_this){
    return Observable.create(function (observer) {
      _this._observer = observer;
    }).share();
  }(this);

  subscribe = function (handler) {
    this._subscription = this._observable.subscribe(handler);
  };

  unsubscribe = function() {
    this._subscription.unsubscribe();
  };

  next = function (msg) {
    this._observer.next(msg);
  };
}
